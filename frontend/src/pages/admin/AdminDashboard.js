import React from "react";
import NavAdmin from "../../components/NavbarAdmin";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-lexend">
      {/* Top: 15% height for Navbar */}
      <header className="h-[10%]">
        <div className="h-full">
          <NavAdmin />
        </div>
      </header>

      {/* Bottom: Admin content */}
      <main className="h-[85%] px-6 py-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
