import React, { useEffect, useState } from "react";
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
import { listExpense } from "../../api/expenseAPI";
import { listIncome } from "../../api/incomeAPI";

const DashboardStackChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenses = await listExpense();
        const incomes = await listIncome();

        const totalExpense = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        const totalIncome = incomes.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        const totalBalance = totalIncome - totalExpense;

        setData([
          {
            name: "Distribution",
            Expense: totalExpense,
            Balance: totalBalance,
            Income: totalIncome, // (for tooltip reference)
          },
        ]);
      } catch (err) {
        console.error("❌ Failed to load chart data:", err);
      }
    };

    fetchData();
  }, []);

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
            {/* 🔹 Stacked bars */}
            <Bar dataKey="Expense" stackId="a" fill="#F44336" />
            <Bar dataKey="Balance" stackId="a" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStackChart;
