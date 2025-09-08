import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaUser, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaMapMarkerAlt, 
  FaIdCard, 
  FaDownload,
  FaFileImage,
  FaFilePdf,
  FaShieldAlt
} from 'react-icons/fa';

const HealthcareCard = () => {
  const cardRef = useRef();
  const [patientData, setPatientData] = useState({
    name: "Rahul Sharma",
    age: "42 years",
    dob: "15-03-1982",
    gender: "Male",
    address: "A-204, Green Valley Apartments, Sector 45, Gurugram, Haryana 122003",
    uniqueId: "HSH-9824-5763-1982",
    bloodGroup: "B+",
    emergencyContact: "+91 9876543210",
    primaryCarePhysician: "Dr. Anjali Mehta",
    allergies: "Penicillin, Pollen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
  });

  const downloadAsImage = () => {
    // This would be implemented using html2canvas or similar in a real app
    alert("In a real application, this would download the card as an image. Implementation would use html2canvas.");
  };

  const downloadAsPDF = () => {
    // This would be implemented using jsPDF or similar in a real app
    alert("In a real application, this would download the card as a PDF. Implementation would use jsPDF.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Healthcare ID Card</h1>
          <p className="text-gray-600">Your personal medical information card for quick access to healthcare services</p>
        </div>

        {/* Healthcare Card */}
        <div 
          ref={cardRef}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">HealthSeva Card</h2>
              <div className="flex items-center">
                <FaShieldAlt className="mr-2" />
                <span>Verified</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              {/* Patient Photo and Basic Info */}
              <div className="md:w-1/3 pr-4 border-r border-gray-200">
                <div className="flex flex-col items-center mb-4">
                  <img 
                    src={patientData.photo} 
                    alt={patientData.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                  />
                  <h3 className="text-xl font-bold mt-4 text-gray-800">{patientData.name}</h3>
                  <p className="text-blue-600 font-semibold">{patientData.age}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">In Case of Emergency</h4>
                  <p className="text-sm">{patientData.emergencyContact}</p>
                  <p className="text-sm mt-1">Blood Group: <span className="font-bold text-red-600">{patientData.bloodGroup}</span></p>
                </div>
              </div>
              
              {/* Patient Details */}
              <div className="md:w-2/3 pl-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <FaBirthdayCake className="text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-semibold">{patientData.dob}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaVenusMars className="text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-semibold">{patientData.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-sm">{patientData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaIdCard className="text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Unique ID</p>
                      <p className="font-semibold">{patientData.uniqueId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Medical Information</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm"><span className="font-semibold">Primary Physician:</span> {patientData.primaryCarePhysician}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Allergies:</span> {patientData.allergies}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600 mb-2">Scan this QR code to access medical records</p>
                  <div className="bg-white p-2 border border-gray-200 rounded-lg inline-block">
                    <QRCodeSVG 
                      value={`https://healthrecords.example.com/patient/${patientData.uniqueId}`}
                      size={100}
                      level="H"
                      includeMargin
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Issued by: HealthSeva Network</p>
                  <p className="text-xs text-gray-500">Valid until: 15-03-2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Options */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaDownload className="mr-2 text-blue-500" /> Download Your Healthcare Card
          </h3>
          <p className="text-gray-600 mb-4">Download your healthcare card for offline access or printing.</p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={downloadAsImage}
              className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              <FaFileImage className="mr-2" />
              Download as Image
            </button>
            
            <button 
              onClick={downloadAsPDF}
              className="flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all"
            >
              <FaFilePdf className="mr-2" />
              Download as PDF
            </button>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Your Healthcare Card</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Benefits of Your Health Card</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>Quick access to your medical information in emergencies</li>
                <li>Seamless sharing of records with healthcare providers</li>
                <li>Reduced paperwork at hospitals and clinics</li>
                <li>Secure storage of your medical history</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">How to Use Your Card</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>Present this card at any healthcare facility</li>
                <li>Allow medical staff to scan the QR code</li>
                <li>Keep your card secure and report if lost</li>
                <li>Update information regularly with your provider</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareCard;