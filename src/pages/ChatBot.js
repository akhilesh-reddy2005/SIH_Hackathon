// src/pages/ChatBot.js
import React from "react";
import FitnessChat from "../components/FitnessChat.js";

function ChatBot() {
  const userData = {
    name: "Akhilesh",
    weight: "70kg",
    height: "170cm",
    goal: "muscle gain",
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-success text-white text-center py-3 rounded-top-4">
          <h2 className="mb-0 fw-bold">💬 AI Fitness Coach</h2>
          <p className="mb-0 small">
            Personalized fitness & nutrition guidance for you
          </p>
        </div>

        <div className="card-body p-4" style={{ minHeight: "500px" }}>
          <FitnessChat userData={userData} />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
