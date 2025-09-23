// src/components/chw_pages/Chw_AddPatient.jsx
import { useState } from "react";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    conditions: "",
    medications: "",
    surgeries: "",
    bp: "",
    temperature: "",
    oxygen: "",
    heartRate: "",
    respiratoryRate: "",
    symptoms: [],
    notes: "",
    consentTreatment: false,
    consentShare: false,
  });

  const symptomOptions = [
    "Fatigue",
    "Cough",
    "Shortness of Breath",
    "Chest Pain",
    "Nausea",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "symptoms") {
      setFormData((prev) => ({
        ...prev,
        symptoms: checked
          ? [...prev.symptoms, value]
          : prev.symptoms.filter((s) => s !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data Submitted:", formData);
    alert("Patient details submitted successfully!");
    setFormData({
      fullName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      allergies: "",
      conditions: "",
      medications: "",
      surgeries: "",
      bp: "",
      temperature: "",
      oxygen: "",
      heartRate: "",
      respiratoryRate: "",
      symptoms: [],
      notes: "",
      consentTreatment: false,
      consentShare: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">Add New Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Medical History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="allergies"
            placeholder="Known Allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="conditions"
            placeholder="Chronic Conditions"
            value={formData.conditions}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="medications"
            placeholder="Current Medications"
            value={formData.medications}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="surgeries"
            placeholder="Previous Surgeries/Hospitalizations"
            value={formData.surgeries}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="bp"
            placeholder="Blood Pressure (e.g., 120/80)"
            value={formData.bp}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            value={formData.temperature}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="oxygen"
            placeholder="Oxygen Saturation (%)"
            value={formData.oxygen}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="heartRate"
            placeholder="Heart Rate (bpm)"
            value={formData.heartRate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="respiratoryRate"
            placeholder="Respiratory Rate"
            value={formData.respiratoryRate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Symptoms */}
        <div>
          <p className="font-semibold mb-2">Symptoms:</p>
          <div className="flex flex-wrap gap-4">
            {symptomOptions.map((symptom) => (
              <label key={symptom} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="symptoms"
                  value={symptom}
                  checked={formData.symptoms.includes(symptom)}
                  onChange={handleChange}
                  className="accent-teal-600"
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Additional Notes / Observations"
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
        ></textarea>

        {/* Consent */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="consentTreatment"
              checked={formData.consentTreatment}
              onChange={handleChange}
              required
              className="accent-teal-600"
            />
            Consent to Treatment
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="consentShare"
              checked={formData.consentShare}
              onChange={handleChange}
              required
              className="accent-teal-600"
            />
            Consent to Share Data with Doctors
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition w-full"
        >
          Submit Patient
        </button>
      </form>
    </div>
  );
}
