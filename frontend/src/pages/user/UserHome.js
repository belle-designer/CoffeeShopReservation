import React from "react";
import NavbarUser from "../../components/NavUser";
import { Outlet } from "react-router-dom";

function UserHome() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-50 font-lexend">
      {/* Top: 15% height for Navbar */}
      <header className="h-[10%]">
        <div className="h-full">
          <NavbarUser />
        </div>
      </header>

      {/* Bottom: 85% content area, no scroll */}
      <main className="h-[85%] bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default UserHome;
