// // src/App.jsx
// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SplashScreen from "./components/SplashScreen";
// import Login from "./components/Login";
// import Register from "./components/Register";

// function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     // Check if splash was already shown in this session
//     const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

//     if (hasSeenSplash) {
//       setShowSplash(false); // skip splash if already shown
//     } else {
//       // wait for splash to finish, then set flag
//       const timer = setTimeout(() => {
//         setShowSplash(false);
//         sessionStorage.setItem("hasSeenSplash", "true");
//       }, 3000); // match your SplashScreen animation duration

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   return (
//     <Router>
//       {showSplash ? (
//         <SplashScreen />
//       ) : (
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       )}
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setShowSplash(false); // skip splash if already shown
    } else {
      // wait for splash to finish, then set flag
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 3000); // match your SplashScreen animation duration

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          {/* Default → LandingPage */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
