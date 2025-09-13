import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DailyMacros = ({ totals }) => {
  const totalGrams = totals.protein + totals.carbs + totals.fats;
  const proteinPercentage = totalGrams > 0 ? ((totals.protein / totalGrams) * 100).toFixed(0) : 0;
  const carbsPercentage = totalGrams > 0 ? ((totals.carbs / totalGrams) * 100).toFixed(0) : 0;
  const fatsPercentage = totalGrams > 0 ? ((totals.fats / totalGrams) * 100).toFixed(0) : 0;

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
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) label += ": ";
            if (context.parsed !== null && totalGrams > 0) {
              label += `${context.parsed}g (${((context.parsed / totalGrams) * 100).toFixed(0)}%)`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="daily-macros-section text-center">
      <h2 className="fw-bold">Daily Macros</h2>
      <p className="text-muted">Your macronutrient distribution today</p>

      <div className="chart-container position-relative d-inline-block">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="total-value position-absolute top-50 start-50 translate-middle fw-bold">
          Total: {totalGrams}g
        </div>
      </div>

      <div className="legend-container d-flex justify-content-around mt-3">
        <div className="legend-item">
          <span className="legend-color me-2" style={{ backgroundColor: "#4CAF50" }}></span>
          Protein: {proteinPercentage}%
        </div>
        <div className="legend-item">
          <span className="legend-color me-2" style={{ backgroundColor: "#03A9F4" }}></span>
          Carbs: {carbsPercentage}%
        </div>
        <div className="legend-item">
          <span className="legend-color me-2" style={{ backgroundColor: "#FFC107" }}></span>
          Fats: {fatsPercentage}%
        </div>
      </div>
    </div>
  );
};

export default DailyMacros;
