import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Placeholder routes for extra features */}
          <Route
            path="/chatbot"
            element={<h2 className="text-center mt-5">AI Chatbot Page</h2>}
          />
          <Route
            path="/nutrition"
            element={<h2 className="text-center mt-5">Nutrient Tracker Page</h2>}
          />
          <Route
            path="/profile"
            element={<h2 className="text-center mt-5">User Profile Page</h2>}
          />

          {/* Redirect root ("/") to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
