import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { listExpense } from "../../api/expenseAPI";

const ExpenseAreaChart = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await listExpense();

        // ✅ Unique categories
        const uniqueCategories = [...new Set(expenses.map((e) => e.category))];
        setCategories(uniqueCategories);

        // ✅ Group by date + category sums
        const grouped = {};
        expenses.forEach((exp) => {
          const date = exp.date;
          if (!grouped[date]) {
            grouped[date] = { name: date };
            uniqueCategories.forEach((cat) => {
              grouped[date][cat] = 0;
            });
          }
          grouped[date][exp.category] += parseFloat(exp.amount);
        });

        setData(Object.values(grouped));
      } catch (error) {
        console.error("❌ Failed to load chart data", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        📊 Expense Trend by Category
      </h2>
  
      <div className="w-full h-96">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
  
            {/* ✅ Dynamic Areas by Category */}
            {categories.map((cat, i) => (
              <Area
                key={cat}
                type="monotone"
                dataKey={cat}
                stackId="1"
                stroke={["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"][i % 5]}
                fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"][i % 5]}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  
};

export default ExpenseAreaChart;
