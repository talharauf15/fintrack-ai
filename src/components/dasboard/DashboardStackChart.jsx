import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { selectExpenses } from "../../redux/expenseSlice";
import { selectIncomes } from "../../redux/incomeSlice";

const DashboardStackChart = () => {
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);

  // Compute totals only once 
  const data = useMemo(() => {
    if (!expenses.length && !incomes.length) return [];

    const totalExpense = expenses.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0
    );
    const totalIncome = incomes.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0
    );
    const totalBalance = totalIncome - totalExpense;

    return [
      {
        name: "Distribution",
        Expense: totalExpense,
        Balance: totalBalance,
        Income: totalIncome,
      },
    ];
  }, [expenses, incomes]);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📊 Income vs Expense & Balance
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Expense" stackId="a" fill="#F44336" />
            <Bar dataKey="Balance" stackId="a" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStackChart;
