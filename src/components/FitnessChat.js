// src/components/FitnessChat.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FitnessChat({ userData }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🤖 Hi! I'm your AI fitness coach. Ask me anything!" },
  ]);

  const askAI = async () => {
    if (!prompt.trim()) return;

    // Show user message
    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");

    try {
      const res = await fetch("http://localhost:5000/api/fitness-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userData }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { sender: "bot", text: data.reply || "⚠️ AI did not respond." },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Something went wrong, please try again." },
      ]);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white fw-bold">
          AI Fitness Coach
        </div>
        <div
          className="card-body"
          style={{ height: "400px", overflowY: "auto", background: "#f9f9f9" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-3 ${
                msg.sender === "user" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-light border"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="card-footer d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Ask your AI coach..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askAI()}
          />
          <button className="btn btn-success" onClick={askAI}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default FitnessChat;
