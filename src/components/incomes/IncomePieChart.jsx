import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectIncomes } from "../../redux/incomeSlice";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

const incomeCategoryColors = {
  Salary: "#4CAF50",
  Business: "#2196F3",
  Investment: "#FF9800",
  Freelancing: "#9C27B0",
  "Rental Income": "#3F51B5",
  Dividends: "#00BCD4",
  Interest: "#FFC107",
  "Capital Gains": "#FF5722",
  Pension: "#795548",
  Annuity: "#607D8B",
  "Social Security": "#8BC34A",
  Royalties: "#009688",
  "Gambling Winnings": "#E91E63",
  Alimony: "#CDDC39",
  "Child Support": "#673AB7",
  Grants: "#FFEB3B",
  Scholarship: "#F44336",
  "Tax Refund": "#03A9F4",
  "Sale of Assets": "#8E24AA",
  Gift: "#FF6F61",
  Inheritance: "#6D4C41",
  Other: "#9E9E9E",
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
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

export default function IncomeChart() {
  const incomes = useSelector(selectIncomes) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = useMemo(() => {
    const grouped = {};
    for (const inc of incomes) {
      const cat = inc.category || "Other";
      const amt = parseFloat(inc.amount) || 0;
      grouped[cat] = (grouped[cat] || 0) + amt;
    }
    return Object.keys(grouped).map(name => ({
      name,
      value: grouped[name],
      fill: incomeCategoryColors[name] || "#ccc",
    }));
  }, [incomes]);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        💰 Income Distribution by Category
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
