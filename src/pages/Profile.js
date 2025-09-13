// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase.js";
import { FaUser, FaBirthdayCake, FaRulerVertical, FaWeight, FaRunning, FaBullseye, FaHeartbeat, FaLeaf } from "react-icons/fa";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center mb-5 bg-success bg-opacity-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="rounded-circle border border-3 border-success shadow mb-3"
          style={{ width: "130px", height: "130px", objectFit: "cover" }}
        />
        <h2 className="fw-bold text-success mb-1">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-muted">{userData.email}</p>
        <span className="badge bg-success bg-gradient fs-6 px-3 py-2">
          {userData.goal}
        </span>
      </div>

      {/* Profile Details */}
      <div className="row g-4">
        {/* Basic Info */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4 h-100 border-0 rounded-4">
            <h5 className="text-success fw-bold mb-3">
              <FaUser className="me-2" /> Basic Info
            </h5>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><FaBirthdayCake className="me-2 text-danger"/> {userData.dob}</p>
          </div>
        </div>

        {/* Physical Metrics */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4 h-100 border-0 rounded-4">
            <h5 className="text-success fw-bold mb-3">
              <FaRulerVertical className="me-2" /> Physical Metrics
            </h5>
            <p><strong>Height:</strong> {userData.height} cm</p>
            <p><FaWeight className="me-2 text-primary"/> {userData.weight} kg</p>
            <p><strong>Target:</strong> {userData.targetWeight} kg</p>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4 h-100 border-0 rounded-4">
            <h5 className="text-success fw-bold mb-3">
              <FaRunning className="me-2" /> Fitness Goals
            </h5>
            <p><strong>Activity:</strong> {userData.activity}</p>
            <p><FaBullseye className="me-2 text-warning"/> {userData.goal}</p>
            <p><FaLeaf className="me-2 text-success"/> {userData.preference}</p>
          </div>
        </div>

        {/* Health Info */}
        <div className="col-md-6 col-lg-6">
          <div className="card shadow-sm p-4 h-100 border-0 rounded-4">
            <h5 className="text-success fw-bold mb-3">
              <FaHeartbeat className="me-2 text-danger"/> Health Info
            </h5>
            <p><strong>Conditions:</strong> {userData.conditions || "None"}</p>
            <p><strong>Allergies:</strong> {userData.allergies || "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
