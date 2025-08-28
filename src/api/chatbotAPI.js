import api from "./axios";

// ✅ Chatbot Query
export const askChatbot = async (query) => {
  try {
    const res = await api.post("api/ai/chatbot/", { query });
    return res.data;
  } catch (error) {
    console.error("❌ Chatbot API failed:", error.response?.data || error.message);
    throw error;
  }
};
