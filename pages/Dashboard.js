import React from "react";

function Dashboard() {
  return (
    <div className="min-vh-100 bg-white">
      {/* Main Content */}
      <main className="container py-4">
        <div className="row g-4">
          {/* Left Panel */}
          <div className="col-lg-6">
            <img
              src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
              alt="Workout"
              className="img-fluid rounded mb-3 shadow-sm"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
            <p className="text-center fw-semibold mb-3">Knee Angle: 90° - Perfect!</p>

            <div className="d-flex gap-3">
              <button className="btn btn-success">Start Session</button>
              <button className="btn btn-outline-secondary">End Session</button>
              <button className="btn btn-link text-muted d-flex align-items-center gap-1">
                🔄 Recalibrate
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-lg-6">
            {/* Exercise Categories */}
            <div className="p-3 border rounded mb-4 shadow-sm">
              <input
                type="text"
                placeholder="Search exercises..."
                className="form-control mb-3"
              />
              <div className="row g-2">
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100">💪 Upper Body</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-success w-100">🦵 Lower Body</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100">Core</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100">Cardio</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100">Flexibility</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100">Full Body</button>
                </div>
              </div>
            </div>

            {/* Current Exercise */}
            <div className="p-3 border rounded shadow-sm">
              <h3 className="fw-semibold mb-2">Current Exercise: Squats</h3>
              <img
                src="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg"
                alt="Squats"
                className="img-fluid rounded mb-3"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <h5 className="fw-medium mb-2">Instructions:</h5>
              <ul className="text-muted small ps-3">
                <li>Stand with feet shoulder-width apart, toes pointing slightly outward.</li>
                <li>Keep your back straight and chest up, engaging your core.</li>
                <li>Lower your hips as if sitting in a chair, ensuring knees track over toes.</li>
                <li>Descend until thighs are parallel to floor (or as deep as comfortable).</li>
                <li>Push through heels to return to starting position, squeezing glutes.</li>
                <li>Maintain a controlled movement throughout.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
