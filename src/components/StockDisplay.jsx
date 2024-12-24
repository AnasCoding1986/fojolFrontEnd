import React from "react";

const StockDisplay = ({ stockData }) => {
  const timeSeries = stockData["Time Series (1min)"] || stockData["Time Series (5min)"] || {};

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Stock Data for {stockData["Meta Data"]["2. Symbol"]}
      </h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Time</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Open</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">High</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Low</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Close</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(timeSeries).map((time) => (
            <tr key={time}>
              <td className="border border-gray-300 px-4 py-2">{time}</td>
              <td className="border border-gray-300 px-4 py-2">
                {timeSeries[time]["1. open"]}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {timeSeries[time]["2. high"]}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {timeSeries[time]["3. low"]}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {timeSeries[time]["4. close"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockDisplay;
