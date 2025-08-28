import React, { useState } from "react";
import { askChatbot } from "../api/chatbotAPI";

const TestChatbot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleAsk = async () => {
    try {
      const res = await askChatbot(input);
      console.log("✅ Chatbot Response:", res);
      setResponse(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🤖 Test Chatbot API</h2>

      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleAsk}>Ask</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestChatbot;
