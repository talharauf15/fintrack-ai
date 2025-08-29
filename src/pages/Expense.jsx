import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  selectExpenses,
  selectExpenseLastFetched,
} from "../redux/expenseSlice";

import ExpenseAreaChart from "../components/expenses/ExpenseAreaChart";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpensePieChart from "../components/expenses/ExpensePieChart";

function Expense() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const lastFetched = useSelector(selectExpenseLastFetched);

  useEffect(() => {
    if (
      !expenses ||
      expenses.length === 0 ||
      Date.now() - (lastFetched || 0) > 5 * 60 * 1000
    ) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, expenses, lastFetched]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expense Page</h1>

      {/* Chart Section - Full Width */}
      <ExpenseAreaChart />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Future Content */}
        <ExpenseForm />

        {/* Right Column - Expense Form */}
        <div>
          <ExpensePieChart />
        </div>
      </div>
      {/* List Section - Full Width */}
      <ExpenseList />
    </div>
  );
}

export default Expense;
