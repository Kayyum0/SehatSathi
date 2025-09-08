import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaAmbulance,
  FaUserShield,
  FaFireExtinguisher,
  FaFemale,
  FaChild,
  FaMapMarkerAlt,
  FaClipboard,
  FaTimes,
  FaExclamationTriangle,
  FaHeartbeat,
  FaShieldAlt,
  FaFirstAid,
  FaHospital,
  FaHistory,
  FaMapMarkedAlt,
} from "react-icons/fa";

const EMERGENCY_NUMBERS = [
  { id: "police", label: "Police", number: "+91-100", icon: <FaUserShield />, color: "from-blue-600 to-blue-800" },
  { id: "ambulance", label: "Ambulance", number: "+91-102", icon: <FaAmbulance />, color: "from-red-500 to-red-700" },
  { id: "fire", label: "Fire", number: "+91-101", icon: <FaFireExtinguisher />, color: "from-orange-500 to-orange-700" },
  { id: "women", label: "Women Helpline", number: "+91-181", icon: <FaFemale />, color: "from-pink-500 to-pink-700" },
  { id: "child", label: "Child Helpline", number: "+91-1098", icon: <FaChild />, color: "from-purple-500 to-purple-700" },
];

const MOCK_NEARBY = [
  {
    id: 1,
    name: "Rural General Hospital - Bhattian",
    phone: "+91-98765-00001",
    address: "Vill. Bhattian, Tehsil X, Punjab",
    lat: 30.7333,
    lng: 76.7794,
    open: true,
    distanceKm: 4.2,
  },
  {
    id: 2,
    name: "Community Health Centre - Kotli",
    phone: "+91-98765-00002",
    address: "Kotli Road, Tehsil Y, Punjab",
    lat: 30.7400,
    lng: 76.8000,
    open: true,
    distanceKm: 7.6,
  },
  {
    id: 3,
    name: "Private Clinic - Sharma Clinic",
    phone: "+91-98765-00003",
    address: "Market Road, Village Z, Punjab",
    lat: 30.7200,
    lng: 76.7600,
    open: false,
    distanceKm: 2.1,
  },
];

