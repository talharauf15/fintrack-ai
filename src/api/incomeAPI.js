import api from "./axios";

// 📌 Get all incomes
export const listIncome = async (params = {}) => {
  try {
    const res = await api.get("api/income/", { params });
    return res.data;
  } catch (error) {
    console.error("❌ Fetch incomes failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Get single income by ID
export const getIncome = async (id) => {
  try {
    const res = await api.get(`api/income/${id}/`);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch income failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Create new income
export const createIncome = async (payload) => {
  try {
    const res = await api.post("api/income/", payload);
    return res.data;
  } catch (error) {
    console.error("❌ Create income failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Update income completely (PUT)
export const updateIncome = async (id, payload) => {
  try {
    const res = await api.put(`api/income/${id}/`, payload);
    return res.data;
  } catch (error) {
    console.error("❌ Update income failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Partial update (PATCH)
export const patchIncome = async (id, payload) => {
  try {
    const res = await api.patch(`api/income/${id}/`, payload);
    return res.data;
  } catch (error) {
    console.error("❌ Patch income failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Delete income
export const deleteIncome = async (id) => {
  try {
    const res = await api.delete(`api/income/${id}/`);
    return res.data; // backend ka response return karo
  } catch (error) {
    console.error("❌ Delete income failed:", error.response?.data || error.message);
    throw error;
  }
};
