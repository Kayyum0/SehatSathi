// src/components/DoctorsChat.jsx
import { useState, useEffect, useRef } from "react";
import { 
  FaSearch, 
  FaUserMd, 
  FaStethoscope, 
  FaPaperPlane, 
  FaPaperclip,
  FaSmile,
  FaVideo,
  FaPhone,
  FaEllipsisV,
  FaCircle,
  FaClock,
  FaCheckDouble,
  FaArrowLeft
} from "react-icons/fa";

const DoctorsChat = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [onlineDoctors, setOnlineDoctors] = useState(new Set());
  const messagesEndRef = useRef(null);

  // Sample doctors data
  const sampleDoctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      hospital: "Apollo Hospital",
      experience: "15 years",
      rating: 4.8,
      avatar: "RK",
      status: "online",
      lastSeen: "2 min ago",
      isOnline: true
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Pediatrician",
      hospital: "Fortis Hospital",
      experience: "12 years",
      rating: 4.9,
      avatar: "PS",
      status: "in consultation",
      lastSeen: "10 min ago",
      isOnline: true
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "Cardiologist",
      hospital: "Medanta Hospital",
      experience: "20 years",
      rating: 4.7,
      avatar: "AP",
      status: "offline",
      lastSeen: "2 hours ago",
      isOnline: false
    },
    {
      id: 4,
      name: "Dr. Sunita Reddy",
      specialization: "Gynecologist",
      hospital: "Max Hospital",
      experience: "18 years",
      rating: 4.9,
      avatar: "SR",
      status: "online",
      lastSeen: "Just now",
      isOnline: true
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic",
      hospital: "Artemis Hospital",
      experience: "14 years",
      rating: 4.6,
      avatar: "VS",
      status: "away",
      lastSeen: "30 min ago",
      isOnline: true
    }
  ];

  // Sample messages
  const sampleMessages = {
    1: [
      { id: 1, text: "Hello Dr. Kumar, I have a patient with high fever since morning.", sender: "chw", timestamp: "10:30 AM", read: true },
      { id: 2, text: "Hello Sonia. What's the patient's temperature?", sender: "doctor", timestamp: "10:31 AM", read: true },
      { id: 3, text: "102°F. Patient is 45 years old male.", sender: "chw", timestamp: "10:32 AM", read: true },
      { id: 4, text: "Any other symptoms? Cough, body ache?", sender: "doctor", timestamp: "10:33 AM", read: true },
      { id: 5, text: "Yes, mild cough and body ache. No breathing difficulties.", sender: "chw", timestamp: "10:34 AM", read: true },
      { id: 6, text: "Start with Paracetamol 500mg. Monitor temperature every 4 hours. Update me if fever persists.", sender: "doctor", timestamp: "10:35 AM", read: true }
    ],
    2: [
      { id: 1, text: "Good morning Dr. Sharma. I have a 5-year-old child with vomiting.", sender: "chw", timestamp: "09:15 AM", read: true },
      { id: 2, text: "Hello. How many times has the child vomited?", sender: "doctor", timestamp: "09:16 AM", read: true }
    ],
    4: [
      { id: 1, text: "Dr. Reddy, I have a pregnant woman in her 6th month with mild abdominal pain.", sender: "chw", timestamp: "11:20 AM", read: false }
    ]
  };

  useEffect(() => {
    setDoctors(sampleDoctors);
    // Simulate online status updates
    const interval = setInterval(() => {
      const onlineIds = sampleDoctors
        .filter(d => d.isOnline)
        .map(d => d.id);
      setOnlineDoctors(new Set(onlineIds));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages(sampleMessages[doctor.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "chw",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate doctor reply after 2-5 seconds
    setTimeout(() => {
      const replies = [
        "I understand. Can you provide more details?",
        "Please monitor the patient and update me in 2 hours.",
        "I recommend the following course of action...",
        "Is the patient allergic to any medication?",
        "Let me check the patient history first."
      ];
      const reply = {
        id: messages.length + 2,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: "doctor",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      setMessages(prev => [...prev, reply]);
    }, 2000 + Math.random() * 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Doctor Consultation Chat</h1>
          <p className="text-gray-600">Connect with healthcare professionals for immediate guidance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[80vh]">
          <div className="flex h-full">
            {/* Doctors Sidebar */}
            <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Doctors List */}
              <div className="flex-1 overflow-y-auto">
                {filteredDoctors.map(doctor => (
                  <DoctorListItem
                    key={doctor.id}
                    doctor={doctor}
                    isSelected={selectedDoctor?.id === doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    isOnline={onlineDoctors.has(doctor.id)}
                    unreadCount={doctor.id === 4 ? 1 : 0}
                  />
                ))}
              </div>

              {/* CHW Status */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                        SG
                      </div>
                      <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Ayesha (CHW)</p>
                      <p className="text-sm text-gray-600">Community Health Worker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col md:flex">
              {selectedDoctor ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setSelectedDoctor(null)}
                        className="md:hidden text-gray-600 hover:text-gray-800"
                      >
                        <FaArrowLeft />
                      </button>
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {selectedDoctor.avatar}
                        </div>
                        <FaCircle className={`absolute -bottom-1 -right-1 text-xs border-2 border-white rounded-full ${
                          onlineDoctors.has(selectedDoctor.id) ? 'text-green-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                        <p className="text-sm text-gray-600">{selectedDoctor.specialization} • {selectedDoctor.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50">
                        <FaPhone />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50">
                        <FaVideo />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 p-2">
                        <FaPaperclip />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-2">
                        <FaSmile />
                      </button>
                      <div className="flex-1 relative">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message... (Press Enter to send)"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                          rows="1"
                          style={{ minHeight: '50px', maxHeight: '120px' }}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // Empty State
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
                  <div className="text-center max-w-md">
                    <FaUserMd className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Select a Doctor to Chat</h3>
                    <p className="text-gray-600">
                      Choose from the list of available doctors to start a consultation. 
                      You can discuss patient cases, get medical advice, and coordinate care.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2">
            <FaCircle className="text-green-500 text-xs" />
            <span className="text-sm text-gray-700">{onlineDoctors.size} doctors online</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2">
            <FaStethoscope className="text-teal-600" />
            <span className="text-sm text-gray-700">24/7 Emergency Support Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Doctor List Item Component
const DoctorListItem = ({ doctor, isSelected, onClick, isOnline, unreadCount }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {doctor.avatar}
          </div>
          <FaCircle className={`absolute -bottom-1 -right-1 text-xs border-2 border-white rounded-full ${
            isOnline ? 'text-green-500' : 'text-gray-400'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-800 truncate">{doctor.name}</h4>
            <span className="text-xs text-gray-500 flex items-center">
              <FaClock className="mr-1" />
              {doctor.lastSeen}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">{doctor.specialization}</p>
          <p className="text-xs text-gray-500 truncate">{doctor.hospital}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-xs font-semibold">{doctor.rating}</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Message Bubble Component
const MessageBubble = ({ message }) => {
  const isCHW = message.sender === 'chw';

  return (
    <div className={`flex ${isCHW ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
        isCHW 
          ? 'bg-teal-500 text-white rounded-br-none' 
          : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
      }`}>
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-end space-x-1 mt-2 text-xs ${
          isCHW ? 'text-teal-100' : 'text-gray-400'
        }`}>
          <span>{message.timestamp}</span>
          {isCHW && (
            <FaCheckDouble className={message.read ? 'text-blue-300' : 'text-teal-200'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsChat;