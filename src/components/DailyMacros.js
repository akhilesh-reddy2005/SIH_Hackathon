import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DailyMacros = ({ totals }) => {
  const totalGrams = totals.protein + totals.carbs + totals.fats;
  const totalCalories =
    totals.protein * 4 + totals.carbs * 4 + totals.fats * 9;

  const chartData = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [totals.protein, totals.carbs, totals.fats],
        backgroundColor: ["#198754", "#0d6efd", "#ffc107"],
        hoverBackgroundColor: ["#157347", "#0b5ed7", "#e0a800"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body text-center">
        <h5 className="card-title">Daily Macros</h5>
        <p className="text-muted small mb-4">
          Your macronutrient distribution today
        </p>

        <div className="position-relative d-inline-block mb-3" style={{ width: "200px", height: "200px" }}>
          <Doughnut data={chartData} options={chartOptions} />
          <div className="position-absolute top-50 start-50 translate-middle fw-bold">
            {totalGrams}g <br /> {totalCalories} kcal
          </div>
        </div>

        <ul className="list-group text-start">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <span className="badge bg-success me-2">&nbsp;</span>Protein
            </span>
            <span>{((totals.protein / totalGrams) * 100 || 0).toFixed(0)}%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <span className="badge bg-primary me-2">&nbsp;</span>Carbs
            </span>
            <span>{((totals.carbs / totalGrams) * 100 || 0).toFixed(0)}%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <span className="badge bg-warning me-2">&nbsp;</span>Fats
            </span>
            <span>{((totals.fats / totalGrams) * 100 || 0).toFixed(0)}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailyMacros;
