import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example: Get token from localStorage (if you save it at login)
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user profile data from backend
    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token if required
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          onClick={() => alert("Edit Profile feature coming soon!")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
