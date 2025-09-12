import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";

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
            <Route
              path="/nutrition"
              element={<h2 className="text-center mt-5">Nutrient Tracker Page</h2>}
            />

            {/* Profile Page */}
            <Route path="/profile" element={<Profile />} />

            {/* Redirect root ("/") to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
