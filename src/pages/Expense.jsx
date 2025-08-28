import React from "react";
import ExpenseAreaChart from "../components/expenses/ExpenseAreaChart";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpensePieChart from "../components/expenses/ExpensePieChart";

function Expense() {
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
        <ExpensePieChart/>
        </div>
      </div>
      <ExpenseList/>
    </div>
  );
}

export default Expense;
