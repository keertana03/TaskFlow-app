import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
  e.preventDefault();

  const newUser = { name, email, password };
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Optional: check for duplicates
  const alreadyExists = existingUsers.some(user => user.email === email);
  if (alreadyExists) {
    alert('Email already registered. Please log in.');
    return;
  }

  existingUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  alert("Registration successful!");
  navigate('/login');
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
