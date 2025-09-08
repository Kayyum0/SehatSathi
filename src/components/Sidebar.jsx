// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaChartPie, FaCalendarAlt, FaFirstAid, FaStethoscope, FaIdCard } from "react-icons/fa";

const navItems = [
  { path: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
  { path: "/appointment", icon: <FaCalendarAlt />, label: "Book Appointment" },
  { path: "/emergency", icon: <FaFirstAid />, label: "Emergency Help" },
  { path: "/symptom-checker", icon: <FaStethoscope />, label: "AI Symptom Checker" },
  { path: "/healthcard", icon: <FaIdCard />, label: "Healthcare Card" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#43A047] text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-green-600">SehatSathi</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ path, icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-green-700" : "hover:bg-green-600"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
