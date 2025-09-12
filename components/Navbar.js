import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "#28a745",
        height: "60px", // fixed navbar height
        padding: "0 1rem",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/dashboard"
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "45px", // bigger logo
              width: "auto",
              objectFit: "contain",
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
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/dashboard"
                  >
                    Tracking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/chatbot"
                  >
                    Chatbot
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/nutrition"
                  >
                    Nutrition
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-light btn-sm fw-semibold"
                    style={{ fontSize: "0.85rem", padding: "4px 10px" }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    style={{ fontSize: "0.95rem" }}
                    to="/register"
                  >
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
