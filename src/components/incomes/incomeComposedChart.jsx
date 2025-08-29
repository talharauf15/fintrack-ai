import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Area,
//   Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { listIncome } from "../../api/incomeAPI";

const IncomeChart = () => {
  const [view, setView] = useState("category"); // "category" | "date"
  const [categoryData, setCategoryData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchIncomes = async () => {
    try {
      const data = await listIncome();

      // ✅ Category totals
      const categoryTotals = {};
      data.forEach((income) => {
        const amount = parseFloat(income.amount);
        const category = income.category;

        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
        categoryTotals[category] += amount;
      });

      const formattedCategoryData = Object.entries(categoryTotals).map(
        ([category, total]) => ({
          name: category,
          amount: total,
        })
      );
      setCategoryData(formattedCategoryData);

      // ✅ Group by date and category
      const grouped = {};
      const uniqueCategories = new Set();

      data.forEach((income) => {
        const date = new Date(income.date).toLocaleDateString();
        const category = income.category;
        const amount = parseFloat(income.amount);

        if (!grouped[date]) {
          grouped[date] = { date };
        }
        if (!grouped[date][category]) {
          grouped[date][category] = 0;
        }

        grouped[date][category] += amount;
        uniqueCategories.add(category);
      });

      setCategories([...uniqueCategories]);
      setDateData(Object.values(grouped));
    } catch (error) {
      console.error("❌ Failed to fetch incomes", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView("category")}
          className={`px-4 py-2 rounded ${
            view === "category" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          By Category
        </button>
        <button
          onClick={() => setView("date")}
          className={`px-4 py-2 rounded ${
            view === "date" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          By Date (Stacked)
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {view === "category" ? "📊 Income by Category" : "📊 Income by Date (Stacked by Category)"}
      </h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          {view === "category" ? (
            // 📌 Category view
            <ComposedChart
              data={categoryData}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" label={{ value: "Category", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Total Amount", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amount" fill="#82ca9d" stroke="#82ca9d" />
              {/* <Bar dataKey="amount" barSize={25} fill="#413ea0" /> */}
            </ComposedChart>
          ) : (
            // 📌 Date view
            <BarChart
              data={dateData}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {categories.map((cat, i) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="a"
                  fill={`hsl(${(i * 50) % 360}, 70%, 50%)`}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeChart;
