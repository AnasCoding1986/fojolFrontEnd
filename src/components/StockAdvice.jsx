// src/components/StockAdvice.jsx
import React, { useState } from "react";
import { Mistral } from '@mistralai/mistralai';

const StockAdvice = () => {
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput) {
      alert("Please enter a question!");
      return;
    }

    setLoading(true);
    const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
    const client = new Mistral({ apiKey: apiKey });

    try {
      const response = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: userInput }],
      });
      setChatResponse(response.choices[0].message.content);
    } catch (error) {
      console.error("Error with Mistral AI:", error);
      setChatResponse("Sorry, there was an error while fetching the response.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ask Mistral AI</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Ask anything about stocks..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Loading..." : "Get Advice"}
        </button>
      </form>
      {chatResponse && (
        <div className="mt-4">
          <h3 className="font-bold">Mistral AI Response:</h3>
          <p>{chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default StockAdvice;
