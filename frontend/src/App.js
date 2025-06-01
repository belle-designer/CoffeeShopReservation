// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";     // <-- Import Register
import Forgot from "./pages/Forgot";         // <-- Import Forgot

// User Layout & Pages
import UserHome from "./pages/user/UserHome";
import MakeReservation from "./pages/user/MakeReservation";
import MyReservations from "./pages/user/MyReservations";
import Profile from "./pages/user/Profile";
import WelcomeUser from "./pages/user/WelcomeUser"; // You can create this as a home greeting

// Admin Layout & Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageReservations from "./pages/admin/AdminManageReservations";
import AdminManageUsers from "./pages/admin/AdminManageUsers";
import WelcomeAdmin from "./pages/admin/WelcomeAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Initial route - Login */}
        <Route path="/" element={<Login />} />

        {/* Register and Forgot Password Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* USER ROUTES */}
        <Route path="/user" element={<UserHome />}>
          <Route path="home" element={<WelcomeUser />} />
          <Route path="reservations/new" element={<MakeReservation />} />
          <Route path="reservations" element={<MyReservations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/user/home" replace />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<WelcomeAdmin />} />
          <Route path="reservations" element={<AdminManageReservations />} />
          <Route path="users" element={<AdminManageUsers />} />
        </Route>

        {/* Catch-all redirect to Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
