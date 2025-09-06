import { useState } from "react";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Registration data:", formData);
        setIsLoading(false);
        // Here you would typically redirect user or show success message
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 p-4">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden max-h-[90vh] md:max-h-[600px]">
        
        {/* Left side - Logo with white background */}
        <div className="hidden md:flex w-full md:w-2/5 bg-white items-center justify-center p-6">
          <div className="text-center">
            <img
              src={Logo}
              alt="SehatSathi Logo"
              className="w-full max-w-[180px] mx-auto object-contain mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Join SehatSathi</h3>
            <p className="text-gray-600 text-sm">Your health journey starts here</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-3/5 p-5 md:p-6 flex flex-col justify-center overflow-y-auto">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4 md:hidden">
            <img
              src={Logo}
              alt="SehatSathi Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mb-4 text-center">
            Enter your details to get started
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 px-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                  }`}
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-teal-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.confirmPassword}</p>}
            </div>

            {/* Sign Up Button */}
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
                  Creating account...
                </>
              ) : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              <img src={GoogleSvg} alt="Google" className="w-4 h-4"/>
              Sign Up with Google
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4 text-xs md:text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}