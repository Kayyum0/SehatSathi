// src/components/chw_pages/CHW_Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaNotesMedical,
  FaIdCard,
  FaPills,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

import DashboardMain from "./Chw_DashboardMain";
import SymptomChecker from "./Chw_SymptomChecker";
import HealthcareCard from "./Chw_HealthcareCard";
import AddPatient from "./Chw_AddPatient";
import PatientList from "./Chw_PatientList";
import DoctorChat from "./Chw_DoctorChat";
import MedicineChecker from "./Chw_MedicineChecker";

export default function CHW_Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMain />;
      case "ai-checker":
        return <SymptomChecker />;
      case "health-card":
        return <HealthcareCard />;
      case "add-patient":
        return <AddPatient />;
      case "patients":
        return <PatientList />;
      case "doctor-chat":
        return <DoctorChat />;
      case "medicine-checker":
        return <MedicineChecker />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("chw");
    localStorage.removeItem("chw");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-teal-700 text-white flex flex-col shadow-lg">
        {/* Logo + Profile */}
        <div className="p-6 border-b border-teal-600 text-center">
          <img
            src="/user.png"
            alt="CHW Logo"
            className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md object-cover"
          />
          <h2 className="font-bold text-lg mt-3">Welcome, Ayesha</h2>
          <p className="text-sm text-teal-100">Community Health Worker</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "dashboard" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("add-patient")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "add-patient" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaUserPlus /> Add Patient
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "patients" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaUsers /> Patients
          </button>

          <button
            onClick={() => setActiveTab("ai-checker")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "ai-checker" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaNotesMedical /> AI Symptom Checker
          </button>

          <button
            onClick={() => setActiveTab("health-card")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "health-card" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaIdCard /> Health Card
          </button>

          <button
            onClick={() => setActiveTab("medicine-checker")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "medicine-checker" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaPills /> Medicine Checker
          </button>

          <button
            onClick={() => setActiveTab("doctor-chat")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
              activeTab === "doctor-chat" ? "bg-teal-600 shadow-md" : "hover:bg-teal-600"
            }`}
          >
            <FaComments /> Doctor Chat
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-teal-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left bg-red-600 hover:bg-red-700 transition"
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
