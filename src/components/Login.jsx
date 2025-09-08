import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ onClose, switchToRegister }) {
  const navigate = useNavigate(); // ✅ setup navigate
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        console.log("Login data:", formData);
        setIsLoading(false);

        // ✅ Redirect to Dashboard after login
        navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>

      {/* Left side - Logo */}
      <div className="hidden md:flex w-2/5 bg-white items-center justify-center p-6">
        <div className="text-center">
          <img
            src={Logo}
            alt="SehatSathi Logo"
            className="w-full max-w-[180px] mx-auto object-contain mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Welcome to SehatSathi
          </h3>
          <p className="text-gray-600 text-sm">Your health, our priority</p>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="w-full md:w-3/5 p-5 md:p-6 flex flex-col justify-center overflow-y-auto">
        <div className="flex justify-center mb-4 md:hidden">
          <img src={Logo} alt="SehatSathi Logo" className="w-16 h-16 object-contain" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
          Welcome back!
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Please enter your details to sign in
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>
            )}
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
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-teal-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-teal-600 hover:text-teal-700 hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            <img src={GoogleSvg} alt="Google" className="w-4 h-4" />
            Sign in with Google
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4 text-xs md:text-sm">
          Don't have an account?{" "}
          <button
            onClick={switchToRegister}
            className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
