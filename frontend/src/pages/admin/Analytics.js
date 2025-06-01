import React from "react";
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

const reservationsData = [
  { day: "Mon", reservations: 12 },
  { day: "Tue", reservations: 18 },
  { day: "Wed", reservations: 10 },
  { day: "Thu", reservations: 22 },
  { day: "Fri", reservations: 28 },
  { day: "Sat", reservations: 35 },
  { day: "Sun", reservations: 20 },
];

const statusData = [
  { name: "Confirmed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["#000000", "#888888", "#cccccc"];

function Analytics() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-lexend text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Analytics Overview</h2>

      {/* Reservations Over Time */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Reservations Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={reservationsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

      {/* Reservation Status Pie Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Reservation Status Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statusData.map((entry, index) => (
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
  );
}

export default Analytics;
