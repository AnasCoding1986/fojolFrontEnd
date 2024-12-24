import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockGraph = ({ graphData }) => {
  if (!graphData || !graphData["Time Series (1min)"] && !graphData["Time Series (5min)"]) {
    return null;
  }

  const timeSeries = graphData["Time Series (1min)"] || graphData["Time Series (5min)"];
  const labels = Object.keys(timeSeries);
  const dataPoints = labels.map((time) => parseFloat(timeSeries[time]["4. close"]));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Closing Price",
        data: dataPoints,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockGraph;
