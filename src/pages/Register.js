import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase.js";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    targetWeight: "",
    activity: "",
    goal: "",
    preference: "",
    conditions: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        uid: user.uid,
      });

      alert("✅ Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg border-0 p-4 w-100"
        style={{ maxWidth: "700px", borderRadius: "16px" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" style={{ height: "60px" }} className="mb-3 rounded" />
          <h3 className="fw-bold text-success">Create Account</h3>
          <p className="text-muted small">Join FitTrack and start your fitness journey 🚀</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Basic Info */}
          <h5 className="text-success mb-3">Basic Information</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="email"
                className="form-control form-control-lg rounded-pill"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                className="form-control form-control-lg rounded-pill"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <select
                className="form-select form-select-lg rounded-pill"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control form-control-lg rounded-pill"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Physical Metrics */}
          <h5 className="text-success mb-3">Physical Metrics</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control form-control-lg rounded-pill"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control form-control-lg rounded-pill"
                name="weight"
                placeholder="Current Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="number"
              className="form-control form-control-lg rounded-pill"
              name="targetWeight"
              placeholder="Target Weight (kg)"
              value={formData.targetWeight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fitness & Activity */}
          <h5 className="text-success mb-3">Fitness & Activity</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <select
                className="form-select form-select-lg rounded-pill"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                required
              >
                <option value="">Select Activity Level</option>
                <option>Sedentary</option>
                <option>Lightly Active</option>
                <option>Moderately Active</option>
                <option>Very Active</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select form-select-lg rounded-pill"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
              >
                <option value="">Select Goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Endurance</option>
                <option>General Fitness</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <select
              className="form-select form-select-lg rounded-pill"
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              required
            >
              <option value="">Select Preferences</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Keto</option>
              <option>Balanced</option>
            </select>
          </div>

          {/* Health Info */}
          <h5 className="text-success mb-3">Health Information (Optional)</h5>
          <input
            type="text"
            className="form-control form-control-lg rounded-pill mb-3"
            name="conditions"
            placeholder="Medical Conditions"
            value={formData.conditions}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control form-control-lg rounded-pill mb-4"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleChange}
          />

          {/* Submit */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success rounded-pill py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <Link to="/login" className="text-success fw-bold text-decoration-none">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
