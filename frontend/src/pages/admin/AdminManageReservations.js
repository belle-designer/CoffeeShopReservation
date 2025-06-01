import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const itemsPerPage = 5;

function AdminManageReservation() {
  const [reservations, setReservations] = useState([]);
  const [pages, setPages] = useState({
    pending: 3,
    confirmed: 3,
    declined: 3,
  });

const updateReservationStatus = async (id, status) => {
  try {
    // Send update to backend
    await axios.put(`http://localhost:5000/api/reservations/${id}/status`, {status});

    // Then update frontend state
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status } : res))
    );

    Swal.fire(
      status === "confirmed" ? "Confirmed!" : "Declined",
      `Reservation has been ${status}.`,
      "success"
    );
  } catch (error) {
    console.error("Error updating reservation:", error);
    Swal.fire("Error", "Failed to update reservation status.", "error");
  }
};


  const handleConfirm = (id) => {
    Swal.fire({
      title: "Confirm Reservation?",
      text: "Do you want to confirm this reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, confirm it",
    }).then((result) => {
      if (result.isConfirmed) {
        updateReservationStatus(id, "confirmed");
      }
    });
  };

  const handleDecline = (id) => {
    Swal.fire({
      title: "Decline Reservation?",
      text: "Are you sure you want to decline this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, decline it",
    }).then((result) => {
      if (result.isConfirmed) {
        updateReservationStatus(id, "declined");
      }
    });
  };

  const getFilteredAndSortedReservations = (status) =>
    reservations
      .filter((res) => res.status === status)
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const pendingReservations = getFilteredAndSortedReservations("pending");
  const confirmedReservations = getFilteredAndSortedReservations("confirmed");
  const declinedReservations = getFilteredAndSortedReservations("declined");

  const paginate = (data, currentPage) =>
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/reservations")
    .then((res) => {
      const sortedData = res.data.sort(
        (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
      );
      setReservations(sortedData);
    })
    .catch((error) => {
      console.error("Error fetching reservations:", error);
    });
}, []);


useEffect(() => {
  setPages((prev) => ({
    pending: Math.min(
      prev.pending,
      Math.max(1, Math.ceil(pendingReservations.length / itemsPerPage))
    ),
    confirmed: Math.min(
      prev.confirmed,
      Math.max(1, Math.ceil(confirmedReservations.length / itemsPerPage))
    ),
    declined: Math.min(
      prev.declined,
      Math.max(1, Math.ceil(declinedReservations.length / itemsPerPage))
    ),
  }));
}, [pendingReservations, confirmedReservations, declinedReservations]);


  const renderPagination = (section, data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-end mt-2 space-x-1 text-sm">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPages((prev) => ({ ...prev, [section]: i + 1 }))}
            className={`px-3 py-1 border rounded ${
              pages[section] === i + 1
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  const renderTable = (data, showActions = false, section = "") => {
    const paginatedData = paginate(data, pages[section]);
    return (
      <>
        <table className="w-full table-auto border border-black text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 px-4 border border-black text-center">#</th>
              <th className="py-2 px-4 border border-black text-center">Name</th>
              <th className="py-2 px-4 border border-black text-center">Phone</th>
              <th className="py-2 px-4 border border-black text-center">Date & Time</th>
              <th className="py-2 px-4 border border-black text-center">Guests</th>
              <th className="py-2 px-4 border border-black text-center">Seating</th>
              <th className="py-2 px-4 border border-black text-center">Occasion</th>
              <th className="py-2 px-4 border border-black text-center">Requests</th>
              {showActions && (
                <th className="py-2 px-4 border border-black text-center">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? 9 : 8}
                  className="py-4 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((res, index) => (
                <tr
                  key={res.id}
                  className="border-t border-black hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border border-black text-center">
                    {(pages[section] - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.name}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.phone}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.date}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.guests}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.seating}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.occasion}
                  </td>
                  <td className="py-2 px-4 border border-black text-center">
                    {res.request}
                  </td>
                  {showActions && (
                    <td className="py-2 px-4 border border-black text-center space-x-2">
                      <button
                        onClick={() => handleConfirm(res.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-green-200 text-green-900 transition-colors duration-300"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleDecline(res.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-red-200 text-red-700 transition-colors duration-300"
                      >
                        Decline
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {renderPagination(section, data)}
      </>
    );
  };

  return (
    <div className="min-h-screen p-8 space-y-12 mx-auto text-black bg-white">
      <div>
        <h1 className="text-2xl font-bold mb-4 border-b border-black pb-2 text-center">
          Pending Reservations
        </h1>
        {pendingReservations.length > 0 ? (
          renderTable(pendingReservations, true, "pending")
        ) : (
          <p className="text-center text-gray-500">No pending reservations.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 border-b border-black pb-1 text-center">
          Confirmed Reservations
        </h2>
        {confirmedReservations.length > 0 ? (
          renderTable(confirmedReservations, false, "confirmed")
        ) : (
          <p className="text-center text-gray-500">No confirmed reservations.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 border-b border-black pb-1 text-center">
          Declined Reservations
        </h2>
        {declinedReservations.length > 0 ? (
          renderTable(declinedReservations, false, "declined")
        ) : (
          <p className="text-center text-gray-500">No declined reservations.</p>
        )}
      </div>
    </div>
  );
}

export default AdminManageReservation;
