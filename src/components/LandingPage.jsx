// src/components/LandingPage.jsx
import { useState } from "react";
import { FaUserMd, FaUsers, FaHospitalUser, FaMapMarkedAlt } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import CHWLogin from "./CHWLogin";

export default function LandingPage() {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'chwLogin' | null

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="bg-[#43A047] text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo + App Name */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold">SehatSathi</span>
          </div>

          {/* Right: Language + Buttons */}
          <div className="flex items-center gap-4">
            <select className="bg-white text-gray-700 rounded px-2 py-1 focus:outline-none">
              <option>English</option>
              <option>हिंदी</option>
              <option>ਪੰਜਾਬੀ</option>
            </select>

            <button
              onClick={() => setActiveModal("login")}
              className="bg-white text-[#43A047] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Patient Login
            </button>
            <button
              onClick={() => setActiveModal("chwLogin")}
              className="bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              CHW Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Stats Section */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">
            Empowering Healthcare Across Punjab
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            SehatSathi connects patients, doctors, and healthcare workers to bring accessible medical care
            to every village in Punjab.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
              <FaUserMd className="text-teal-600 text-4xl mb-3 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">120+</h3>
              <p className="text-gray-600">Doctors</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
              <FaUsers className="text-green-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">10,000+</h3>
              <p className="text-gray-600">Patients Served</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
              <FaMapMarkedAlt className="text-blue-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">250+</h3>
              <p className="text-gray-600">Villages Covered</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
              <FaHospitalUser className="text-purple-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">300+</h3>
              <p className="text-gray-600">CHW Workers</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">About SehatSathi</h3>
            <p>
              SehatSathi is a digital healthcare platform bringing patients and community health workers
              together to strengthen rural healthcare in Punjab.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveModal("login")} className="hover:underline">Login</button></li>
              <li><button onClick={() => setActiveModal("register")} className="hover:underline">Register</button></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p>Email: support@sehatsathi.in</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: Chandigarh, Punjab</p>
          </div>
        </div>
        <div className="bg-gray-800 text-center py-4 text-sm">
          © {new Date().getFullYear()} SehatSathi. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          {activeModal === "login" && (
            <Login
              onClose={() => setActiveModal(null)}
              switchToRegister={() => setActiveModal("register")}
            />
          )}
          {activeModal === "register" && (
            <Register
              onClose={() => setActiveModal(null)}
              switchToLogin={() => setActiveModal("login")}
            />
          )}
          {activeModal === "chwLogin" && (
            <CHWLogin
              onClose={() => setActiveModal(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
