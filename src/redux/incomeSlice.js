import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: { items: [] }, // each income = {id, title, amount, date, category}
  reducers: {
    addIncome: (state, action) => {
      state.items.push(action.payload);
    },
    updateIncome: (state, action) => {
      const { id, updatedIncome } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1)
        state.items[index] = { ...state.items[index], ...updatedIncome };
    },
    deleteIncome: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addIncome, updateIncome, deleteIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
