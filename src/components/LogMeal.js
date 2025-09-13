import React, { useState } from "react";

const LogMeal = ({ onAddFood }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const foodDatabase = {
    "chicken salad": { calories: 350, protein: 30, carbs: 10, fats: 20 },
    apple: { calories: 95, protein: 0, carbs: 25, fats: 0 },
    "protein shake": { calories: 150, protein: 25, carbs: 5, fats: 4 },
  };

  const handleAddFood = () => {
    const foodItem = foodDatabase[searchTerm.toLowerCase()];
    if (foodItem) {
      onAddFood({ foodItem: searchTerm, serving: "1 serving", ...foodItem });
      setSearchTerm("");
    } else {
      alert(
        'Food not found. Try "chicken salad", "apple", or "protein shake".'
      );
    }
  };

  const handleAnalyzeImage = () => {
    alert("📸 Image analysis feature coming soon!");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Log a Meal</h5>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a food item (e.g., chicken salad, apple)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddFood}>
            + Add Food
          </button>
        </div>

        <p className="text-muted small text-center">Or Upload a Photo</p>

        <div className="border rounded p-4 bg-light text-center">
          <p className="mb-2">Drag & drop image here or browse</p>
          <input type="file" className="form-control mb-3" />
          <button className="btn btn-outline-primary" onClick={handleAnalyzeImage}>
            🔍 Analyze Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogMeal;
