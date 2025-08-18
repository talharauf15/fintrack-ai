import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { items: [] }, // each expense = {id, title, amount, date, category}
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
    updateExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1)
        state.items[index] = { ...state.items[index], ...updatedExpense };
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
