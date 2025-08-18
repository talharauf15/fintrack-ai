import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";
import aiReducer from "./aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
    ai: aiReducer,
  },
});
export default store;
