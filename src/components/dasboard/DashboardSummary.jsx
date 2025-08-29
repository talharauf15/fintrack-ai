import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectExpenses } from "../../redux/expenseSlice";
import { selectIncomes } from "../../redux/incomeSlice";

export default function DashboardSummary() {
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);

  // Compute totals only once
  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    const expenseSum = expenses.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0
    );
    const incomeSum = incomes.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0
    );
    return {
      totalIncome: incomeSum,
      totalExpense: expenseSum,
      totalBalance: incomeSum - expenseSum,
    };
  }, [expenses, incomes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      {/* Total Balance */}
      <div className="bg-white shadow-md rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-600">Total Balance</h3>
        <p className="text-2xl font-bold text-gray-900">
          ${totalBalance.toFixed(2)}
        </p>
      </div>

      {/* Total Income */}
      <div className="bg-green-100 shadow-md rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
        <p className="text-2xl font-bold text-green-900">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      {/* Total Expense */}
      <div className="bg-red-100 shadow-md rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-red-700">Total Expense</h3>
        <p className="text-2xl font-bold text-red-900">
          ${totalExpense.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
