// src/components/FoodLog.js
import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodLog = ({ entries, onDeleteFood }) => (
  <motion.div
    className="card shadow-sm p-3 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h4 className="mb-3 text-primary">🍴 Food Log</h4>
    <p className="text-muted">Overview of your tracked meals.</p>

    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-dark">
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
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{entry.foodItem}</td>
                <td>{entry.serving}</td>
                <td>{entry.calories}</td>
                <td>{entry.protein}</td>
                <td>{entry.carbs}</td>
                <td>{entry.fats}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeleteFood(entry.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </motion.tr>
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
  </motion.div>
);

export default FoodLog;
