import React, { useState } from "react";
import StockForm from "./components/StockForm";
import StockGraph from "./components/StockGraph";
import GeneratePDF from "./components/GeneratePDF";

const App = () => {
  const [graphData, setGraphData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Stock Market Analysis</h1>
      <StockForm setGraphData={setGraphData} />
      {graphData && (
        <>
          <StockGraph graphData={graphData} />
          <GeneratePDF graphData={graphData} />
        </>
      )}
    </div>
  );
};

export default App;
