import React, { useState } from "react";
import {
  createExpense,
  listExpense,
  getExpense,
  updateExpense,
  patchExpense,
  deleteExpense,
} from "../api/expenseAPI";

const TestExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState(null);

  // ✅ 1. Create Expense
  const handleCreateExpense = async () => {
    try {
      const data = {
        description: "Coffee at Starbucks",
        amount: 4.5,
        date: "2025-08-27",
        category: "Legal",
      };
      const res = await createExpense(data);
      console.log("✅ Expense Created:", res);
      setExpense(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ 2. List Expenses
  const handleListExpense = async () => {
    try {
      const res = await listExpense();
      console.log("✅ All Expenses:", res);
      setExpenses(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ 3. Get Expense by ID
  const handleGetExpense = async () => {
    try {
      if (!expense) return alert("⚠️ First create an expense!");
      const res = await getExpense(expense.id);
      console.log("✅ Single Expense:", res);
      setExpense(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ 4. Update Expense (PUT)
  const handleUpdateExpense = async () => {
    try {
      if (!expense) return alert("⚠️ First create an expense!");
      const data = {
        description: "Coffee",
        amount: 5.0,
        date: "2025-08-27",
        category: "Food",
      };
      const res = await updateExpense(expense.id, data);
      console.log("✅ Expense Updated:", res);
      setExpense(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ 5. Patch Expense (PATCH)
  const handlePatchExpense = async () => {
    try {
      if (!expense) return alert("⚠️ First create an expense!");
      const data = { amount: 5.25 };
      const res = await patchExpense(expense.id, data);
      console.log("✅ Expense Patched:", res);
      setExpense(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ 6. Delete Expense
  const handleDeleteExpense = async () => {
    try {
      if (!expense) return alert("⚠️ First create an expense!");
      const res = await deleteExpense(expense.id);
      console.log("✅ Expense Deleted:", res);
      setExpense(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚀 Test Expense APIs</h2>
      <button onClick={handleCreateExpense}>➕ Create Expense</button>
      <button onClick={handleListExpense}>📋 List Expenses</button>
      <button onClick={handleGetExpense}>🔍 Get Expense</button>
      <button onClick={handleUpdateExpense}>✏️ Update Expense (PUT)</button>
      <button onClick={handlePatchExpense}>⚡ Patch Expense</button>
      <button onClick={handleDeleteExpense}>🗑️ Delete Expense</button>

      <pre>{JSON.stringify(expense, null, 2)}</pre>
      <pre>{JSON.stringify(expenses, null, 2)}</pre>
    </div>
  );
};

export default TestExpense;
