import React, { useEffect, useState , useMemo } from "react";
import { useSelector } from "react-redux";
import { selectIncomes } from "../../redux/incomeSlice"
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";

const IncomeChart = () => {
  const [view, setView] = useState("category"); 
  const incomes = useSelector(selectIncomes) || [];

  // categoryData (total per category)
  const categoryData = useMemo(() => {
    const totals = {};
    for (const inc of incomes) {
      const cat = inc.category || "Other";
      const amt = parseFloat(inc.amount) || 0;
      totals[cat] = (totals[cat] || 0) + amt;
    }
    return Object.entries(totals).map(([name, amount]) => ({ name, amount }));
  }, [incomes]);

  // dateData (grouped by date, with amounts per category)
  const { dateData, categories } = useMemo(() => {
    const grouped = {};
    const cats = new Set();
    for (const inc of incomes) {
      const date = new Date(inc.date).toLocaleDateString();
      const cat = inc.category || "Other";
      const amt = parseFloat(inc.amount) || 0;
      if (!grouped[date]) grouped[date] = { date };
      grouped[date][cat] = (grouped[date][cat] || 0) + amt;
      cats.add(cat);
    }
    return { dateData: Object.values(grouped), categories: [...cats] };
  }, [incomes]);

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
        {view === "category"
          ? "📊 Income by Category"
          : "📊 Income by Date (Stacked by Category)"}
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
              <XAxis
                dataKey="name"
                label={{
                  value: "Category",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Total Amount",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="amount"
                fill="#82ca9d"
                stroke="#82ca9d"
              />
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
