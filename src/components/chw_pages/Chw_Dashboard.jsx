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
    <div className="flex h-screen overflow-hidden"> {/* 🔥 fixed layout, same as Dashboard.jsx */}
      {/* Sidebar */}
      <aside className="w-64 bg-teal-700 text-white flex flex-col">
        {/* Profile Header */}
        <div className="p-6 border-b border-teal-600">
          <div className="flex items-center gap-3">
            <img
              src="/user.png"
              alt="CHW Avatar"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-bold text-lg">Hello, Ayesha</h2>
              <p className="text-sm text-gray-200">Health Worker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto"> {/* 🔥 scroll inside nav only */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "dashboard" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("add-patient")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "add-patient" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaUserPlus /> Add Patient
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "patients" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaUsers /> Patients
          </button>

          <button
            onClick={() => setActiveTab("ai-checker")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "ai-checker" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaNotesMedical /> AI Symptom Checker
          </button>

          <button
            onClick={() => setActiveTab("health-card")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "health-card" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaIdCard /> Health Card
          </button>

          <button
            onClick={() => setActiveTab("medicine-checker")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "medicine-checker" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaPills /> Medicine Checker
          </button>

          <button
            onClick={() => setActiveTab("doctor-chat")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "doctor-chat" ? "bg-teal-600" : "hover:bg-teal-600"
            }`}
          >
            <FaComments /> Doctor Chat
          </button>
        </nav>

        {/* Logout */}
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
      <main className="flex-1 p-8 overflow-y-auto bg-gray-100"> {/* 🔥 scroll inside content only */}
        {renderContent()}
      </main>
    </div>
  );
}
