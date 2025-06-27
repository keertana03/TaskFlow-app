import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const storedUser = storedUsers.find(user => user.email === email && user.password === password);

  if (storedUser) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", storedUser.email);  // ✅ THIS is the line you need
    navigate('/dashboard');
  } else {
    alert('Invalid email or password');
  }
};


  const handleForgotPassword = () => {
    alert("A password reset link has been sent to your email (not really, this is just a demo💌)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none pr-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-4 text-sm text-purple-600 hover:underline focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <span
              onClick={handleForgotPassword}
              className="text-sm text-purple-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-purple-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
