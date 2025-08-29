import React from "react";
import DashboardSummary from "../components/dasboard/DashboardSummary";
import DashboardPieChart from "../components/dasboard/DashboardPieChart";
import DashboardStackChart from "../components/dasboard/DashboardStackChart";
import DashboardList from "../components/dasboard/DashboardList";

function Dashboard() {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Page</h1>
        {/* Chart Section - Full Width */}
        <DashboardSummary />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Future Content */}
          <DashboardPieChart />
          {/* Right Column - Expense Form */}
          <div>
            <DashboardStackChart />
          </div>
        </div>
        <DashboardList />
      </div>
    </>
  );
}

export default Dashboard;
