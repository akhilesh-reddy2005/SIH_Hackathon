// ==================== IMPORTS ====================
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // Needed for direct API call

// ==================== CONFIG ====================
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// ==================== FIREBASE ADMIN ====================
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"))
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

// ==================== GEMINI ====================
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not found in .env file");
}
const genAI = new GoogleGenerativeAI(API_KEY);

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// ==================== IMAGE ANALYSIS ROUTE ====================
app.post("/analyze-image", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the food in this image.
    Provide the estimated total calories, grams of protein, carbs, and fats. 
    Format the response strictly as JSON with keys: "foodItem", "calories", "protein", "carbs", "fats". 
    If food is not recognized, return {"error": "Food not recognized."}.`;

    // Send prompt + image
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: image,
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = response.text().trim();
    console.log("🔎 Gemini raw response:", text);

    // Extract JSON safely
    let jsonString = text;
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonString = text.slice(firstBrace, lastBrace + 1);
    }

    let nutritionData;
    try {
      nutritionData = JSON.parse(jsonString);
    } catch (err) {
      console.error("❌ Failed to parse Gemini response:", text);
      return res.status(500).json({ error: "Failed to parse Gemini response" });
    }

    if (nutritionData.error) {
      return res.json(nutritionData);
    }

    // Normalize & Save to Firestore
    const savedDoc = {
      foodItem: nutritionData.foodItem || "Image Analysis",
      serving: "1 serving",
      calories: Number(nutritionData.calories) || 0,
      protein: Number(nutritionData.protein) || 0,
      carbs: Number(nutritionData.carbs) || 0,
      fats: Number(nutritionData.fats) || 0,
      source: "image",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("foodLog").add(savedDoc);

    // Return with ID
    res.json({ id: docRef.id, ...savedDoc });
  } catch (error) {
    console.error("❌ Error with Gemini or Firestore:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ==================== FITNESS AI CHAT ROUTE ====================
app.post("/api/fitness-ai", async (req, res) => {
  const { prompt, userData } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `User info: ${JSON.stringify(
                    userData
                  )}\n\nQuestion: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 🔎 Debug log (check what AI returns)
    console.log("AI raw response:", JSON.stringify(data, null, 2));

    // ✅ Extract reply safely
    let reply = "⚠️ AI did not return a valid response.";
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = data.candidates[0].content.parts[0].text;
    }

    res.json({ reply });
  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({ reply: "⚠️ Something went wrong with AI service." });
  }
});

// ==================== START SERVER ====================
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
