import express from "express";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env file");
  process.exit(1);
}

const app = express();
app.use(express.json());

// Fitness AI route
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

// Start server
app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
