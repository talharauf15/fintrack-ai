import React from "react";
import IncomeList from "../components/incomes/IncomeList";
import IncomeForm from "../components/incomes/IncomeForm";
import IncomeChart from "../components/incomes/incomeComposedChart";
import IncomePieChart from "../components/incomes/IncomePieChart";

function Income() {
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
          {/* <Income/> */}
        </div>
      </div>
      <IncomeList />
    </div>
  );
}

export default Income;
