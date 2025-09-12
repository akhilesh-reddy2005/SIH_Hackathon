import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LogMeal from "./components/LogMeal";
import FoodLog from "./components/FoodLog";
import DailyMacros from "./components/DailyMacros";
import { AuthProvider } from "./context/AuthContext";
import Nutrition from "./pages/Nutrition";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* Main content wrapper with padding so Navbar doesn’t overlap */}
        <main style={{ paddingTop: "70px" }}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Feature Pages */}
            <Route
              path="/chatbot"
              element={<h2 className="text-center mt-5">AI Chatbot Page</h2>}
            />

            {/* Nutrition Routes */}
            <Route path="/nutrition/logmeal" element={<LogMeal />} />
            <Route path="/nutrition/foodlog" element={<FoodLog />} />
            <Route path="/nutrition/dailymacros" element={<DailyMacros />} />

            {/* Profile Page */}
            <Route path="/profile" element={<Profile />} />

            {/* Redirect root ("/") to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/nutrition" element={<Nutrition />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
