import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Make sure your logo file is in this path

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoginClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login');
    }, 600); // Matches animation duration
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={logo}
        alt="App Logo"
        className="w-44 h-44 md:w-52 md:h-52 mb-8 animate-bounce"
      />
      <button
        onClick={handleLoginClick}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-300"
      >
        Login
      </button>
    </div>
  );
}
