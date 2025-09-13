import React, { useState, useEffect } from "react";

const exerciseCategories = {
  "Upper Body": [
    {
      name: "Push-ups",
      image:
        "https://tse1.explicit.bing.net/th/id/OIP.vkYW0d7DZiZgFJfFNy01TQHaE8?w=640&h=427&rs=1&pid=ImgDetMain&o=7&rm=3",
      workoutImage:
        "https://th.bing.com/th/id/OIP.mBiapOkcY21ldGCOjtw75wHaFj?w=259&h=194&c=7&r=0&o=5&dpr=1.1&pid=1.7",
      instructions: [
        "Place your hands slightly wider than shoulder-width apart.",
        "Keep your body in a straight line from head to heels.",
        "Lower your chest toward the floor, elbows at about 45 degrees.",
        "Push back up to the starting position.",
        "Engage your core and avoid sagging hips.",
      ],
    },
    {
      name: "Shoulder Press",
      image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/2261478/pexels-photo-2261478.jpeg",
      instructions: [
        "Hold dumbbells at shoulder height, palms facing forward.",
        "Press weights overhead until arms are fully extended.",
        "Lower back to starting position with control.",
        "Keep your core engaged throughout the movement.",
      ],
    },
  ],
  "Lower Body": [
    {
      name: "Squats",
      image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
      instructions: [
        "Stand with feet shoulder-width apart, toes pointing slightly outward.",
        "Keep your back straight and chest up.",
        "Lower your hips as if sitting in a chair.",
        "Push through heels to return to standing.",
      ],
    },
    {
      name: "Lunges",
      image: "https://images.pexels.com/photos/3076511/pexels-photo-3076511.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/843658/pexels-photo-843658.jpeg",
      instructions: [
        "Stand tall with feet hip-width apart.",
        "Step forward with one leg and lower hips until knees are 90°.",
        "Push back to starting position.",
        "Repeat on the other leg.",
      ],
    },
  ],
  Core: [
    {
      name: "Plank",
      image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/376401/pexels-photo-376401.jpeg",
      instructions: [
        "Place forearms on ground, elbows under shoulders.",
        "Keep body in a straight line head-to-heels.",
        "Engage core and glutes.",
        "Hold position without sagging hips.",
      ],
    },
    {
      name: "Sit-ups",
      image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
      instructions: [
        "Lie on your back with knees bent, feet flat.",
        "Cross arms over chest or place behind head.",
        "Lift upper body toward knees using core muscles.",
        "Lower back down slowly.",
      ],
    },
  ],
  Cardio: [
    {
      name: "Jumping Jacks",
      image: "https://images.pexels.com/photos/6453398/pexels-photo-6453398.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/6454071/pexels-photo-6454071.jpeg",
      instructions: [
        "Stand upright with feet together, arms at sides.",
        "Jump while spreading legs and raising arms overhead.",
        "Return quickly to start.",
        "Repeat at steady pace.",
      ],
    },
    {
      name: "Burpees",
      image: "https://images.pexels.com/photos/4761784/pexels-photo-4761784.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg",
      instructions: [
        "Start standing, drop into squat with hands down.",
        "Kick feet back into push-up position.",
        "Do one push-up, jump feet forward.",
        "Explode upward into a jump reaching arms overhead.",
      ],
    },
  ],
  Flexibility: [
    {
      name: "Forward Bend",
      image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/4056725/pexels-photo-4056725.jpeg",
      instructions: [
        "Stand tall with feet hip-width apart.",
        "Bend forward at hips, letting arms dangle.",
        "Keep knees slightly bent.",
        "Hold for 20–30 seconds.",
      ],
    },
    {
      name: "Cat-Cow Stretch",
      image: "https://images.pexels.com/photos/4056724/pexels-photo-4056724.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/3822179/pexels-photo-3822179.jpeg",
      instructions: [
        "Start on all fours, wrists under shoulders, knees under hips.",
        "Arch your back (Cow), lifting head and tailbone.",
        "Then round spine (Cat), tucking chin to chest.",
        "Repeat slowly.",
      ],
    },
  ],
  "Full Body": [
    {
      name: "Mountain Climbers",
      image: "https://images.pexels.com/photos/3823036/pexels-photo-3823036.jpeg",
      workoutImage:
        "https://cdn.muscleandstrength.com/sites/default/files/beginner_full_body_-_1200x630.jpg",
      instructions: [
        "Start in plank position, hands under shoulders.",
        "Drive one knee toward chest, then switch quickly.",
        "Alternate legs at a fast pace.",
      ],
    },
    {
      name: "Burpee Tuck Jumps",
      image: "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg",
      workoutImage:
        "https://images.pexels.com/photos/4761791/pexels-photo-4761791.jpeg",
      instructions: [
        "Perform a burpee and jump explosively.",
        "Tuck knees toward chest mid-air.",
        "Land softly and repeat.",
      ],
    },
  ],
};

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Upper Body");
  const [selectedExercise, setSelectedExercise] = useState(
    exerciseCategories["Upper Body"][0]
  );
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [time, setTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isSessionActive) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else if (!isSessionActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const handleStart = () => setIsSessionActive(true);
  const handleEnd = () => {
    setIsSessionActive(false);
    setTime(0);
  };

  return (
    <div className="min-vh-100 bg-white">
      <main className="container py-4">
        <div className="row g-4">
          {/* Left Panel */}
          <div className="col-lg-6">
            {/* Gym Photo */}
            <img
              src={selectedExercise.workoutImage}
              alt={selectedExercise.name}
              className="img-fluid rounded mb-3 shadow-sm"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />

            {/* Motivational Fitness Video (YouTube Embed) */}
            <div className="ratio ratio-16x9 mb-3 shadow-sm">
              <iframe
    src="https://www.youtube.com/embed/_JRefJH6N00?autoplay=1&mute=1&loop=1&playlist=_JRefJH6N00"
    title="Fitness Motivation"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
            </div>

            <p className="text-center fw-semibold mb-3">
              {selectedExercise.name} Session
            </p>

            <div className="d-flex gap-3">
              <button
                className="btn btn-success"
                onClick={handleStart}
                disabled={isSessionActive}
              >
                Start Session
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleEnd}
                disabled={!isSessionActive}
              >
                End Session
              </button>
            </div>

            {isSessionActive && (
              <p className="mt-3 text-center fw-bold">
                ⏱ Time: {Math.floor(time / 60)}m {time % 60}s
              </p>
            )}
          </div>

          {/* Right Panel */}
          <div className="col-lg-6">
            {/* Categories */}
            <div className="p-3 border rounded mb-4 shadow-sm">
              <h5 className="mb-3">Exercise Categories</h5>
              <div className="row g-2">
                {Object.keys(exerciseCategories).map((category) => (
                  <div className="col-6" key={category}>
                    <button
                      className={`btn w-100 ${
                        selectedCategory === category
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedExercise(exerciseCategories[category][0]);
                      }}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercise List */}
            <div className="p-3 border rounded shadow-sm mb-3">
              <h5 className="mb-3">Exercises in {selectedCategory}</h5>
              <div className="row g-2">
                {exerciseCategories[selectedCategory].map((exercise, idx) => (
                  <div className="col-6" key={idx}>
                    <button
                      className={`btn w-100 ${
                        selectedExercise.name === exercise.name
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      {exercise.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Exercise */}
            <div className="p-3 border rounded shadow-sm">
              <h3 className="fw-semibold mb-2">
                Current Exercise: {selectedExercise.name}
              </h3>
              <img
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="img-fluid rounded mb-3"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <h5 className="fw-medium mb-2">Instructions:</h5>
              <ul className="text-muted small ps-3">
                {selectedExercise.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;