import React, { useState } from "react";
import axios from "axios";

const StockForm = ({ setStockData, setGraphData }) => {
  const [symbol, setSymbol] = useState(""); // For stock symbol
  const [interval, setInterval] = useState(""); // For stock interval

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol || !interval) {
      alert("Please provide both stock symbol and interval.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/stock", {
        params: { symbol, interval },
      });

      setStockData(response.data); // Update the state with stock data
      setGraphData(response.data); // Pass the data for graph rendering
    } catch (error) {
      alert("Failed to fetch stock data. Please try again.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    >
      {/* Stock Symbol Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Stock Symbol</label>
        <input
          type="text"
          placeholder="e.g., GOOGL"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Interval Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Interval</label>
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Interval</option>
          <option value="1min">1 Minute</option>
          <option value="5min">5 Minutes</option>
          <option value="15min">15 Minutes</option>
          <option value="30min">30 Minutes</option>
          <option value="60min">1 Hour</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Fetch Data & Get Advice
      </button>
    </form>
  );
};

export default StockForm;
