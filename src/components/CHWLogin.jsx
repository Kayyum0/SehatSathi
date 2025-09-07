// src/components/CHWLogin.jsx
import { useState } from "react";
import Logo from "../assets/chw.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CHWLogin({ onClose }) {
  const [formData, setFormData] = useState({ chwId: "", mobile: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.chwId) newErrors.chwId = "CHW ID is required";
    if (!formData.mobile) newErrors.mobile = "Mobile Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("CHW Login data:", formData);
        setIsLoading(false);
        if (onClose) onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-2xl overflow-hidden max-h-[90vh] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose || (() => {})}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        {/* Left side - Logo (hidden on mobile) */}
        <div className="hidden md:flex w-2/5 bg-white items-center justify-center p-6">
          <div className="text-center">
            <img src={Logo} alt="SehatSathi CHW Logo" className="w-full max-w-[150px] mx-auto object-contain mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">CHW Login</h3>
            <p className="text-gray-600 text-sm">Authorized CHWs only</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-3/5 p-5 md:p-6 flex flex-col justify-center overflow-y-auto">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={Logo} alt="CHW Logo" className="w-16 h-16 object-contain" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">Welcome CHW!</h2>
          <p className="text-gray-500 text-sm mb-4 text-center">Enter your credentials to login</p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="chwId"
                placeholder="CHW ID"
                value={formData.chwId}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                  errors.chwId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              {errors.chwId && <p className="text-red-500 text-xs mt-1 px-1">{errors.chwId}</p>}
            </div>

            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                  errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1 px-1">{errors.mobile}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                  }`}
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-teal-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
