import React from "react";

const FoodLog = ({ entries, onDeleteFood }) => (
  <div className="card p-4 shadow-sm">
    <h3 className="mb-3">Food Log</h3>
    <p className="text-muted">Overview of your tracked meals.</p>

    <table className="table table-hover table-bordered align-middle">
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
                  🗑
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
);

export default FoodLog;
