// src/components/LandingPage.jsx
import { useState } from "react";
import { 
  FaUserMd, 
  FaUsers, 
  FaHospitalUser, 
  FaMapMarkedAlt, 
  FaMobileAlt, 
  FaVideo, 
  FaCalendarCheck, 
  FaPrescriptionBottleAlt,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaQuoteLeft
} from "react-icons/fa";
import { 
  RiMentalHealthLine, 
  RiCustomerService2Fill,
  RiMedicineBottleLine
} from "react-icons/ri";
import Login from "./Login";
import Register from "./Register";
import CHWLogin from "./CHWLogin";

export default function LandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <FaVideo className="text-teal-600 text-3xl" />,
      title: "Video Consultations",
      description: "Connect with doctors via secure video calls from the comfort of your home"
    },
    {
      icon: <FaPrescriptionBottleAlt className="text-teal-600 text-3xl" />,
      title: "E-Prescriptions",
      description: "Get digital prescriptions that can be shared with pharmacies instantly"
    },
    {
      icon: <RiMentalHealthLine className="text-teal-600 text-3xl" />,
      title: "Specialist Access",
      description: "Consult with specialists across Punjab without travel expenses"
    },
    {
      icon: <FaCalendarCheck className="text-teal-600 text-3xl" />,
      title: "Easy Appointments",
      description: "Book, reschedule or cancel appointments with just a few taps"
    }
  ];

  const testimonials = [
    {
      name: "Amrit Kaur",
      location: "Ludhiana",
      text: "SehatSathi helped me consult with a cardiologist in Patiala without leaving my village. The doctor was very knowledgeable.",
      rating: 5
    },
    {
      name: "Gurpreet Singh",
      location: "Amritsar",
      text: "As a farmer, I don't have time to visit hospitals. This app has been a blessing for my family's healthcare needs.",
      rating: 4
    },
    {
      name: "Dr. Sharma",
      location: "Chandigarh",
      text: "The platform makes it easy to serve patients in remote areas. The interface is intuitive and the video quality is excellent.",
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-white text-teal-700 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo + App Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <span className="text-2xl font-extrabold tracking-wide">SehatSathi</span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-teal-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-teal-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-500 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-teal-500 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-teal-500 transition-colors">FAQ</a>
          </nav>

          {/* Right: Language + Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <select className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>English</option>
              <option>हिंदी</option>
              <option>ਪੰਜਾਬੀ</option>
            </select>

            <button
              onClick={() => setActiveModal("login")}
              className="bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition"
            >
              Patient Login
            </button>
            <button
              onClick={() => setActiveModal("chwLogin")}
              className="bg-amber-500 text-gray-800 font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-amber-600 transition"
            >
              CHW Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-6 py-4 shadow-inner">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="py-2 hover:text-teal-500" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="py-2 hover:text-teal-500" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#testimonials" className="py-2 hover:text-teal-500" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a href="#faq" className="py-2 hover:text-teal-500" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <div className="pt-4 border-t border-gray-200">
                <select className="w-full bg-gray-100 text-gray-700 rounded-lg px-3 py-2 shadow-sm mb-4">
                  <option>English</option>
                  <option>हिंदी</option>
                  <option>ਪੰਜਾਬੀ</option>
                </select>
                <button
                  onClick={() => { setActiveModal("login"); setIsMenuOpen(false); }}
                  className="w-full bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition mb-3"
                >
                  Patient Login
                </button>
                <button
                  onClick={() => { setActiveModal("chwLogin"); setIsMenuOpen(false); }}
                  className="w-full bg-amber-500 text-gray-800 font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-amber-600 transition"
                >
                  CHW Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Healthcare <span className="text-teal-600">Reimagined</span> for Punjab
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              SehatSathi connects patients, doctors, and community health workers to bring accessible, affordable medical care to every village in Punjab through our telemedicine platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActiveModal("register")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center"
              >
                Get Started <FaArrowRight className="ml-2" />
              </button>
              <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-6 rounded-lg shadow-md border border-teal-200 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-teal-100 rounded-full absolute -top-10 -left-10 z-0"></div>
              <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl">
                <div className="bg-teal-600 text-white p-4 rounded-t-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                    <span className="text-sm">Video Consultation</span>
                  </div>
                  <RiCustomerService2Fill />
                </div>
                <div className="p-4 bg-gray-50 rounded-b-xl">
                  <div className="bg-white rounded-lg p-4 shadow mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                        <FaUserMd className="text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Dr. Kaur</h3>
                        <p className="text-sm text-gray-500">Cardiologist</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available Today</span>
                      <button className="text-teal-600 font-semibold">Book Now</button>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <div className="inline-flex items-center bg-teal-100 text-teal-700 px-4 py-2 rounded-full">
                      <FaVideo className="mr-2" /> Start Video Call
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
              <FaUserMd className="text-teal-600 text-4xl mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-800">120+</h3>
              <p className="text-gray-600">Verified Doctors</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
              <FaUsers className="text-green-600 text-4xl mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
              <p className="text-gray-600">Patients Served</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
              <FaMapMarkedAlt className="text-blue-600 text-4xl mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-800">250+</h3>
              <p className="text-gray-600">Villages Covered</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
              <FaHospitalUser className="text-purple-600 text-4xl mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-800">300+</h3>
              <p className="text-gray-600">CHW Workers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-teal-600">Services</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">SehatSathi offers comprehensive telemedicine services designed specifically for the needs of Punjab's communities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <span className="text-teal-600">SehatSathi</span> Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Getting medical help has never been easier with our simple 4-step process</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-teal-200 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { number: "1", title: "Sign Up", desc: "Create your account in minutes" },
                { number: "2", title: "Choose Doctor", desc: "Select from qualified specialists" },
                { number: "3", title: "Book Appointment", desc: "Pick a convenient time slot" },
                { number: "4", title: "Consult Online", desc: "Connect via video or chat" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our <span className="text-teal-600">Users</span> Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from patients and doctors who have experienced the SehatSathi difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < testimonial.rating ? "text-amber-400" : "text-gray-300"} />
                  ))}
                </div>
                <FaQuoteLeft className="text-teal-200 text-2xl mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Modern Healthcare?</h2>
          <p className="text-teal-100 max-w-2xl mx-auto mb-8">Join thousands of Punjab residents who have transformed their healthcare journey with SehatSathi</p>
          <button 
            onClick={() => setActiveModal("register")}
            className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md transition"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white font-bold">SS</span>
              </div>
              <span className="text-xl font-extrabold text-white">SehatSathi</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Bringing quality healthcare to every village in Punjab through technology and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => setActiveModal("login")} className="hover:text-white transition">Login</button></li>
              <li><button onClick={() => setActiveModal("register")} className="hover:text-white transition">Register</button></li>
              <li><a href="#" className="hover:text-white transition">Find Doctors</a></li>
              <li><a href="#" className="hover:text-white transition">Download App</a></li>
              <li><a href="#" className="hover:text-white transition">Emergency Contacts</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition">Video Consultation</a></li>
              <li><a href="#" className="hover:text-white transition">E-Prescriptions</a></li>
              <li><a href="#" className="hover:text-white transition">Health Records</a></li>
              <li><a href="#" className="hover:text-white transition">Medicine Delivery</a></li>
              <li><a href="#" className="hover:text-white transition">CHW Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@sehatsathi.in</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Chandigarh, Punjab, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} SehatSathi. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
          {activeModal === "login" && (
            <Login
              onClose={() => setActiveModal(null)}
              switchToRegister={() => setActiveModal("register")}
            />
          )}
          {activeModal === "register" && (
            <Register
              onClose={() => setActiveModal(null)}
              switchToLogin={() => setActiveModal("login")}
            />
          )}
          {activeModal === "chwLogin" && (
            <CHWLogin
              onClose={() => setActiveModal(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}