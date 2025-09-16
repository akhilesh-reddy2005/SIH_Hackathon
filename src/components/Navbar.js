import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm" style={{ backgroundColor: "#1e7e34" }}>
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/dashboard">
          <img
            src="logo.png"
            alt="Logo"
            style={{
              height: "52px",
              width: "auto",
              objectFit: "contain",
              marginRight: "10px",
              borderRadius: "6px",
              backgroundColor: "#fff",
              padding: "4px",
            }}
          />
          <span className="fs-4">Fitness AI</span>
        </Link>

        {/* Hamburger Toggle */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-semibold" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <a
                    href="https://v0.app/chat/remix-of-fitness-chatbot-wGK2IJgxrk1?b=v0-preview-b_FFfYwoTO5ZA&path=%2F&f=1"
                    className="nav-link fw-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chatbot
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a
                    href="https://9000-firebase-studio-1757676485213.cluster-m7dwy2bmizezqukxkuxd55k5ka.cloudworkstations.dev"
                    className="nav-link fw-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Tracking
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-semibold" to="/nutrition">
                    Nutrition
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-semibold" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-outline-light btn-sm px-3 fw-semibold" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-semibold" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-semibold" to="/register">
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
