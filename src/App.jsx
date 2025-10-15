import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
      });

      const tools = [
        {
          googleSearch: {},
        },
      ];

      const config = {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        tools,
      };

      const model = "gemini-2.5-flash-lite";
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: input,
            },
          ],
        },
      ];

      const streamResponse = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let fullResponse = "";
      for await (const chunk of streamResponse) {
        fullResponse += chunk.text || "";
        setResponse(fullResponse);
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while processing your request"
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Google AI Search Assistant</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-2.5 text-base border border-gray-300 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2.5 text-base text-white border-none rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && (
        <div className="mt-5 p-2.5 bg-red-100 text-red-800 border border-red-200 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-5 p-4 bg-gray-50 border border-gray-300 rounded whitespace-pre-wrap">
          <h3 className="text-xl font-semibold mb-2">Response:</h3>
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
