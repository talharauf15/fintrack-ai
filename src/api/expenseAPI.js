import api from "./axios";

export const createExpense = async (expenseData) => {
  try {
    const res = await api.post("api/expense/", expenseData);
    return res.data;
  } catch (error) {
    console.error("❌ Create expense failed:", error.response?.data || error.message);
    throw error;
  }
};

export const listExpense = async () => {
  try {
    const res = await api.get("api/expense/");
    return res.data;
  } catch (error) {
    console.error("❌ List expense failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get single Expense by ID
export const getExpense = async (id) => {
  try {
    const res = await api.get(`api/expense/${id}/`);
    return res.data;
  } catch (error) {
    console.error("❌ Get expense failed:", error.response?.data || error.message);
    throw error;
  }
};

// Update Expense (PUT)
export const updateExpense = async (id, expenseData) => {
  try {
    const res = await api.put(`api/expense/${id}/`, expenseData);
    return res.data;
  } catch (error) {
    console.error("❌ Update expense failed:", error.response?.data || error.message);
    throw error;
  }
};

// Partial Update Expense (PATCH)
export const patchExpense = async (id, partialData) => {
  try {
    const res = await api.patch(`api/expense/${id}/`, partialData);
    return res.data;
  } catch (error) {
    console.error("❌ Patch expense failed:", error.response?.data || error.message);
    throw error;
  }
};

// Delete Expense
export const deleteExpense = async (id) => {
  try {
    const res = await api.delete(`api/expense/${id}/`);
    return res.data;
  } catch (error) {
    console.error("❌ Delete expense failed:", error.response?.data || error.message);
    throw error;
  }
};
