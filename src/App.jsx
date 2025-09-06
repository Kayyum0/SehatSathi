// // src/App.jsx
// import { useState } from "react"
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import SplashScreen from "./components/SplashScreen"
// import Login from "./components/Login"
// import Register from "./components/Register"

// function App() {
//   const [showSplash, setShowSplash] = useState(true)

//   return (
//     <Router>
//       {showSplash ? (
//         <SplashScreen onFinish={() => setShowSplash(false)} />
//       ) : (
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       )}
//     </Router>
//   )
// }

// export default App


// src/App.jsx
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SplashScreen from "./components/SplashScreen"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if we've already shown the splash screen
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  }

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Router>
  )
}

export default App