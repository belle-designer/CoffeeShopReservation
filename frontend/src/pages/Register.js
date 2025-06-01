import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (
    !formData.username.trim() ||
    !formData.email.trim() ||
    !formData.password.trim() ||
    !formData.confirmPassword.trim()
  ) {
    return Swal.fire({
      icon: "error",
      title: "Missing Fields",
      text: "Please fill in all the required fields.",
    });
  }

  if (formData.password !== formData.confirmPassword) {
    return Swal.fire({
      icon: "error",
      title: "Password Mismatch",
      text: "Password and Confirm Password do not match.",
    });
  }

  // Confirmation prompt
  const result = await Swal.fire({
    title: "Create Account?",
    text: "Do you want to proceed with creating this account?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, create it!",
    cancelButtonText: "No, cancel",
  });

  if (result.isConfirmed) {
    // Include formData.role: "client"
const userData = {
  username: formData.username,
  email: formData.email,
  password: formData.password,
  role: "client", // default role
};

try {
  const response = await axios.post("http://localhost:5000/api/register", userData);

  if (response.data.success) {
    Swal.fire({
      icon: "success",
      title: "Account Created",
      text: "You have registered successfully!",
    }).then(() => {
      navigate("/");
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: response.data.message || "Something went wrong.",
    });
  }
} catch (error) {
  Swal.fire({
    icon: "error",
    title: "Server Error",
    text: error.response?.data?.message || "Could not register. Try again later.",
  });
}

  }
};

  return (
    <div className="min-h-screen flex font-lexend">
      {/* Left side */}
      <div className="w-2/5 bg-black text-white flex flex-col justify-center items-center p-12">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-6 max-w-md">
          If you already have an account, you can sign in to your account now.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Sign In
        </button>
      </div>

      {/* Right side */}
      <div className="w-3/5 flex items-center justify-center p-10 bg-white">
        <form onSubmit={handleSubmit} className="max-w-xl w-full">
          <h1 className="text-4xl font-bold mb-2 text-center mb-4 text-black">Register</h1>
          <p className="text-center text-gray-600 mb-5">
            Create your account by filling in the information below. It's quick and easy!
          </p>

          <label className="block mb-1 text-black font-semibold" htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter username"
            className="w-full border border-black rounded-md px-3 py-2 mb-6"
          />

          <label className="block mb-1 text-black font-semibold" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="w-full border border-black rounded-md px-3 py-2 mb-6"
          />

          <label className="block mb-1 text-black font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full border border-black rounded-md px-3 py-2 mb-6"
          />

          <label className="block mb-1 text-black font-semibold" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
            className="w-full border border-black rounded-md px-3 py-2 mb-8"
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-bold rounded-md shadow-[2px_2px_0_black] hover:bg-gray-900 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
