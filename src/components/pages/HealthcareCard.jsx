// src/components/HealthcareCard.jsx
import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaUser, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaIdCard, 
  FaDownload, FaFileImage, FaFilePdf, FaShieldAlt, FaAngleDown, FaAngleUp
} from 'react-icons/fa';

const HealthcareCard = () => {
  const cardRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const [patientData] = useState({
    name: "Rahul Sharma",
    age: "42 yrs",
    dob: "15-03-1982",
    gender: "Male",
    address: "A-204, Green Valley Apartments, Gurugram, Haryana",
    uniqueId: "HSH-9824-5763-1982",
    bloodGroup: "B+",
    emergencyContact: "+91 9876543210",
    primaryCarePhysician: "Dr. Anjali Mehta",
    allergies: "Penicillin, Pollen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
  });

  const downloadAsImage = () => alert("Download as Image triggered");
  const downloadAsPDF = () => alert("Download as PDF triggered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Healthcare ID Card</h1>
          <p className="text-gray-600 text-sm">Quick access to your healthcare information</p>
        </div>

        {/* Card */}
        <div 
          ref={cardRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-teal-100"
        >
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 text-white flex justify-between items-center">
            <h2 className="font-bold text-lg">HealthSeva Card</h2>
            <div className="flex items-center space-x-1">
              <FaShieldAlt />
              <span className="text-sm">Verified</span>
            </div>
          </div>

          <div className="p-5 flex flex-col md:flex-row gap-6">
            {/* Left Column: Photo + Essentials */}
            <div className="md:w-1/3 flex flex-col items-center">
              <img 
                src={patientData.photo} 
                alt={patientData.name} 
                className="w-28 h-28 rounded-full object-cover border-4 border-teal-100 shadow-lg"
              />
              <h3 className="font-bold text-lg mt-3">{patientData.name}</h3>
              <p className="text-teal-600 font-semibold">{patientData.age}</p>

              <div className="bg-teal-50 p-3 rounded-lg mt-4 w-full text-center">
                <p className="text-xs font-semibold text-gray-700">Emergency Contact</p>
                <p className="text-sm">{patientData.emergencyContact}</p>
                <p className="text-xs mt-1">Blood Group: <span className="font-bold text-red-600">{patientData.bloodGroup}</span></p>
              </div>
            </div>

            {/* Right Column: Details + QR */}
            <div className="md:w-2/3 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DetailItem icon={<FaBirthdayCake className="text-teal-600" />} label="DOB" value={patientData.dob} />
                <DetailItem icon={<FaVenusMars className="text-teal-600" />} label="Gender" value={patientData.gender} />
                <DetailItem icon={<FaMapMarkerAlt className="text-teal-600" />} label="Address" value={patientData.address} small />
                <DetailItem icon={<FaIdCard className="text-teal-600" />} label="Unique ID" value={patientData.uniqueId} />
              </div>

              <button 
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-sm text-teal-600 font-semibold flex items-center justify-center space-x-1 hover:underline"
              >
                <span>{expanded ? 'Hide Medical Info' : 'Show Medical Info'}</span>
                {expanded ? <FaAngleUp /> : <FaAngleDown />}
              </button>

              {expanded && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><span className="font-semibold">Primary Physician:</span> {patientData.primaryCarePhysician}</p>
                  <p className="text-sm mt-1"><span className="font-semibold">Allergies:</span> {patientData.allergies}</p>
                </div>
              )}

              {/* QR Code */}
              <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Scan QR for records</p>
                  <div className="bg-white p-2 border border-gray-200 rounded-lg inline-block">
                    <QRCodeSVG 
                      value={`https://healthrecords.example.com/patient/${patientData.uniqueId}`}
                      size={100}
                      level="H"
                      includeMargin
                    />
                  </div>
                </div>
                <div className="text-center text-xs text-gray-500">
                  <p>Issued by: HealthSeva Network</p>
                  <p>Valid until: 15-03-2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={downloadAsImage}
            className="flex items-center px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-800 transition-all"
          >
            <FaFileImage className="mr-2" /> Download as Image
          </button>
          <button 
            onClick={downloadAsPDF}
            className="flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all"
          >
            <FaFilePdf className="mr-2" /> Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// Subcomponent for details
const DetailItem = ({ icon, label, value, small }) => (
  <div className="flex items-start gap-2">
    {icon}
    <div>
      <p className={`text-xs text-gray-500 ${small ? 'text-[10px]' : ''}`}>{label}</p>
      <p className={`font-semibold ${small ? 'text-sm' : 'text-sm'}`}>{value}</p>
    </div>
  </div>
);

export default HealthcareCard;
