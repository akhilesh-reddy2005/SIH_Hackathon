import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 fixed-top shadow">
      {/* Logo + Brand */}
      <Link className="navbar-brand d-flex align-items-center fw-bold" to="/dashboard">
        <img
          src="/logo.png"
          alt="Logo"
          className="me-2"
          style={{ height: "45px", width: "auto" }}
        />
        <span className="fs-4">Fitness AI</span>
      </Link>

      {/* Collapse Items */}
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Live Exercise Tracking
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatbot">
                  AI Chatbot
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nutrition">
                  Nutrient Tracker
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  User Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm ms-3"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
