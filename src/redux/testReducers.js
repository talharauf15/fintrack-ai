import { store } from "./store";
import { login, logout } from "./authSlice";
import { addIncome, updateIncome, deleteIncome } from "./incomeSlice";
import { addExpense, updateExpense, deleteExpense } from "./expenseSlice";
import { addMessage, clearChat } from "./aiSlice";

// --- AUTH ---
store.dispatch(login({ id: 1, name: "Talha", email: "talha@test.com" }));
console.log("Auth after login:", store.getState().auth);

store.dispatch(logout());
console.log("Auth after logout:", store.getState().auth);

// --- INCOME ---
store.dispatch(addIncome({ id: 1, title: "Salary", amount: 50000, date: "2025-08-18", category: "Job" }));
store.dispatch(addIncome({ id: 2, title: "Freelance", amount: 20000, date: "2025-08-18", category: "Side Hustle" }));
console.log("Income after adding:", store.getState().income);

store.dispatch(updateIncome({ id: 2, updatedIncome: { amount: 25000 } }));
console.log("Income after update:", store.getState().income);

store.dispatch(deleteIncome(1));
console.log("Income after delete:", store.getState().income);

// --- EXPENSE ---
store.dispatch(addExpense({ id: 1, title: "Food", amount: 3000, date: "2025-08-18", category: "Groceries" }));
console.log("Expense after adding:", store.getState().expense);

store.dispatch(updateExpense({ id: 1, updatedExpense: { amount: 3500 } }));
console.log("Expense after update:", store.getState().expense);

store.dispatch(deleteExpense(1));
console.log("Expense after delete:", store.getState().expense);

// --- AI ---
store.dispatch(addMessage({ role: "user", text: "How to save money?" }));
store.dispatch(addMessage({ role: "ai", text: "Save 20% of your income!" }));
console.log("AI Messages:", store.getState().ai);

store.dispatch(clearChat());
console.log("AI Messages after clear:", store.getState().ai);
