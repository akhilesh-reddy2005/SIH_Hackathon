import React from "react";

const FoodLog = ({ entries, onDeleteFood }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-body">
      <h5 className="card-title">Food Log</h5>
      <p className="text-muted small mb-3">Overview of your tracked meals</p>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Food Item</th>
              <th>Serving</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fats (g)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.foodItem}</td>
                  <td>{entry.serving}</td>
                  <td>{entry.calories}</td>
                  <td>{entry.protein}</td>
                  <td>{entry.carbs}</td>
                  <td>{entry.fats}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteFood(entry.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No meals logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default FoodLog;
