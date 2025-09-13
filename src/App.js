// src/App.js
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
import { db } from "./firebase.js";
import LogMeal from "./components/LogMeal.js";
import FoodLog from "./components/FoodLog.js";
import DailyMacros from "./components/DailyMacros.js";
import Navbar from "./components/Navbar.js";
import FitnessChat from "./components/FitnessChat.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import Nutrition from "./pages/Nutrition.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import "./App.css";

const App = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalMacros, setTotalMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  // Fetch data from Firestore in real-time
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

  // Calculate and update the total macros
  const calculateTotalMacros = (entries) => {
    const totals = entries.reduce(
      (acc, entry) => ({
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fats: acc.fats + entry.fats,
      }),
      { protein: 0, carbs: 0, fats: 0 }
    );
    setTotalMacros(totals);
  };

  // Add a new food item to the database
  const handleAddFood = async (foodItem) => {
    try {
      await addDoc(collection(db, "foodLog"), {
        ...foodItem,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Delete a food item from the database
  const handleDeleteFood = async (id) => {
    try {
      await deleteDoc(doc(db, "foodLog", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-container">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Chatbot */}
            <Route
              path="/chatbot"
              element={
                <FitnessChat
                  userData={{
                    name: "John",
                    age: 25,
                    height: 170,
                    weight: 70,
                    goal: "weight loss",
                  }}
                />
              }
            />

            {/* Nutrition Routes */}
            <Route
              path="/nutrition/logmeal"
              element={<LogMeal onAddFood={handleAddFood} />}
            />
            <Route
              path="/nutrition/foodlog"
              element={
                <FoodLog entries={foodEntries} onDeleteFood={handleDeleteFood} />
              }
            />
            <Route
              path="/nutrition/dailymacros"
              element={<DailyMacros totals={totalMacros} />}
            />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Nutrition Overview */}
            <Route path="/nutrition" element={<Nutrition />} />

            {/* Redirect root ("/") to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
