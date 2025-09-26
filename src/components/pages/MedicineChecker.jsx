// src/components/pages/MedicineChecker.jsx
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function MedicineChecker() {
  const [medicine, setMedicine] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // 🔥 Dummy data for now
    const pharmacies = [
      {
        name: "City Pharmacy",
        price: "₹120",
        status: "Open",
        distance: "1.2 km",
        available: true,
      },
      {
        name: "HealthCare Medicos",
        price: "₹150",
        status: "Closed",
        distance: "2.5 km",
        available: false,
      },
    ];
    setResults(pharmacies);
  };

  return (
    <div className="space-y-6"> {/* ✅ no h-screen, just like other pages */}
      <h1 className="text-2xl font-bold text-teal-700">Medicine Availability Checker</h1>

      {/* 🔍 Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter Medicine Name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Enter Your Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>

      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
      >
        <FaSearch className="inline mr-2" /> Check Availability
      </button>

      {/* 📊 Results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {results.map((pharmacy, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow bg-white flex flex-col gap-2"
            >
              <h2 className="text-lg font-semibold">{pharmacy.name}</h2>
              <p><strong>Price:</strong> {pharmacy.price}</p>
              <p><strong>Status:</strong> 
                {pharmacy.status === "Open" ? (
                  <span className="text-green-600 ml-2"><FaCheckCircle className="inline" /> {pharmacy.status}</span>
                ) : (
                  <span className="text-red-600 ml-2"><FaTimesCircle className="inline" /> {pharmacy.status}</span>
                )}
              </p>
              <p><FaMapMarkerAlt className="inline text-teal-600 mr-1" /> {pharmacy.distance}</p>
              <p><strong>Availability:</strong> {pharmacy.available ? "✅ In Stock" : "❌ Out of Stock"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
