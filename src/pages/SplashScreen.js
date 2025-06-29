import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // make sure the path is correct

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoginClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login');
    }, 500); // Fade duration
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={logo}
        alt="App Logo"
        className="w-44 h-44 md:w-56 md:h-56 mb-8"
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
