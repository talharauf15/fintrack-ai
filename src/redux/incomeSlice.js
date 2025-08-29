// src/redux/incomeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listIncome, createIncome, updateIncome, deleteIncome } from "../api/incomeAPI";

// Fetch all incomes (single request)
export const fetchIncomes = createAsyncThunk(
  "income/fetchIncomes",
  async (_, { rejectWithValue }) => {
    try {
      const data = await listIncome();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create income
export const createIncomeThunk = createAsyncThunk(
  "income/createIncome",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createIncome(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update income
export const updateIncomeThunk = createAsyncThunk(
  "income/updateIncome",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateIncome(id, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete income
export const deleteIncomeThunk = createAsyncThunk(
  "income/deleteIncome",
  async (id, { rejectWithValue }) => {
    try {
      await deleteIncome(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null, // timestamp for optional TTL
  },
  reducers: {
    // keep if you want local-only actions (not required)
  },
  extraReducers: (builder) => {
    builder
      // fetchIncomes
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // createIncomeThunk
      .addCase(createIncomeThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createIncomeThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // updateIncomeThunk
      .addCase(updateIncomeThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateIncomeThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // deleteIncomeThunk
      .addCase(deleteIncomeThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      })
      .addCase(deleteIncomeThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export default incomeSlice.reducer;

// Selectors
export const selectIncomes = state => state.income.items;
export const selectIncomeLoading = state => state.income.loading;
export const selectIncomeLastFetched = state => state.income.lastFetched;
