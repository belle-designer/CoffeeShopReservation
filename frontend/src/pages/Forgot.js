import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm reset action
    const result = await Swal.fire({
      title: "Send Reset Link?",
      text: `Are you sure you want to send a password reset link to ${email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Reset Link Sent",
        text: `A password reset link has been sent to ${email}.`,
      });
      
      // Optionally, clear the email field or navigate
      setEmail("");
      // navigate("/"); // Uncomment if you want to redirect after success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 relative overflow-hidden px-4">
      {/* Blurred decorative circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full filter blur-2xl opacity-30 animate-pulse" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-sm w-full border-2 border-black rounded-xl p-10 shadow-[4px_4px_0_black] bg-white text-center"
      >
        <h1 className="text-3xl font-bold mb-6 text-black">Forgot Password</h1>
        <p className="mb-8 text-black font-light">
          Enter your email address below and we'll send you a reset link.
        </p>

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-black rounded-md px-3 py-2 mb-8 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-bold rounded-md shadow-[2px_2px_0_black] hover:bg-gray-900 transition-colors"
        >
          Send Reset Link
        </button>

        {/* Back to Sign In */}
        <div className="mt-6 text-sm text-black">
          <p>Remembered your password?</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-2 underline text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
