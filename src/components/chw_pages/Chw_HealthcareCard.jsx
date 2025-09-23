// src/components/CHWCard.jsx
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  FaUser, FaMapMarkerAlt, FaPhoneAlt, FaIdBadge, 
  FaShieldAlt, FaTasks, FaFileImage, FaFilePdf,
  FaStar, FaCalendarAlt, FaHospital, FaCertificate
} from "react-icons/fa";

const CHWCard = () => {
  const cardRef = useRef();
  const [chwData] = useState({
    name: "Ayesha",
    workerId: "CHW-0421",
    assignedArea: "Sector 45, Chandigarh, Punjab",
    contact: "+91 9123456780",
    patientsHandled: 120,
    emergenciesHandled: 15,
    experience: "3 years",
    rating: 4.8,
    specialization: "Maternal & Child Health",
    joiningDate: "15-03-2022",
    lastTraining: "Advanced First Aid - Dec 2024",
    photo: "", // empty image to prevent issues
  });

  const downloadAsImage = () => {
    alert("Download as Image functionality would be implemented here");
    // Implementation using html2canvas or similar library
  };

  const downloadAsPDF = () => {
    alert("Download as PDF functionality would be implemented here");
    // Implementation using jsPDF or similar library
  };

  // Render rating stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
            size={12}
          />
        ))}
        <span className="text-xs font-semibold ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Community Health Worker ID</h1>
          <p className="text-gray-600">Official Identification Card - SehatSathi Network</p>
        </div>

        {/* Main Card */}
        <div 
          ref={cardRef}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-teal-100 transform hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Card Header with Gradient */}
          <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 p-6 text-white relative">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-2xl mb-1">SehatSathi CHW</h2>
                <p className="text-teal-100 text-sm">Certified Community Health Professional</p>
              </div>
              <div className="flex items-center space-x-2 bg-teal-700 px-4 py-2 rounded-full">
                <FaShieldAlt className="text-yellow-300" />
                <span className="font-semibold text-sm">Verified Professional</span>
              </div>
            </div>
            <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-xs font-semibold">ID: {chwData.workerId}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Section - Profile & Contact */}
              <div className="lg:w-2/5 flex flex-col items-center">
                {/* Profile Photo Area */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-200 to-blue-200 flex items-center justify-center border-4 border-white shadow-2xl">
                    <FaUser className="text-teal-600 text-5xl" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Active
                  </div>
                </div>

                {/* Name and Rating */}
                <h3 className="text-2xl font-bold text-gray-800 text-center">{chwData.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  {renderStars(chwData.rating)}
                </div>
                <p className="text-teal-600 font-semibold text-sm mt-1">{chwData.specialization}</p>

                {/* Contact Info Card */}
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-4 rounded-2xl mt-6 w-full border border-teal-100">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <FaMapMarkerAlt className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Assigned Area</p>
                        <p className="text-sm font-semibold">{chwData.assignedArea}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <FaPhoneAlt className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm font-semibold">{chwData.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Stats & Details */}
              <div className="lg:w-3/5 space-y-6">
                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatItem 
                    icon={<FaUser className="text-teal-600" />} 
                    label="Patients Handled" 
                    value={chwData.patientsHandled}
                    gradient="from-green-50 to-teal-50"
                  />
                  <StatItem 
                    icon={<FaTasks className="text-red-500" />} 
                    label="Emergencies" 
                    value={chwData.emergenciesHandled}
                    gradient="from-red-50 to-orange-50"
                  />
                  <StatItem 
                    icon={<FaCalendarAlt className="text-blue-500" />} 
                    label="Experience" 
                    value={chwData.experience}
                    gradient="from-blue-50 to-cyan-50"
                  />
                  <StatItem 
                    icon={<FaCertificate className="text-purple-500" />} 
                    label="Last Training" 
                    value={chwData.lastTraining}
                    gradient="from-purple-50 to-pink-50"
                  />
                </div>

                {/* QR Code and Validation Section */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Digital Verification</p>
                      <div className="bg-white p-3 rounded-xl border-2 border-teal-200 shadow-lg">
                        <QRCodeSVG 
                          value={`https://healthseva.org/verify/chw/${chwData.workerId}`}
                          size={120}
                          level="H"
                          includeMargin
                          bgColor="#ffffff"
                          fgColor="#0d9488"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Scan to verify authenticity</p>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center md:justify-end space-x-2">
                          <FaHospital className="text-teal-600" />
                          <span className="text-sm font-semibold">SehatSathi Network</span>
                        </div>
                        <p className="text-xs text-gray-600">Issued: {chwData.joiningDate}</p>
                        <p className="text-xs text-gray-600">Valid until: 31-12-2027</p>
                        <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mt-2">
                          Certificate #HS-CHW-2024-0421
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={downloadAsImage}
            className="flex items-center px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 duration-200 font-semibold"
          >
            <FaFileImage className="mr-3" /> Download as Image
          </button>
          <button 
            onClick={downloadAsPDF}
            className="flex items-center px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 duration-200 font-semibold"
          >
            <FaFilePdf className="mr-3" /> Download as PDF
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          <p>This ID card is the property of HealthSeva Network. Unauthorized use is prohibited.</p>
          <p>In case of emergency, present this card for verification.</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced StatItem component
const StatItem = ({ icon, label, value, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center space-x-3">
      <div className="bg-white p-2 rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="font-bold text-lg text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default CHWCard;