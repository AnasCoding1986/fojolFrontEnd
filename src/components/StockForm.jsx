import React, { useState } from "react";
import axios from "axios";

const stockCategories = {
  Technology: ["AAPL", "GOOGL", "MSFT"],
  Healthcare: ["JNJ", "PFE", "MRK"],
  Finance: ["JPM", "GS", "C"],
};

const StockForm = ({ setGraphData }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [interval, setInterval] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symbols = selectedCategories
      .flatMap((category) => stockCategories[category])
      .join(",");

    try {
      const response = await axios.get("http://localhost:5000/api/stock/compare", {
        params: { symbols, interval },
      });
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
          Stock Categories
        </label>
        {Object.keys(stockCategories).map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category)}
            />
            <label className="ml-2">{category}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interval
        </label>
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
