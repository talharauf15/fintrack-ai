import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: { messages: [] }, // [{role: "user"|"ai", text: "...."}]
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); 
      // payload = {role: "user"/"ai", text: "Hello"}
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearChat } = aiSlice.actions;
export default aiSlice.reducer;
