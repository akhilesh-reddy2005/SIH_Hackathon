import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";   // ✅ fixed extension
import LogMeal from "./components/LogMeal.js";
import FoodLog from "./components/FoodLog.js";
import DailyMacros from "./components/DailyMacros.js";
import { AuthProvider } from "./context/AuthContext.js";
import Nutrition from "./pages/Nutrition.js";
import FitnessChat from "./components/FitnessChat.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: "70px" }}>
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
            <Route path="/nutrition/logmeal" element={<LogMeal />} />
            <Route path="/nutrition/foodlog" element={<FoodLog />} />
            <Route path="/nutrition/dailymacros" element={<DailyMacros />} />

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
}

export default App;
