// src/components/PatientDashboard.jsx
import { useState, useEffect } from "react";
import {
  FaUserInjured,
  FaUserCheck,
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaEye,
  FaFilter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sample patient data
const samplePatients = [
  {
    id: "PAT-001",
    name: "Rahul Sharma",
    age: 42,
    gender: "Male",
    status: "Normal",
    lastVisit: "2025-09-05",
    emergency: false,
    chronic: "Hypertension",
  },
  {
    id: "PAT-002",
    name: "Anjali Mehta",
    age: 35,
    gender: "Female",
    status: "Emergency",
    lastVisit: "2025-09-10",
    emergency: true,
    chronic: "Diabetes",
  },
  {
    id: "PAT-003",
    name: "Ramesh Kumar",
    age: 50,
    gender: "Male",
    status: "Normal",
    lastVisit: "2025-09-08",
    emergency: false,
    chronic: "Asthma",
  },
  // Add more sample data as needed
];

export default function PatientDashboard() {
  const [patients, setPatients] = useState(samplePatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Derived counts for overview cards
  const totalPatients = patients.length;
  const emergencyPatients = patients.filter((p) => p.emergency).length;
  const normalPatients = patients.filter((p) => !p.emergency).length;

  // Filter & search patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ||
      (filterStatus === "Emergency" && p.emergency) ||
      (filterStatus === "Normal" && !p.emergency);
    return matchesSearch && matchesFilter;
  });

  // Update patient status (example)
  const toggleEmergency = (id) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, emergency: !p.emergency } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4 md:mb-0">
          Patient Management
        </h1>
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-64 focus:outline-none"
          />
          <button className="px-4 bg-teal-600 text-white flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-teal-600"
        >
          <FaUserPlus className="text-4xl text-teal-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <p className="text-2xl font-bold">{totalPatients}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-red-500"
        >
          <FaUserInjured className="text-4xl text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Emergency Patients</p>
            <p className="text-2xl font-bold">{emergencyPatients}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-green-500"
        >
          <FaUserCheck className="text-4xl text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Normal Patients</p>
            <p className="text-2xl font-bold">{normalPatients}</p>
          </div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        {["All", "Emergency", "Normal"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full font-semibold ${
              filterStatus === status
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age/Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.emergency
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {patient.emergency ? "Emergency" : "Normal"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => toggleEmergency(patient.id)}
                      className="text-sm bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700"
                    >
                      <FaEdit className="inline mr-1" /> Toggle
                    </button>
                    <button className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                      <FaEye className="inline mr-1" /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-500 text-sm text-center">
        © 2025 SehatSathi - CHW Patient Management
      </div>
    </div>
  );
}
