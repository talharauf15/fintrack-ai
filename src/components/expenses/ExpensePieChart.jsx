import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import { useSelector } from "react-redux";
import { selectExpenses } from "../../redux/expenseSlice";

const categoryColors = {
  Food: "#FF6B6B",
  Transportation: "#4ECDC4",
  Bills: "#FFD93D",
  Shopping: "#6A4C93",
  Health: "#1A936F",
  Entertainment: "#FF9F1C",
  Education: "#2EC4B6",
  Rent: "#FF6B35",
  Utilities: "#3A86FF",
  Taxes: "#8338EC",
  Insurance: "#FF006E",
  "Debt Repayment": "#EF476F",
  Childcare: "#06D6A0",
  Maintenance: "#118AB2",
  Legal: "#073B4C",
  "Gifts & Donations": "#FFD166",
  Pets: "#8AC926",
  Miscellaneous: "#9D4EDD",
};

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} textAnchor={textAnchor} fill="#333">
        {`$${value.toFixed(2)}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function ExpensePieChart() {
  const expenses = useSelector(selectExpenses); 
  const [activeIndex, setActiveIndex] = useState(0);

  // Compute chart data whenever `expenses` changes
  const chartData = useMemo(() => {
    const grouped = expenses.reduce((acc, item) => {
      const category = item.category || "Miscellaneous";
      const amount = parseFloat(item.amount);
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key],
      fill: categoryColors[key] || "#ccc",
    }));
  }, [expenses]);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📊 Expense Distribution by Category
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
