import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavUser() {
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
        localStorage.removeItem("rememberedUser");

        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <nav className="h-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">
        Bean & Brew
      </div>

      <ul className="flex space-x-6 font-medium">
        <li>
          <Link to="/user/home" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/user/reservations/new" className="hover:text-gray-400 transition">
            Make Reservation
          </Link>
        </li>
        <li>
          <Link to="/user/reservations" className="hover:text-gray-400 transition">
            My Reservations
          </Link>
        </li>
        <li>
          <Link to="/user/profile" className="hover:text-gray-400 transition">
            Profile
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

export default NavUser;
