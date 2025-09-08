// src/components/DashboardMain.jsx
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { FaVirus, FaHeartbeat, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

// KPI Cards
const kpiData = [
  { title: "Total Cases", value: 450, icon: <FaVirus className="text-red-500 text-3xl" /> },
  { title: "Recovered", value: 300, icon: <FaHeartbeat className="text-green-500 text-3xl" /> },
  { title: "Active Cases", value: 130, icon: <FaExclamationTriangle className="text-yellow-500 text-3xl" /> },
  { title: "Critical Alerts", value: 20, icon: <FaShieldAlt className="text-teal-600 text-3xl" /> },
];

// Daily disease trend
const diseaseTrend = [
  { date: "01 Sep", Dengue: 5, Malaria: 3, Flu: 10, Chikungunya: 2 },
  { date: "02 Sep", Dengue: 7, Malaria: 5, Flu: 12, Chikungunya: 3 },
  { date: "03 Sep", Dengue: 10, Malaria: 4, Flu: 15, Chikungunya: 1 },
  { date: "04 Sep", Dengue: 8, Malaria: 6, Flu: 14, Chikungunya: 2 },
  { date: "05 Sep", Dengue: 12, Malaria: 7, Flu: 16, Chikungunya: 3 },
];

// Village disease cases
const villageCases = [
  { village: "Village A", Dengue: 5, Malaria: 2, Flu: 8, Chikungunya: 1, risk: "High" },
  { village: "Village B", Dengue: 2, Malaria: 5, Flu: 6, Chikungunya: 2, risk: "Medium" },
  { village: "Village C", Dengue: 1, Malaria: 1, Flu: 3, Chikungunya: 0, risk: "Low" },
  { village: "Village D", Dengue: 3, Malaria: 3, Flu: 5, Chikungunya: 1, risk: "Medium" },
];

// Pie chart for active disease distribution
const diseasePieData = [
  { name: "Dengue", value: 30 },
  { name: "Malaria", value: 20 },
  { name: "Flu", value: 60 },
  { name: "Chikungunya", value: 10 },
];

const COLORS = ["#FF4D4F", "#0088FE", "#00C49F", "#FFBB28"];
const RISK_COLOR = { High: "bg-red-500", Medium: "bg-yellow-500", Low: "bg-green-500" };

export default function DashboardMain() {
  const [selectedVillage, setSelectedVillage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Healthcare Dashboard</h1>
          <p className="text-gray-600">Real-time insights into disease spread & recovery in rural Punjab</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white shadow-md rounded-xl p-3 text-center w-32">
            <p className="text-gray-500 text-sm">Last Login</p>
            <p className="font-semibold text-gray-800 text-sm">06 Sep 2025</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-3 text-center w-32">
            <p className="text-gray-500 text-sm">User</p>
            <p className="font-semibold text-gray-800 text-sm">CHW: Unknown Person</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition">
            {kpi.icon}
            <div>
              <p className="text-sm text-gray-500">{kpi.title}</p>
              <p className="text-xl font-bold text-gray-800">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Disease Trend */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Disease Spread Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={diseaseTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Dengue" stroke="#FF4D4F" />
              <Line type="monotone" dataKey="Malaria" stroke="#0088FE" />
              <Line type="monotone" dataKey="Flu" stroke="#00C49F" />
              <Line type="monotone" dataKey="Chikungunya" stroke="#FFBB28" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Village Cases */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Village-wise Cases</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={villageCases}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="village" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Dengue" fill="#FF4D4F" />
              <Bar dataKey="Malaria" fill="#0088FE" />
              <Bar dataKey="Flu" fill="#00C49F" />
              <Bar dataKey="Chikungunya" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-4">
            {villageCases.map((v, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${RISK_COLOR[v.risk]}`}></span>
                <p className="text-sm text-gray-600">{v.village}: {v.risk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Distribution Pie */}
        <div className="bg-white shadow-lg rounded-xl p-5 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Disease Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={diseasePieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                paddingAngle={5}
              >
                {diseasePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Important Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Important Alerts</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaExclamationTriangle className="text-red-500 mt-1" />
              <p className="text-gray-600 text-sm">
                Dengue outbreak in Village A. Monitor mosquito breeding sites and educate villagers.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <FaExclamationTriangle className="text-yellow-500 mt-1" />
              <p className="text-gray-600 text-sm">
                Flu cases rising in Village C. Encourage vaccination and maintain hygiene.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <FaExclamationTriangle className="text-teal-600 mt-1" />
              <p className="text-gray-600 text-sm">
                Chikungunya reported in Village B. Promote mosquito repellents and preventive measures.
              </p>
            </li>
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Actionable Recommendations</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>Distribute mosquito nets and repellents in high-risk villages.</li>
            <li>Organize vaccination drives for seasonal flu.</li>
            <li>Educate villagers about clean water & sanitation.</li>
            <li>Follow-up visits for recovered patients.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
