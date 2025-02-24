import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';  //Default IMPORT
import Home from './pages/Home'; //Default IMPORT
import Login from './pages/Login';  //Default IMPORT
import Register from './pages/Register'; //Default IMPORT
import authService from './services/authService'; // Import authService

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    console.log("App.js: useEffect - Checking login status"); // Debugging
    setIsLoggedIn(authService.isLoggedIn());
  }, []);

  const handleLoginSuccess = () => {
    console.log("App.js: Login successful, updating state"); // Debugging
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout();
    console.log("App.js: Logout, updating state"); // Debugging
    setIsLoggedIn(false);
  };

  return (
    <Router>
    <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} />
    <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
    </Routes>
    </Router>
  );
}

export default App;
