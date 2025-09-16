// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase.js";
import {
  FaUser, FaBirthdayCake, FaRulerVertical, FaWeight,
  FaRunning, FaBullseye, FaHeartbeat, FaLeaf, FaEdit, FaSave
} from "react-icons/fa";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
          setFormData(snap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, formData);
      setUserData(formData);
      setIsEditing(false);
    }
  };

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Profile Header */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div className="bg-success bg-gradient" style={{ height: "180px" }}></div>
        <div className="card-body text-center position-relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="rounded-circle border border-4 border-white shadow position-absolute"
            style={{
              width: "140px",
              height: "140px",
              top: "-70px",
              left: "50%",
              transform: "translateX(-50%)",
              objectFit: "cover"
            }}
          />
          <h2 className="fw-bold text-success mt-5">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-muted mb-1">{userData.email}</p>
          <span className="badge bg-success bg-gradient fs-6 px-3 py-2">
            {userData.goal}
          </span>
        </div>
      </div>

      {/* Content */}
      {!isEditing ? (
        <>
          <div className="row g-4">
            {/* Basic Info */}
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm p-4 rounded-4 border-0 h-100">
                <h5 className="text-success fw-bold mb-3">
                  <FaUser className="me-2" /> Basic Info
                </h5>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><FaBirthdayCake className="me-2 text-danger" /> {userData.dob}</p>
              </div>
            </div>

            {/* Physical Metrics */}
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm p-4 rounded-4 border-0 h-100">
                <h5 className="text-success fw-bold mb-3">
                  <FaRulerVertical className="me-2" /> Physical Metrics
                </h5>
                <p><strong>Height:</strong> {userData.height} cm</p>
                <p><FaWeight className="me-2 text-primary" /> {userData.weight} kg</p>
                <p><strong>Target:</strong> {userData.targetWeight} kg</p>
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm p-4 rounded-4 border-0 h-100">
                <h5 className="text-success fw-bold mb-3">
                  <FaRunning className="me-2" /> Fitness Goals
                </h5>
                <p><strong>Activity:</strong> {userData.activity}</p>
                <p><FaBullseye className="me-2 text-warning" /> {userData.goal}</p>
                <p><FaLeaf className="me-2 text-success" /> {userData.preference}</p>
              </div>
            </div>

            {/* Health Info */}
            <div className="col-md-12 col-lg-6">
              <div className="card shadow-sm p-4 rounded-4 border-0 h-100">
                <h5 className="text-success fw-bold mb-3">
                  <FaHeartbeat className="me-2 text-danger" /> Health Info
                </h5>
                <p><strong>Conditions:</strong> {userData.conditions || "None"}</p>
                <p><strong>Allergies:</strong> {userData.allergies || "None"}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="text-end mt-4">
            <button className="btn btn-success px-4" onClick={() => setIsEditing(true)}>
              <FaEdit className="me-2" /> Edit Profile
            </button>
          </div>
        </>
      ) : (
        /* Edit Mode */
        <div className="card shadow-sm p-4 rounded-4 border-0">
          <h4 className="fw-bold text-success mb-3">Edit Profile</h4>
          <div className="row g-3">
            {Object.keys(formData).map((key) => (
              <div className="col-md-6" key={key}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-success"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                  <label>{key}</label>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn btn-success" onClick={handleSave}>
              <FaSave className="me-2" /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
