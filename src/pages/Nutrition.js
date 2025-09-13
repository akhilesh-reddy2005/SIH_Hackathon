// src/pages/Nutrition.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// ✅ Import with .js extension
import { db } from "../firebase.js";

// ✅ Import components with .js extension
import LogMeal from "../components/LogMeal.js";
import FoodLog from "../components/FoodLog.js";
import DailyMacros from "../components/DailyMacros.js";

function Nutrition() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalMacros, setTotalMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  // 🔹 Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, "foodLog"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoodEntries(entries);
      calculateTotalMacros(entries);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Calculate total macros
  const calculateTotalMacros = (entries) => {
    const totals = entries.reduce(
      (acc, entry) => ({
        protein: acc.protein + (Number(entry.protein) || 0),
        carbs: acc.carbs + (Number(entry.carbs) || 0),
        fats: acc.fats + (Number(entry.fats) || 0),
      }),
      { protein: 0, carbs: 0, fats: 0 }
    );
    setTotalMacros(totals);
  };

  // 🔹 Add food entry
  const handleAddFood = async (foodItem) => {
    try {
      await addDoc(collection(db, "foodLog"), {
        ...foodItem,
        protein: Number(foodItem.protein) || 0,
        carbs: Number(foodItem.carbs) || 0,
        fats: Number(foodItem.fats) || 0,
        calories: Number(foodItem.calories) || 0,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // 🔹 Delete food entry
  const handleDeleteFood = async (id) => {
    try {
      await deleteDoc(doc(db, "foodLog", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-5">
        🍏 Nutrient and Calorie Tracker
      </h1>

      <div className="row g-4">
        {/* Left column: Log + Food Log */}
        <div className="col-lg-8">
          <LogMeal onAddFood={handleAddFood} />
          <FoodLog entries={foodEntries} onDeleteFood={handleDeleteFood} />
        </div>

        {/* Right column: Macros chart */}
        <div className="col-lg-4">
          <DailyMacros totals={totalMacros} />
        </div>
      </div>
    </div>
  );
}

export default Nutrition;
