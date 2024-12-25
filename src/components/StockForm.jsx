import React, { useState } from "react";
import axios from "axios";

const stockCategories = {
  Technology: ["AAPL", "GOOGL", "MSFT", "TSLA", "FB"],
  Healthcare: ["JNJ", "PFE", "MRK", "AMGN", "GILD"],
  Finance: ["JPM", "GS", "C", "BAC", "WFC"],
};

const StockForm = ({ setSymbol, setInterval, setStockData, setGraphData }) => {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!setSymbol || !setInterval) {
      alert("Please provide both stock symbol and interval.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/stock", {
        params: { symbol: setSymbol, interval: setInterval },
      });
      setStockData(response.data);
      setGraphData(response.data);
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Stock Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Stock Symbol
        </label>
        <select
          value={setSymbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Symbol</option>
          {category &&
            stockCategories[category]?.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interval
        </label>
        <select
          value={setInterval}
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
