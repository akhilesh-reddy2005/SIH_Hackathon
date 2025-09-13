// src/components/LogMeal.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const LogMeal = ({ onAddFood }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutrition, setNutrition] = useState(null);

  // Simple food database
  const foodDatabase = {
    "chicken salad": { calories: 350, protein: 30, carbs: 10, fats: 20 },
    apple: { calories: 95, protein: 0, carbs: 25, fats: 0 },
    "protein shake": { calories: 150, protein: 25, carbs: 5, fats: 4 },
  };

  const handleAddFood = () => {
    const foodItem = foodDatabase[searchTerm.toLowerCase()];
    if (foodItem) {
      onAddFood({
        id: Date.now(),
        foodItem: searchTerm,
        serving: "1 serving",
        ...foodItem,
      });
      setSearchTerm("");
    } else {
      alert('Food not found. Try "chicken salad" or "apple".');
    }
  };

  const handleAnalyzeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      try {
        const response = await fetch("http://localhost:3001/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();
        if (response.ok && !data.error) {
          setNutrition(data);
          onAddFood({
            id: Date.now(),
            foodItem: data.foodItem || "Image Analysis",
            serving: data.serving || "1 serving",
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs || 0,
            fats: data.fats || 0,
          });
        } else {
          setNutrition({ error: data.error || "Failed to analyze image." });
        }
      } catch (err) {
        console.error("Error:", err);
        setNutrition({ error: "Server error. Please try again." });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      className="card shadow-sm p-3 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="mb-3 text-success">🥗 Log Your Meal</h4>

      {/* Manual search input */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder='Search food (e.g., "apple", "chicken salad")'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddFood}>
          + Add
        </button>
      </div>

      <p className="text-muted text-center">Or upload a photo</p>

      {/* Image upload */}
      <div className="d-flex flex-column align-items-center">
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleAnalyzeImage}
          disabled={loading}
        />
        <button className="btn btn-outline-success" disabled={loading}>
          {loading ? "Analyzing..." : "🔍 Analyze Image"}
        </button>
      </div>

      {/* Analysis results */}
      {nutrition && (
        <motion.div
          className="alert mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          role="alert"
          style={{
            backgroundColor: nutrition.error ? "#f8d7da" : "#d1e7dd",
            color: nutrition.error ? "#842029" : "#0f5132",
          }}
        >
          {nutrition.error ? (
            <strong>{nutrition.error}</strong>
          ) : (
            <>
              <h6>🍽 Analysis Results</h6>
              <p>
                <strong>Calories:</strong> {nutrition.calories}
              </p>
              <p>
                <strong>Protein:</strong> {nutrition.protein} g
              </p>
              <p>
                <strong>Carbs:</strong> {nutrition.carbs || 0} g
              </p>
              <p>
                <strong>Fats:</strong> {nutrition.fats || 0} g
              </p>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LogMeal;