const FIRST_AID_GUIDES = [
  {
    id: "heart",
    title: "Suspected Heart Attack",
    short: "Chest pain, sweating, breathlessness — act fast.",
    steps: [
      "Call Ambulance immediately (102).",
      "Help the person sit comfortably and loosen tight clothing.",
      "If patient is unconscious and not breathing, start CPR and use AED if available.",
      "If available, give 1 adult aspirin (300 mg) unless allergic — only if conscious & not contraindicated.",
      "Keep calm; do not give food or large amounts of water.",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    short: "Deep cuts or arterial bleeding — control bleeding first.",
    steps: [
      "Apply firm pressure directly over wound with clean cloth.",
      "If possible, elevate injured area above heart level.",
      "Do not remove embedded objects — apply dressing around them.",
      "If bleeding does not stop, continue pressure and get to emergency care.",
      "Monitor for shock — lay down, keep warm, and seek immediate transport.",
    ],
  },
  {
    id: "snake",
    title: "Snake Bite",
    short: "Remain calm, immobilize the bitten area, get to hospital.",
    steps: [
      "Call emergency services immediately.",
      "Keep the patient still and calm. Immobilize limb with a splint.",
      "Remove tight items (rings, watches) near bite in case of swelling.",
      "Do NOT cut the wound, suck venom, or apply ice or tourniquet.",
      "Transport to hospital; antivenom may be required.",
    ],
  },
  {
    id: "fracture",
    title: "Suspected Fracture",
    short: "Keep limb stable and immobilized, avoid moving the person unnecessarily.",
    steps: [
      "Immobilize the limb — make a splint using boards or rolled clothing.",
      "Support injured limb and avoid forcing movement.",
      "Apply ice pack (wrapped) for swelling, not directly on skin.",
      "Seek urgent medical evaluation and X-ray.",
    ],
  },
  {
    id: "breathing",
    title: "Breathing Difficulty / Asthma Attack",
    short: "Wheezing, breathlessness — help them use inhaler, call ambulance if severe.",
    steps: [
      "Help the person sit upright and remain calm.",
      "Assist with their inhaler (4 puffs via spacer, if available) — follow their action plan.",
      "If breathing worsens or cyanosis, call ambulance immediately.",
      "Monitor continuously; prepare to start CPR if they collapse and stop breathing.",
    ],
  },
];

export default function Emergency() {
  const [sosOpen, setSosOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null, accuracy: null });
  const [gettingLocation, setGettingLocation] = useState(false);
  const [sentSOSList, setSentSOSList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sentSOS")) || [];
    } catch {
      return [];
    }
  });
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    localStorage.setItem("sentSOS", JSON.stringify(sentSOSList));
  }, [sentSOSList]);

  // utility: show toast
  const pushToast = (text, type = "info") => {
    const id = Date.now();
    setToasts((s) => [...s, { id, text, type }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 4000);
  };

  const openMaps = (lat, lng, name) => {
    const query = encodeURIComponent(`${lat},${lng} (${name})`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      pushToast("Copied to clipboard");
    } catch {
      pushToast("Unable to copy", "error");
    }
  };

  const getGeo = () => {
    if (!navigator.geolocation) {
      pushToast("Geolocation not supported", "error");
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        pushToast("Location acquired");
        setGettingLocation(false);
      },
      (err) => {
        pushToast("Location error: " + err.message, "error");
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const sendSOS = (payload) => {
    // Mock send: store locally and log — replace with backend call (SMS/Push) later
    const record = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      payload,
    };
    setSentSOSList((s) => [record, ...s]);
    pushToast("SOS Sent — help is on the way");
    console.log("SOS payload (mock send):", record);
    setSosOpen(false);
  };

  const handleCallQuick = (num) => {
    window.location.href = `tel:${num}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-full shadow-lg">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Emergency Response</h1>
              <p className="text-sm text-gray-600">Quick actions & life-saving guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { getGeo(); pushToast("Attempting to get GPS location..."); }}
              className="flex items-center gap-2 bg-white border border-teal-600 text-teal-600 px-4 py-2 rounded-lg shadow-sm hover:bg-teal-50 transition-colors"
            >
              <FaMapMarkerAlt /> Get My Location
            </button>
            <button
              onClick={() => setSosOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
            >
              <FaPhoneAlt /> Send SOS
            </button>
          </div>
        </header>

        {/* Emergency number cards */}
        <section className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPhoneAlt className="text-red-500" /> Emergency Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {EMERGENCY_NUMBERS.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center p-4 rounded-xl shadow-md bg-gradient-to-br ${item.color} text-white transition-all transform hover:scale-105 cursor-pointer`}
                onClick={() => window.location.href = `tel:${item.number}`}
              >
                <div className="text-3xl mb-2 bg-white bg-opacity-20 p-3 rounded-full">
                  {item.icon}
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{item.label}</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="text-sm font-medium">{item.number}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.number);
                      }}
                      className="text-xs p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                      title="Copy number"
                    >
                      <FaClipboard />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Floating Buttons (for mobile) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <button
            title="Call Ambulance"
            onClick={() => handleCallQuick(EMERGENCY_NUMBERS.find(n => n.id === "ambulance").number)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center shadow-lg border-4 border-white transition-transform hover:scale-110"
          >
            <FaAmbulance className="text-xl" />
          </button>
          <button
            title="Call Police"
            onClick={() => handleCallQuick(EMERGENCY_NUMBERS.find(n => n.id === "police").number)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg border-4 border-white transition-transform hover:scale-110"
          >
            <FaShieldAlt className="text-xl" />
          </button>
        </div>

        {/* Nearby centers + first aid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Nearby centers */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaHospital className="text-blue-500" /> Nearby Emergency Centers
              </h3>
              <div className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{MOCK_NEARBY.length} results</div>
            </div>

            <ul className="space-y-4">
              {MOCK_NEARBY.map((center) => (
                <li key={center.id} className="border rounded-xl p-4 flex items-start gap-4 transition-all hover:shadow-md">
                  <div className="text-2xl text-blue-500 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{center.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{center.address}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${center.open ? "text-green-600" : "text-red-500"}`}>
                          {center.open ? "Open" : "Closed"}
                        </div>
                        <div className="text-xs text-gray-500">{center.distanceKm} km</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={`tel:${center.phone}`}
                        className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-teal-700"
                      >
                        <FaPhoneAlt className="text-xs" /> Call
                      </a>
                      <button
                        onClick={() => openMaps(center.lat, center.lng, center.name)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-gray-50"
                      >
                        <FaMapMarkedAlt /> Maps
                      </button>
                      <button
                        onClick={() => copyToClipboard(`${center.name} — ${center.phone}`)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-gray-50"
                      >
                        <FaClipboard /> Copy
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: First aid & location quick info */}
          <div className="bg-white rounded-xl shadow-md p-4 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaFirstAid className="text-red-500" /> First Aid Guides
              </h3>
              <div className="text-sm text-gray-500">Quick steps to help before medical aid</div>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {FIRST_AID_GUIDES.map((g) => (
                <div key={g.id} className="border rounded-xl overflow-hidden transition-all hover:shadow-md">
                  <button
                    onClick={() => setExpanded(expanded === g.id ? null : g.id)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FaHeartbeat className="text-red-500" />
                      <div>
                        <div className="font-semibold">{g.title}</div>
                        <div className="text-xs text-gray-500">{g.short}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {expanded === g.id ? "Collapse" : "Expand"}
                    </div>
                  </button>

                  {expanded === g.id && (
                    <div className="px-4 py-3 bg-white text-sm text-gray-700 space-y-2 border-t">
                      <ol className="list-decimal pl-5 space-y-2">
                        {g.steps.map((s, idx) => (
                          <li key={idx} className="pb-1">{s}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick location details */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-teal-500" /> Your Location
                  </div>
                  <div className="font-medium text-gray-800 text-sm mt-1">
                    {location.lat ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : "Location not acquired"}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={getGeo}
                    disabled={gettingLocation}
                    className="px-3 py-2 bg-white border border-teal-600 text-teal-600 rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-teal-50 disabled:opacity-50"
                  >
                    {gettingLocation ? "Locating..." : "Get Location"}
                  </button>
                  <button
                    onClick={() => {
                      if (location.lat) {
                        openMaps(location.lat, location.lng, "My location");
                      } else {
                        pushToast("No location available", "error");
                      }
                    }}
                    className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-teal-700"
                  >
                    Open in Maps
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">Tip: If on mobile, tapping "Get Location" will try to fetch GPS coordinates.</div>
            </div>
          </div>
        </div>

        {/* Recent SOS log */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FaHistory className="text-purple-500" /> Recent SOS Requests (mock)
            </h3>
            <div className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{sentSOSList.length}</div>
          </div>

          {sentSOSList.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg">
              No SOS requests sent yet from this device.
            </div>
          ) : (
            <ul className="space-y-3">
              {sentSOSList.map((s) => (
                <li key={s.id} className="border rounded-lg p-4 flex items-start justify-between transition-all hover:shadow-md">
                  <div>
                    <div className="text-sm font-medium">{new Date(s.timestamp).toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">{s.payload.name} • {s.payload.phone}</div>
                    <div className="text-xs text-gray-600 mt-1">Loc: {s.payload.lat ? `${s.payload.lat.toFixed(4)}, ${s.payload.lng.toFixed(4)}` : "N/A"}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => openMaps(s.payload.lat || MOCK_NEARBY[0].lat, s.payload.lng || MOCK_NEARBY[0].lng, "SOS location")} 
                      className="px-3 py-1 border border-gray-300 rounded text-sm transition-colors hover:bg-gray-50"
                    >
                      Open
                    </button>
                    <button 
                      onClick={() => { setSentSOSList(prev => prev.filter(r => r.id !== s.id)); pushToast("Removed"); }} 
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm transition-colors hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="text-center text-xs text-gray-500 py-6">Note: SOS and calls in this demo are mocked. Integrate with backend SMS/alert system for real dispatch.</footer>
      </div>

      {/* SOS Modal */}
      {sosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => setSosOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors">
              <FaTimes className="text-xl" />
            </button>

            <h3 className="text-2xl font-bold mb-2 text-gray-800">Send Emergency SOS</h3>
            <p className="text-sm text-gray-500 mb-6">Share your location and basic info. This will notify emergency contacts (mock).</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const payload = {
                  name: fd.get("name"),
                  phone: fd.get("phone"),
                  reason: fd.get("reason"),
                  lat: location.lat,
                  lng: location.lng,
                };
                sendSOS(payload);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input name="name" placeholder="Your full name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                  <input name="phone" placeholder="Your phone number" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency type</label>
                <select name="reason" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent" defaultValue="medical">
                  <option value="medical">Medical emergency</option>
                  <option value="accident">Road accident</option>
                  <option value="violent">Violence / safety</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-teal-500" />
                  <span className="text-sm font-medium text-gray-700">Your Coordinates</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {location.lat ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : "Location not available"}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!location.lat) {
                      getGeo();
                    } else {
                      copyToClipboard(`${location.lat},${location.lng}`);
                    }
                  }}
                  className="px-4 py-2 bg-white border border-teal-600 text-teal-600 rounded-lg text-sm transition-colors hover:bg-teal-50"
                >
                  {location.lat ? "Copy Coordinates" : "Get Location"}
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={() => setSosOpen(false)} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105">Send Emergency SOS</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg ${t.type === "error" ? "bg-red-600 text-white" : "bg-teal-600 text-white"} transition-all transform animate-fadeIn`}>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}