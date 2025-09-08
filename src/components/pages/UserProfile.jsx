// src/components/UserProfile.jsx
import { useState } from "react";
import { FaCamera, FaEdit, FaSave } from "react-icons/fa";

function UserProfile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    taluka: "",
    village: "",
    pincode: "",
    bloodGroup: "",
    medicalHistory: "",
    allergies: "",
    emergencyContact: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const [isEditing, setIsEditing] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  // Save profile
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Profile:", profile);
    alert("✅ Profile saved successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6 pt-12">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-600 text-white py-6 px-8 flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-white text-teal-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-teal-100 transition"
                  >
                    <FaCamera size={18} />
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name || "Your Name"}</h2>
              <p className="text-sm">{profile.email || "Email address"}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg shadow-md hover:bg-teal-100 transition"
          >
            {isEditing ? <FaSave /> : <FaEdit />} {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                placeholder="Age"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="taluka"
                value={profile.taluka}
                onChange={handleChange}
                placeholder="Taluka"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="village"
                value={profile.village}
                onChange={handleChange}
                placeholder="Village"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
                disabled={!isEditing}
              />
              <input
                type="text"
                value="Punjab"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600 bg-gray-100"
                disabled
              />
            </div>
          </div>

          {/* Medical Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Medical Information</h3>
            <textarea
              name="medicalHistory"
              value={profile.medicalHistory}
              onChange={handleChange}
              placeholder="Medical History"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600"
              disabled={!isEditing}
            />
            <textarea
              name="allergies"
              value={profile.allergies}
              onChange={handleChange}
              placeholder="Allergies"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600 mt-4"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="emergencyContact"
              value={profile.emergencyContact}
              onChange={handleChange}
              placeholder="Emergency Contact"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-600 mt-4"
              disabled={!isEditing}
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2"
              >
                <FaSave /> Save Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
