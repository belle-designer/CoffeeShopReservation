import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminAuth");

        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/admin/login");
        });
      }
    });
  };

  return (
    <nav className="h-full bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">
        Bean & Brew
      </div>
      <ul className="flex space-x-6 font-medium">
        <li>
          <Link
            to="/admin/dashboard"
            className="hover:text-gray-400 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/reservations"
            className="hover:text-gray-400 transition"
          >
            Reservations
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="hover:text-gray-400 transition"
          >
            Users
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-400 transition"
            aria-label="Logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
