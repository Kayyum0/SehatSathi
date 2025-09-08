import React, { useEffect, useMemo, useState } from "react";
import { FaVideo, FaMapMarkerAlt, FaStar, FaSearch, FaTimes } from "react-icons/fa";

// Appointment.jsx

export default function Appointment() {
  // mock doctors (images should live in public/doctors/...)
  const initialDoctors = [
    {
      id: 1,
      name: "Dr. Ayesha Kaur",
      specialization: "Dermatologist",
      degree: "MD (Dermatology)",
      regNo: "REG-D-458762",
      experience: 8,
      rating: 4.6,
      fee: 400,
      available: true,
      image: "/doctors/doc1.png",
    },
    {
      id: 2,
      name: "Dr. Arjun Mehta",
      specialization: "General Surgeon",
      degree: "MS (General Surgery)",
      regNo: "REG-S-564213",
      experience: 12,
      rating: 4.2,
      fee: 600,
      available: true,
      image: "/doctors/doc4.png",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Ophthalmologist",
      degree: "MS (Ophthalmology)",
      regNo: "REG-O-789652",
      experience: 6,
      rating: 4.8,
      fee: 350,
      available: false,
      image: "/doctors/doc2.png",
    },
    {
      id: 4,
      name: "Dr. Imran Shaikh",
      specialization: "Pediatrician",
      degree: "MD (Pediatrics)",
      regNo: "REG-P-652198",
      experience: 10,
      rating: 4.5,
      fee: 300,
      available: true,
      image: "/doctors/doc3.png",
    },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // video | in-person
  const [sortBy, setSortBy] = useState("best"); // best | rating | fee | experience
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [bookings, setBookings] = useState(() => {
    try {
      const raw = localStorage.getItem("ss_appointments");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // For demo we generate available slots per doctor (simple, deterministic)
  const generateSlotsForDoctor = (docId) => {
    const slots = [];
    const today = new Date();
    // next 5 days, 4 slots per day
    for (let d = 0; d < 5; d++) {
      for (let s = 9; s <= 16; s += 2) {
        const dt = new Date(today);
        dt.setDate(today.getDate() + d);
        dt.setHours(s, 0, 0, 0);
        // simple uniqueness by docId
        if ((dt.getDate() + docId) % 2 !== 0) continue; // vary availability across doctors
        slots.push(dt.toISOString());
      }
    }
    return slots;
  };

  const doctorsWithSlots = useMemo(() => {
    return doctors.map((d) => ({ ...d, slots: generateSlotsForDoctor(d.id) }));
  }, [doctors]);

  // filters + sorting
  const filtered = useMemo(() => {
    let list = doctorsWithSlots;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.degree.toLowerCase().includes(q)
      );
    }
    if (specialty) list = list.filter((d) => d.specialization === specialty);
    if (typeFilter === "video") list = list.filter((d) => d.available === true);

    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "fee") list = [...list].sort((a, b) => a.fee - b.fee);
    else if (sortBy === "experience") list = [...list].sort((a, b) => b.experience - a.experience);
    else list = [...list].sort((a, b) => b.rating - a.rating); // best by rating

    return list;
  }, [doctorsWithSlots, query, specialty, typeFilter, sortBy]);

  useEffect(() => {
    localStorage.setItem("ss_appointments", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    setBookingModalOpen(true);
  };

  const closeBooking = () => {
    setBookingModalOpen(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
  };

  const handleConfirmBooking = (patient) => {
    if (!selectedSlot) return setToast({ type: "error", message: "Please select a slot" });
    const booking = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      regNo: selectedDoctor.regNo,
      slot: selectedSlot,
      type: patient.type,
      patientName: patient.name,
      patientPhone: patient.phone,
      createdAt: new Date().toISOString(),
      fee: selectedDoctor.fee,
    };

    // Save booking and remove slot from availability (for demo purpose only)
    setBookings((prev) => [booking, ...prev]);
    // remove slot from doctor's slots (simulate booked)
    setDoctors((prev) => prev.map((d) => (d.id === selectedDoctor.id ? { ...d, _bookedSlots: [...(d._bookedSlots || []), selectedSlot] } : d)));

    setToast({ type: "success", message: `Appointment booked with ${selectedDoctor.name}` });
    closeBooking();
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setToast({ type: "success", message: "Appointment cancelled" });
  };

  // helper to format slot ISO -> readable
  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  // specializations list
  const specializations = Array.from(new Set(initialDoctors.map((d) => d.specialization)));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-teal-700">Appointments</h1>
            <p className="text-gray-600">Find a trusted doctor, choose a slot & book instantly.</p>
          </div>

          {/* Search + Filters */}
          <div className="w-full md:w-auto flex gap-2 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors, specialization or degree"
                className="pl-10 pr-4 py-2 rounded-lg border border-teal-600 focus:ring-2 focus:ring-teal-600"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="py-2 px-3 rounded-lg border">
              <option value="">All Specialties</option>
              {specializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="py-2 px-3 rounded-lg border">
              <option value="">All Types</option>
              <option value="video">Video Call (Available Only)</option>
              <option value="in-person">In-Person</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="py-2 px-3 rounded-lg border">
              <option value="best">Best Match</option>
              <option value="rating">Top Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fee">Lowest Fee</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctors list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                  <div className="flex gap-4 p-4">
                    <img src={doc.image} alt={doc.name} className="w-28 h-28 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                          <p className="text-sm text-gray-600">{doc.degree} • {doc.specialization}</p>
                          <p className="text-xs text-gray-500">Reg: {doc.regNo} • {doc.experience} yrs exp</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${doc.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {doc.available ? 'Available' : 'Not Available'}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 flex items-center gap-1 justify-end">
                            <span className="font-semibold">{doc.rating}</span>
                            <FaStar className="text-yellow-500" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2"> 
                        <span className="px-2 py-1 border rounded-md text-xs text-teal-700 border-teal-600">Fee ₹{doc.fee}</span>
                        <span className="px-2 py-1 border rounded-md text-xs text-gray-700">{doc.specialization}</span>
                        <span className="px-2 py-1 border rounded-md text-xs text-gray-700">{doc.experience} yrs</span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button onClick={() => openBooking(doc)} className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-60"> 
                          <FaVideo className="inline mr-2" /> Book
                        </button>
                        <button onClick={() => { alert('Open doctor profile (future)') }} className="flex-1 bg-gray-100 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">View
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-0 text-sm text-gray-500">
                    <strong>Next available:</strong> {doc.slots && doc.slots.length ? new Date(doc.slots[0]).toLocaleString() : "No slots"}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full bg-white p-6 rounded-lg text-center text-gray-600">No doctors matched your search.</div>
              )}
            </div>
          </div>

          {/* Right column - quick stats & my appointments */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold text-gray-800">Quick Stats</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="p-3 bg-teal-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-700">{doctors.length}</div>
                  <div className="text-xs text-gray-600">Doctors</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-700">{bookings.length}</div>
                  <div className="text-xs text-gray-600">Your Bookings</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-700">{Math.round(doctors.reduce((s,d)=>s+d.rating,0)/doctors.length*10)/10}</div>
                  <div className="text-xs text-gray-600">Avg Rating</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-800">₹{doctors.reduce((s,d)=>s+d.fee,0)/doctors.length|0}</div>
                  <div className="text-xs text-gray-600">Avg Fee</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">My Appointments</h4>
                <button onClick={() => { setBookings([]); setToast({type:'success', message:'Cleared all bookings'}); }} className="text-xs text-teal-600">Clear</button>
              </div>

              <div className="mt-3 space-y-3 max-h-64 overflow-auto">
                {bookings.length === 0 && <div className="text-sm text-gray-500">No upcoming appointments</div>}
                {bookings.map((b) => (
                  <div key={b.id} className="p-3 bg-gray-50 rounded-md flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{b.doctorName} • <span className="text-xs text-gray-500">{b.specialization}</span></div>
                      <div className="text-xs text-gray-600">{new Date(b.slot).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Patient: {b.patientName}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm font-semibold">₹{b.fee}</div>
                      <button onClick={() => handleCancelBooking(b.id)} className="text-xs text-red-600">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold text-gray-800">Help & Tips</h4>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li>• Choose a doctor with green "Available" badge for immediate video calls.</li>
                <li>• Keep your registration number handy for quick verification.</li>
                <li>• Cancel at least 2 hours before the slot to free it up for others.</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Booking Modal */}
        {bookingModalOpen && selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-auto max-h-[90vh]">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={selectedDoctor.image} alt="doc" className="w-14 h-14 rounded-md object-cover" />
                  <div>
                    <div className="font-semibold text-lg">{selectedDoctor.name}</div>
                    <div className="text-sm text-gray-600">{selectedDoctor.specialization} • {selectedDoctor.degree}</div>
                    <div className="text-xs text-gray-500">Reg: {selectedDoctor.regNo}</div>
                  </div>
                </div>
                <button onClick={closeBooking} className="p-2 rounded-md hover:bg-gray-100"><FaTimes /></button>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Slots selector */}
                <div>
                  <h4 className="font-semibold mb-3">Choose a Slot</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDoctor.slots && selectedDoctor.slots.length ? selectedDoctor.slots.map((s) => {
                      // check if slot booked
                      const alreadyBooked = bookings.some((b) => b.doctorId === selectedDoctor.id && b.slot === s);
                      const disabled = alreadyBooked;
                      return (
                        <button key={s} disabled={disabled} onClick={() => setSelectedSlot(s)} className={`text-left p-3 rounded-lg border ${selectedSlot===s? 'border-teal-600 bg-teal-50' : 'border-gray-200 bg-white'} ${disabled? 'opacity-50 cursor-not-allowed':''}`}>
                          <div className="font-medium text-sm">{new Date(s).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-600">{new Date(s).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                          {disabled && <div className="text-xs text-red-600 mt-1">Already booked</div>}
                        </button>
                      );
                    }) : <div className="text-sm text-gray-500">No slots available</div>}
                  </div>
                </div>

                {/* Booking form */}
                <div>
                  <h4 className="font-semibold mb-3">Confirm Booking</h4>
                  <BookingForm
                    onConfirm={(patient) => handleConfirmBooking(patient)}
                    defaultType={typeFilter || 'video'}
                  />

                  <div className="mt-4 text-sm text-gray-600">
                    <div>Fee: <strong>₹{selectedDoctor.fee}</strong></div>
                    <div className="mt-2">Note: This demo stores bookings locally in your browser.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`fixed right-6 bottom-6 px-4 py-3 rounded-md shadow-lg ${toast.type==='success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingForm({ onConfirm, defaultType }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(defaultType || "video");

  useEffect(() => setType(defaultType || "video"), [defaultType]);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600">Patient name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600" placeholder="Full name" />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Phone</label>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600" placeholder="Mobile number" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Appointment type</label>
        <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600">
          <option value="video">Video Call</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button onClick={()=>{
          if(!name.trim()||!phone.trim()) return alert('Please enter patient name and phone');
          onConfirm({ name: name.trim(), phone: phone.trim(), type });
        }} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Confirm</button>
      </div>
    </div>
  );
}
