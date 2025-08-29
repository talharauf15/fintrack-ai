import React, { useEffect, useState } from "react";
import { listExpense } from "../../api/expenseAPI";
import { listIncome } from "../../api/incomeAPI";

export default function DashboardSummary() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Get expenses
        const expenses = await listExpense();
        const expenseSum = expenses.reduce(
          (acc, item) => acc + parseFloat(item.amount),
          0
        );
        setTotalExpense(expenseSum);

        // 🔹 Get incomes
        const incomes = await listIncome();
        const incomeSum = incomes.reduce(
          (acc, item) => acc + parseFloat(item.amount),
          0
        );
        setTotalIncome(incomeSum);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const totalBalance = totalIncome - totalExpense;

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
