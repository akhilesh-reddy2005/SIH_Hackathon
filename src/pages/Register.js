import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-success mb-4">Create Your FitTrack Account</h2>

        <form onSubmit={handleRegister}>
          {/* Basic Info */}
          <section className="mb-4">
            <h4 className="mb-3">Basic Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
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
            </div>
            <div className="mt-2">
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Physical Metrics */}
          <section className="mb-4">
            <h4 className="mb-3">Physical Metrics</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
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
                  className="form-control"
                  name="weight"
                  placeholder="Current Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <input
                type="number"
                className="form-control"
                name="targetWeight"
                placeholder="Target Weight (kg)"
                value={formData.targetWeight}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Fitness & Activity */}
          <section className="mb-4">
            <h4 className="mb-3">Fitness & Activity</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <select
                  className="form-select"
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
                  className="form-select"
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
            <div className="mt-2">
              <select
                className="form-select"
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
          </section>

          {/* Health Info */}
          <section className="mb-4">
            <h4 className="mb-3">Health Information (Optional)</h4>
            <input
              type="text"
              className="form-control mb-2"
              name="conditions"
              placeholder="Medical Conditions (e.g., Diabetes, Hypertension)"
              value={formData.conditions}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control"
              name="allergies"
              placeholder="Allergies (e.g., Peanuts, Dairy, Gluten)"
              value={formData.allergies}
              onChange={handleChange}
            />
          </section>

          {/* Submit & Login */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="btn btn-outline-primary btn-sm">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
