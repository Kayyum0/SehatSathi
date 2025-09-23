// src/components/pages/DashboardMain.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaVirus,
  FaHeartbeat,
  FaExclamationTriangle,
  FaShieldAlt,
  FaDownload,
  FaSearch,
  FaRegCalendarAlt,
  FaUserMd,
} from "react-icons/fa";

/*
 Improved, production-ready-feel DashboardMain
 - KPIs with mini sparklines
 - Filters (disease select + village search)
 - Trend line (multi-series)
 - Village bar chart + risk badges + CSV export
 - Recent consultations list (dummy)
 - Actionable alerts & recommendations
 - Responsive layout
*/

// ---------- Dummy Data ----------
const diseaseTrend = [
  { date: "26 Aug", Dengue: 5, Malaria: 3, Flu: 10, Chik: 2 },
  { date: "27 Aug", Dengue: 7, Malaria: 5, Flu: 12, Chik: 3 },
  { date: "28 Aug", Dengue: 10, Malaria: 4, Flu: 15, Chik: 1 },
  { date: "29 Aug", Dengue: 8, Malaria: 6, Flu: 14, Chik: 2 },
  { date: "30 Aug", Dengue: 12, Malaria: 7, Flu: 16, Chik: 3 },
  { date: "31 Aug", Dengue: 9, Malaria: 5, Flu: 11, Chik: 1 },
  { date: "01 Sep", Dengue: 11, Malaria: 6, Flu: 17, Chik: 2 },
  { date: "02 Sep", Dengue: 12, Malaria: 7, Flu: 16, Chik: 3 },
  { date: "03 Sep", Dengue: 9, Malaria: 4, Flu: 13, Chik: 2 },
  { date: "04 Sep", Dengue: 8, Malaria: 6, Flu: 14, Chik: 1 },
  { date: "05 Sep", Dengue: 12, Malaria: 7, Flu: 16, Chik: 3 },
];

const villageCases = [
  { village: "Bhaini", Dengue: 12, Malaria: 2, Flu: 20, Chik: 4, risk: "High" },
  { village: "Talwandi", Dengue: 6, Malaria: 8, Flu: 10, Chik: 1, risk: "Medium" },
  { village: "Rampur", Dengue: 2, Malaria: 1, Flu: 5, Chik: 0, risk: "Low" },
  { village: "Kotla", Dengue: 5, Malaria: 3, Flu: 9, Chik: 2, risk: "Medium" },
  { village: "Makrana", Dengue: 18, Malaria: 6, Flu: 25, Chik: 7, risk: "High" },
];

const recentConsultations = [
  { id: 1, name: "Suman Devi", age: 42, village: "Bhaini", when: "2h ago", reason: "Fever, headache" },
  { id: 2, name: "Rakesh Kumar", age: 29, village: "Kotla", when: "4h ago", reason: "Cough, sore throat" },
  { id: 3, name: "Baljit Singh", age: 60, village: "Makrana", when: "1d ago", reason: "Chest pain (triage)" },
];

// KPI definitions (with sparkline small arrays)
const kpiData = [
  { key: "total", title: "Total Cases", value: 450, color: "text-red-500", spark: [30, 45, 40, 55, 50, 60] },
  { key: "recovered", title: "Recovered", value: 320, color: "text-green-500", spark: [20, 25, 30, 28, 35, 40] },
  { key: "active", title: "Active Cases", value: 110, color: "text-yellow-500", spark: [10, 12, 15, 13, 18, 16] },
  { key: "alerts", title: "Critical Alerts", value: 8, color: "text-teal-400", spark: [1, 2, 3, 2, 4, 3] },
];

const COLORS = ["#FF4D4F", "#0088FE", "#00C49F", "#FFBB28"];

// ---------- Utility ----------
function arrayToCsv(rows, columns) {
  const header = columns.join(",");
  const lines = rows.map(r => columns.map(c => `"${String(r[c] ?? "")}"`).join(","));
  return [header, ...lines].join("\n");
}

