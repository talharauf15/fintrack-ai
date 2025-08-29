import React, { useEffect, useState } from "react";
import { listExpense } from "../../api/expenseAPI";
import { listIncome } from "../../api/incomeAPI";

const DashboardList = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseData = await listExpense();
        const incomeData = await listIncome();

        // Sort by date (latest first)
        const sortedExpenses = expenseData
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6); // take latest 6

        const sortedIncomes = incomeData
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6); // take latest 6

        setExpenses(sortedExpenses);
        setIncomes(sortedIncomes);
      } catch (err) {
        console.error("❌ Failed to fetch transactions:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Income List */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-green-600">💰 Latest Incomes</h2>
        <ul className="space-y-3">
          {incomes.map((income) => (
            <li
              key={`income-${income.id}`}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium text-gray-800">{income.description}</p>
                <p className="text-sm text-gray-500">
                  {income.category} • {new Date(income.date).toLocaleDateString()}
                </p>
              </div>
              <span className="text-green-600 font-bold">
                +${parseFloat(income.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expense List */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">💸 Latest Expenses</h2>
        <ul className="space-y-3">
          {expenses.map((expense) => (
            <li
              key={`expense-${expense.id}`}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium text-gray-800">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {expense.category} • {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <span className="text-red-600 font-bold">
                -${parseFloat(expense.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardList;
