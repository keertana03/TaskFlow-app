import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/logo.png'; // make sure your logo file is here

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoginClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login');
    }, 600); // matches animation duration
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <img
        src={logo}
        alt="App Logo"
        className="w-32 h-32 md:w-40 md:h-40 mb-6 animate-bounce"
      />
      <h1 className="text-4xl font-bold text-purple-800 mb-4 animate-fade-in">Welcome to MyApp</h1>
      <button
        onClick={handleLoginClick}
        className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-300"
      >
        Login
      </button>
    </div>
  );
}
