import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{
        backgroundColor: "#28a745",
        height: "80px",
        padding: "0 1rem",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/dashboard"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "64px",
              width: "auto",
              objectFit: "contain",
              backgroundColor: "#ffffff",
              padding: "6px",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              marginRight: "12px",
            }}
          />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white fw-semibold" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <a
                    href="https://v0.app/chat/remix-of-fitness-chatbot-wGK2IJgxrk1?b=v0-preview-mW6ISn0vS4d&f=1&path=%2F"
                    className="nav-link text-white fw-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chatbot
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a
                    href="https://9000-firebase-studio-1757676485213.cluster-m7dwy2bmizezqukxkuxd55k5ka.cloudworkstations.dev"
                    className="nav-link text-white fw-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Tracking
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white fw-semibold" to="/nutrition">
                    Nutrition
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white fw-semibold" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-light btn-sm fw-semibold" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white fw-semibold" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link text-white fw-semibold" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