// ---------- Component ----------
export default function DashboardMain() {
  const [diseaseFilter, setDiseaseFilter] = useState("All");
  const [q, setQ] = useState("");
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [displayVillages, setDisplayVillages] = useState(villageCases);

  // derived filtered trend for line chart (if disease selected show only that line)
  const filteredTrend = useMemo(() => {
    if (diseaseFilter === "All") return diseaseTrend;
    return diseaseTrend.map(d => ({ date: d.date, value: d[diseaseFilter] }));
  }, [diseaseFilter]);

  useEffect(() => {
    if (!q) {
      setDisplayVillages(villageCases);
      return;
    }
    const term = q.trim().toLowerCase();
    setDisplayVillages(villageCases.filter(v => v.village.toLowerCase().includes(term)));
  }, [q]);

  // CSV export of village table
  const handleExportCsv = () => {
    const columns = ["village", "Dengue", "Malaria", "Flu", "Chik", "risk"];
    const csv = arrayToCsv(villageCases, columns);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `village_cases_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // simple KPI "sparkline" renderer (tiny)
  const Spark = ({ data, color = "#8884d8" }) => (
    <ResponsiveContainer width="100%" height={30}>
      <LineChart data={data.map((v, i) => ({ i, v }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient & Public Health Dashboard</h1>
          <p className="text-sm text-gray-600">Live view — disease trends, village risk, recent consultations</p>
        </div>

        {/* Filters & quick actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 gap-2">
            <FaRegCalendarAlt className="text-gray-500" />
            <input
              type="date"
              className="text-sm outline-none"
              aria-label="from-date"
              defaultValue={new Date().toISOString().slice(0,10)}
            />
            <span className="text-gray-300">—</span>
            <input type="date" className="text-sm outline-none" aria-label="to-date" />
          </div>

          <select
            value={diseaseFilter}
            onChange={e => setDiseaseFilter(e.target.value)}
            className="bg-white rounded-lg shadow px-3 py-2 text-sm"
            aria-label="Filter by disease"
          >
            <option value="All">All diseases</option>
            <option value="Dengue">Dengue</option>
            <option value="Malaria">Malaria</option>
            <option value="Flu">Flu</option>
            <option value="Chik">Chikungunya</option>
          </select>

          <button
            onClick={handleExportCsv}
            className="bg-white px-3 py-2 rounded-lg shadow hover:bg-gray-100 flex items-center gap-2 text-sm"
            title="Export village data CSV"
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi) => (
          <div key={kpi.key} className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
              </div>
              <div className="w-16 h-12 flex items-center justify-center">
                <div className={`text-4xl ${kpi.color}`}>{kpi.key === "total" ? <FaVirus /> : kpi.key === "recovered" ? <FaHeartbeat /> : kpi.key === "active" ? <FaExclamationTriangle /> : <FaShieldAlt />}</div>
              </div>
            </div>

            <div className="mt-2 h-8">
              <Spark data={kpi.spark} color={kpi.color === "text-red-500" ? "#FF4D4F" : kpi.color === "text-green-500" ? "#00C49F" : kpi.color === "text-yellow-500" ? "#FFBB28" : "#14B8A6"} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Village table + side widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Trends */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trend line */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-700">Disease Spread Trend</h3>
              <div className="text-sm text-gray-500">Last 10 days</div>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                {diseaseFilter === "All" ? (
                  <LineChart data={diseaseTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Dengue" stroke="#FF4D4F" dot={false} />
                    <Line type="monotone" dataKey="Malaria" stroke="#0088FE" dot={false} />
                    <Line type="monotone" dataKey="Flu" stroke="#00C49F" dot={false} />
                    <Line type="monotone" dataKey="Chik" stroke="#FFBB28" dot={false} />
                  </LineChart>
                ) : (
                  <LineChart data={filteredTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={diseaseFilter} stroke="#14B8A6" dot />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Village bar chart + table */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-700">Village Cases Overview</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm w-56"
                    placeholder="Search village..."
                    aria-label="Search village"
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <button onClick={() => setSelectedVillage(null)} className="text-sm text-teal-600 hover:underline">Clear</button>
              </div>
            </div>

            <div style={{ width: "100%", height: 240 }} className="mb-4">
              <ResponsiveContainer>
                <BarChart data={displayVillages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="village" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Dengue" stackId="a" fill="#FF4D4F" />
                  <Bar dataKey="Malaria" stackId="a" fill="#0088FE" />
                  <Bar dataKey="Flu" stackId="a" fill="#00C49F" />
                  <Bar dataKey="Chik" stackId="a" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayVillages.map((v, idx) => (
                <div
                  key={v.village}
                  onClick={() => setSelectedVillage(v)}
                  className={`p-3 rounded-lg border ${selectedVillage?.village === v.village ? "border-teal-600 shadow" : "border-gray-100"} cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{v.village}</div>
                      <div className="text-xs text-gray-500">Dengue: {v.Dengue} • Malaria: {v.Malaria} • Flu: {v.Flu}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${v.risk === "High" ? "bg-red-100 text-red-700" : v.risk === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {v.risk}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    {/* simple normalized progress */}
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (v.Dengue + v.Malaria + v.Flu + v.Chik) * 2)}%`,
                        background: v.risk === "High" ? "#F87171" : v.risk === "Medium" ? "#FBBF24" : "#34D399",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Side widgets */}
        <div className="space-y-6">
          {/* Pie distribution */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-700">Active Disease Distribution</h4>
              <div className="text-xs text-gray-500">Realtime</div>
            </div>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Dengue", value: 30 },
                      { name: "Malaria", value: 20 },
                      { name: "Flu", value: 60 },
                      { name: "Chik", value: 10 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {["#FF4D4F", "#0088FE", "#00C49F", "#FFBB28"].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FF4D4F] rounded-full"></span>Dengue</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#0088FE] rounded-full"></span>Malaria</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#00C49F] rounded-full"></span>Flu</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFBB28] rounded-full"></span>Chik</div>
            </div>
          </div>

          {/* Recent consultations */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-700">Recent Consultations</h4>
              <div className="text-xs text-gray-500">Live feed</div>
            </div>

            <ul className="space-y-3">
              {recentConsultations.map(c => (
                <li key={c.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                    {c.name.split(" ").map(s=>s[0]).slice(0,2).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{c.name} <span className="text-xs text-gray-500">({c.age})</span></div>
                        <div className="text-xs text-gray-500">{c.village} • {c.reason}</div>
                      </div>
                      <div className="text-xs text-gray-400">{c.when}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 text-center">
              <button className="text-sm text-teal-600 hover:underline">View all consultations</button>
            </div>
          </div>

          {/* Actionable Alerts */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Alerts & Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FaExclamationTriangle className="mt-1 text-red-500" />
                <div>
                  <div className="font-medium">Dengue outbreak — Bhaini</div>
                  <div className="text-xs text-gray-500">Distribute larvicide & repellents; schedule CHW visits.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaExclamationTriangle className="mt-1 text-yellow-500" />
                <div>
                  <div className="font-medium">Flu rising — Talwandi</div>
                  <div className="text-xs text-gray-500">Organize vaccination camp next week.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

