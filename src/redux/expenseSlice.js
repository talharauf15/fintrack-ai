import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listExpense, createExpense, updateExpense, deleteExpense } from "../api/expenseAPI";

// Fetch all expenses (single centralized request)
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await listExpense();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create expense
export const createExpenseThunk = createAsyncThunk(
  "expense/createExpense",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createExpense(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update expense
export const updateExpenseThunk = createAsyncThunk(
  "expense/updateExpense",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateExpense(id, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete expense
export const deleteExpenseThunk = createAsyncThunk(
  "expense/deleteExpense",
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpense(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null, // optional timestamp for cache
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchExpenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // createExpenseThunk
      .addCase(createExpenseThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // updateExpenseThunk
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // deleteExpenseThunk
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default expenseSlice.reducer;

// Selectors
export const selectExpenses = (state) => state.expense.items;
export const selectExpenseLoading = (state) => state.expense.loading;
export const selectExpenseLastFetched = (state) => state.expense.lastFetched;
