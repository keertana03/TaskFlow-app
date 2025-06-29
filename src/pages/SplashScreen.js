import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoginClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={logo}
        alt="App Logo"
        onLoad={() => setImageLoaded(true)}
        className={`w-64 h-64 md:w-80 md:h-80 mb-10 ${!imageLoaded ? 'hidden' : ''}`}
      />

      {imageLoaded && (
        <button
          onClick={handleLoginClick}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-xl shadow-md transition duration-300"
        >
          Login
        </button>
      )}
    </div>
  );
}
