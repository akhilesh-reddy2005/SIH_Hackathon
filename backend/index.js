import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3001;

app.use(cors());
const upload = multer();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY");

app.post("/analyze-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file uploaded.");
  }

  try {
    const prompt = `Analyze the food items in this image. 
    Provide a JSON object with the following structure:
    {
      "food_items": [
        {
          "name": "food_name",
          "serving": "serving_size",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fats": number
        }
      ]
    }
    Be as accurate as possible. If multiple items are present, list them all. 
    Return ONLY the JSON object with no extra text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;

    // Clean up response
    let jsonResponse = response.text().replace(/json/gi, "").trim();

    // Parse JSON
    const analysis = JSON.parse(jsonResponse);

    res.json(analysis);
  } catch (error) {
    console.error("❌ Error analyzing image:", error);
    res.status(500).json({ error: "Failed to analyze the image." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});
