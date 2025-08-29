import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  selectExpenses,
  selectExpenseLastFetched,
} from "../redux/expenseSlice";
import {
  fetchIncomes,
  selectIncomes,
  selectIncomeLastFetched,
} from "../redux/incomeSlice";
import DashboardSummary from "../components/dasboard/DashboardSummary";
import DashboardPieChart from "../components/dasboard/DashboardPieChart";
import DashboardStackChart from "../components/dasboard/DashboardStackChart";
import DashboardList from "../components/dasboard/DashboardList";

function Dashboard() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const lastFetchedExpense = useSelector(selectExpenseLastFetched);
  const incomes = useSelector(selectIncomes);
  const lastFetchedIncome = useSelector(selectIncomeLastFetched);

  useEffect(() => {
    if (
      !expenses ||
      expenses.length === 0 ||
      Date.now() - (lastFetchedExpense || 0) > 5 * 60 * 1000
    ) {
      dispatch(fetchExpenses());
    }

    if (
      !incomes ||
      incomes.length === 0 ||
      Date.now() - (lastFetchedIncome || 0) > 5 * 60 * 1000
    ) {
      dispatch(fetchIncomes());
    }
  }, [dispatch, expenses, lastFetchedExpense, incomes, lastFetchedIncome]);


  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Page</h1>
        {/* Chart Section - Full Width */}
        <DashboardSummary />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Future Content */}
          <DashboardPieChart />
          {/* Right Column - Expense Form */}
          <div>
            <DashboardStackChart />
          </div>
        </div>
        <DashboardList />
      </div>
    </>
  );
}

export default Dashboard;
