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
        backgroundColor: ["#4CAF50", "#03A9F4", "#FFC107"],
        hoverBackgroundColor: ["#45a049", "#0288d1", "#ffa000"],
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
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Daily Macros</h3>
      <p className="text-muted">Your macronutrient distribution today.</p>

      <div className="position-relative">
        <Doughnut data={chartData} options={chartOptions} />
        <div
          className="position-absolute top-50 start-50 translate-middle fw-bold"
          style={{ fontSize: "14px" }}
        >
          {totalGrams}g <br /> {totalCalories} kcal
        </div>
      </div>

      <ul className="list-unstyled mt-3">
        <li>
          <span className="badge bg-success me-2">&nbsp;</span> Protein:{" "}
          {((totals.protein / totalGrams) * 100 || 0).toFixed(0)}%
        </li>
        <li>
          <span className="badge bg-info me-2">&nbsp;</span> Carbs:{" "}
          {((totals.carbs / totalGrams) * 100 || 0).toFixed(0)}%
        </li>
        <li>
          <span className="badge bg-warning me-2">&nbsp;</span> Fats:{" "}
          {((totals.fats / totalGrams) * 100 || 0).toFixed(0)}%
        </li>
      </ul>
    </div>
  );
};

export default DailyMacros;
