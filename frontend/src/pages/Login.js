import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Auto login if stored in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (storedUser) {
      setUsername(storedUser.username);
      setPassword(storedUser.password);
      setRole(storedUser.role);
      handleLogin(null, storedUser); // Simulate login
    }
  }, []);

const handleLogin = async (e, autoUser = null) => {
  if (e) e.preventDefault();
  const currentUser = autoUser || { username, password, role };

  if (!currentUser.username || !currentUser.password) {
    Swal.fire({
      title: 'Missing credentials',
      text: 'Please enter both username and password.',
      icon: 'error',
      confirmButtonColor: '#000',
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/login', currentUser);

    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rememberedUser');
    }

    Swal.fire({
      title: 'Login Successful!',
      text: `Welcome back, ${currentUser.role === 'admin' ? 'Admin' : 'Client'}!`,
      icon: 'success',
      confirmButtonColor: '#000',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    });
  } catch (err) {
    Swal.fire({
      title: 'Login Failed',
      text: err.response?.data?.message || 'Something went wrong.',
      icon: 'error',
      confirmButtonColor: '#000',
    });
  }
};

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="flex h-screen font-lexend bg-white">
      {/* Left Side: Login Form */}
      <div className="w-3/5 flex items-center justify-center">
        <div className="p-10 rounded-xl w-full max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-black mb-8">
            Bean & Brew
          </h2>
          <p className="text-center text-gray-700 mb-8 px-4">
            Welcome to Bean & Brew — your cozy corner for reserving the best coffee experience in town.
            Whether you're a coffee lover or an admin managing reservations, we've got you covered with a simple, fast, and friendly platform.
          </p>

          {/* Role Switch */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-full border border-gray-800 ${
                role === 'client'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => handleRoleSwitch('client')}
            >
              Client
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-full border border-gray-800 ${
                role === 'admin'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => handleRoleSwitch('admin')}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <input
              className="border border-gray-700 p-2 w-full mb-6 rounded text-black placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="border border-gray-700 p-2 w-full mb-6 rounded text-black placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-6 text-sm text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox text-gray-700"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot')}
                className="text-gray-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Register Prompt */}
      <div className="w-2/5 bg-black text-white flex flex-col justify-center items-center p-12">
        <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
        <p className="text-center mb-6 max-w-md">
          Don’t have an account yet? Register now to enjoy the best coffee shop reservation experience in town.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
