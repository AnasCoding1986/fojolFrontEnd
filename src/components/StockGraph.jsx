import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockGraph = ({ graphData }) => {
  const chartData = {
    labels: Object.keys(graphData[Object.keys(graphData)[0]]["Time Series (1min)"] || {}),
    datasets: Object.keys(graphData).map((symbol, index) => ({
      label: symbol,
      data: Object.keys(graphData[symbol]["Time Series (1min)"] || {}).map(
        (time) => graphData[symbol]["Time Series (1min)"][time]["4. close"]
      ),
      fill: false,
      borderColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 80}, 192, 1)`,
      tension: 0.1,
    })),
  };

  return (
    <div id="stock-graph" className="bg-white shadow-md rounded p-4 mb-4 w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Price Comparison</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockGraph;
