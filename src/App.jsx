import React, { useState } from "react";
import StockForm from "./components/StockForm";
import AskMistral from "./components/AskMistral";
import StockGraph from "./components/StockGraph";
import StockDisplay from "./components/StockDisplay";

const App = () => {
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("");
  const [stockData, setStockData] = useState(null);
  const [graphData, setGraphData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Stock Market Analysis</h1>
      <StockForm
        setSymbol={setSymbol}
        setInterval={setInterval}
        setStockData={setStockData}
        setGraphData={setGraphData}
      />
      {stockData && <StockDisplay stockData={stockData} />}
      {graphData && <StockGraph graphData={graphData} />}
      {symbol && interval && <AskMistral symbol={symbol} interval={interval} />}
    </div>
  );
};

export default App;
