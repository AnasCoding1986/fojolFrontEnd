import React, { useState } from "react";
import StockForm from "./components/StockForm";
import StockDisplay from "./components/StockDisplay";
import StockGraph from "./components/StockGraph";
import GeneratePDF from "./components/GeneratePDF";

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [graphData, setGraphData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Stock Market Analysis</h1>

      <StockForm setStockData={setStockData} setGraphData={setGraphData} />

      {stockData && <StockDisplay stockData={stockData} />}

      {graphData && <StockGraph graphData={graphData} />}

      {stockData && <GeneratePDF stockData={stockData} />}
    </div>
  );
};

export default App;
