import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIncomes,
  selectIncomes,
  selectIncomeLastFetched,
} from "../redux/incomeSlice";

import IncomeList from "../components/incomes/IncomeList";
import IncomeForm from "../components/incomes/IncomeForm";
import IncomeChart from "../components/incomes/incomeComposedChart";
import IncomePieChart from "../components/incomes/IncomePieChart";

function Income() {
  const dispatch = useDispatch();
  const incomes = useSelector(selectIncomes);
  const lastFetched = useSelector(selectIncomeLastFetched);

  useEffect(() => {
    if (
      !incomes ||
      incomes.length === 0 ||
      Date.now() - (lastFetched || 0) > 5 * 60 * 1000
    ) {
      dispatch(fetchIncomes());
    }
  }, [dispatch, incomes, lastFetched]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Income Page</h1>

      {/* Chart Section - Full Width */}
      <IncomeChart />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Future Content */}
        <IncomeForm />
        {/* Right Column - Expense Form */}
        <div>
          <IncomePieChart />
        </div>
      </div>
      {/* List Section - Full Width */}
      <IncomeList />
    </div>
  );
}

export default Income;
