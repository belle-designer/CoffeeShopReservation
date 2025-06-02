import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WelcomeAdmin() {
  const [summary, setSummary] = useState({
    totalReservations: 0,
    pendingApprovals: 0,
    registeredUsers: 0,
    revenue: 0,
    weeklyReservations: [],
    statusBreakdown: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard-summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch summary:", err);
      });
  }, []);

  const COLORS = ["#000000", "#888888", "#cccccc"];

  return (
    <div className="text-center mt-10 px-4 max-w-7xl mx-auto font-lexend">
      <h1 className="text-5xl font-bold text-black mb-6">WELCOME, ADMIN!</h1>
      <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg mb-8">
        This is your dashboard overview. From here, you can manage user reservations,
        view analytics, and handle administrative tasks for{" "}
        <span className="font-semibold text-black">Bean & Brew</span>.
      </p>

      {/* Analytics Overview */}
      <div className="w-full px-4 py-8 text-black mb-10">
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0 justify-center items-center">
          {/* Bar Chart */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
              Reservations Last 7 Days
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={summary.weeklyReservations} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip
                  cursor={{ fill: "#f0f0f0" }}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
                />
                <Bar dataKey="reservations" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
              Reservation Status Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={summary.statusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {summary.statusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "14px", color: "#000" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Total Reservations", value: summary.totalReservations },
          { label: "Pending Approvals", value: summary.pendingApprovals },
          { label: "Registered Users", value: summary.registeredUsers },
          { label: "Revenue", value: `₱${summary.revenue.toLocaleString()}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center border border-gray-300 rounded-lg p-4"
          >
            <span className="text-2xl font-bold text-black">{value}</span>
            <span className="text-gray-600 mt-1 text-sm text-center">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeAdmin;
