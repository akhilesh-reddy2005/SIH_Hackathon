import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo / Title */}
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" style={{ height: "50px" }} className="mb-3" />
          <h3 className="fw-bold text-success">Login</h3>
          <p className="text-muted small">Welcome back! Please enter your details.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted small">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Signup Redirect */}
        <div className="text-center">
          <p className="small mb-0">
            Not logged in yet?{" "}
            <Link to="/register" className="text-success fw-semibold text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
