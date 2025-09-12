// src/components/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for redirect
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaNotesMedical,
  FaIdCard,
  FaSignOutAlt,
} from "react-icons/fa";

import UserProfile from "./UserProfile";
import DashboardMain from "./DashboardMain"; 
import Appointment from "./Appointment";
import Emergency from "./Emergency";
import HealthcareCard from "./HealthcareCard";
import SymptomChecker from "./SymptomChecker";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate(); // ✅ hook for navigation

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMain />;
      case "profile":
        return <UserProfile />;  
      case "appointment":
        return <Appointment />; 
      case "emergency":
        return <Emergency />;
      case "ai-checker":
        return <SymptomChecker />;
      case "health-card":
        return <HealthcareCard />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // optional: clear any login state / session
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    navigate("/"); // ✅ redirect to LandingPage
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-700 text-white flex flex-col">
        <div className="p-6 border-b border-teal-600">
          <div className="flex items-center gap-3">
            <img
              src="/user.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-bold text-lg">Hello, User</h2>
              <p className="text-sm text-gray-200">Patient</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "dashboard" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "profile" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaUser /> Profile
          </button>

          <button
            onClick={() => setActiveTab("appointment")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "appointment" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaCalendarAlt /> Appointments
          </button>

          <button
            onClick={() => setActiveTab("emergency")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "emergency" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaHeartbeat /> Emergency
          </button>

          <button
            onClick={() => setActiveTab("ai-checker")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "ai-checker" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaNotesMedical /> AI Checker
          </button>

          <button
            onClick={() => setActiveTab("health-card")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "health-card" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaIdCard /> Health Card
          </button>
        </nav>

        <div className="p-4 border-t border-teal-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}
