// src/components/AskMistral.jsx
import React, { useState } from "react";
import axios from "axios";

const AskMistral = ({ symbol, interval }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      alert("Please enter a query!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/mistral/ask", {
        query,
        symbol,
        interval,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get a response from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ask Mistral AI</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Ask anything about stocks..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="mt-4">
          <h3 className="font-bold">Mistral AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskMistral;
