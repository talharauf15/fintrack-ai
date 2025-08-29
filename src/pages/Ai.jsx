import React, { useState } from "react";
import { Send } from "lucide-react";
import { askChatbot } from "../api/chatbotAPI"; 

const Ai = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! 👋 How can I help you with your expenses today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessage = { role: "user", content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await askChatbot(input);

      // AI reply
      const botReply = {
        role: "assistant",
        
        content: res?.advice || "⚠️ Sorry, I couldn’t understand that.",
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error("❌ Chatbot error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">AI Page</h1>
      <div className="flex flex-col h-[500px] bg-white shadow-lg rounded-xl">
        {/* Chat Header */}
        <div className="p-4 border-b bg-gray-100 font-bold text-lg text-gray-700">
          🤖 AI Assistant
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm italic">AI is typing...</div>
          )}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={sendMessage}
          className="p-3 border-t flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Ai;
