// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { listExpense } from "../../api/expenseAPI";
// import { listIncome } from "../../api/incomeAPI";

// const COLORS = ["#4CAF50", "#2196F3", "#F44336"]; // Balance, Income, Expense

// export default function DashboardPieChart() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const expenses = await listExpense();
//         const incomes = await listIncome();

//         const totalExpense = expenses.reduce(
//           (acc, item) => acc + parseFloat(item.amount),
//           0
//         );
//         const totalIncome = incomes.reduce(
//           (acc, item) => acc + parseFloat(item.amount),
//           0
//         );
//         const totalBalance = totalIncome - totalExpense;

//         setChartData([
//           { name: "Balance", value: totalBalance },
//           { name: "Income", value: totalIncome },
//           { name: "Expense", value: totalExpense },
//         ]);
//       } catch (err) {
//         console.error("❌ Failed to load balance data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="w-full bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         💰 Balance vs Income vs Expense
//       </h2>
//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="value"
//               label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import { listExpense } from "../../api/expenseAPI";
import { listIncome } from "../../api/incomeAPI";

const COLORS = {
  Balance: "#4CAF50",
  Income: "#2196F3",
  Expense: "#F44336",
};

// 🔹 Active Shape (hover effect)
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
        ${value.toFixed(2)}
      </text>
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        ({(percent * 100).toFixed(2)}%)
      </text>
    </g>
  );
};

export default function BalanceDistributionChart() {
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenses = await listExpense();
        const incomes = await listIncome();

        const totalExpense = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        const totalIncome = incomes.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        const totalBalance = totalIncome - totalExpense;

        setChartData([
          { name: "Balance", value: totalBalance, fill: COLORS.Balance },
          { name: "Income", value: totalIncome, fill: COLORS.Income },
          { name: "Expense", value: totalExpense, fill: COLORS.Expense },
        ]);
      } catch (err) {
        console.error("❌ Failed to load balance data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📊 Distribution by Balance, Income & Expense
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
