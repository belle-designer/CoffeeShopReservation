import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations', error);
        setReservations([]);
      }
    }
    fetchReservations();
  }, []);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this reservation?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:5000/api/reservations/${id}`, { status: 'declined' });

          const response = await axios.get('http://localhost:5000/api/reservations');
          setReservations(response.data);

          Swal.fire({
            title: 'Cancelled!',
            text: 'Your reservation has been cancelled.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to cancel reservation. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };

  const now = new Date();

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-extrabold text-black mb-8 text-center">MY RESERVATION</h1>

      <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold text-left">
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Phone</th>
              <th className="py-3 px-5">Date & Time</th>
              <th className="py-3 px-5">Guests</th>
              <th className="py-3 px-5">Seating</th>
              <th className="py-3 px-5">Occasion</th>
              <th className="py-3 px-5">Requests</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Timing</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-8 text-gray-500 italic">
                  No reservations found.
                </td>
              </tr>
            ) : (
              reservations.map((r) => {
                const reservationDate = new Date(r.date);
                const isUpcoming = reservationDate > now;

                // Determine timing - normalize status to lowercase for comparison
                const statusLower = r.status.toLowerCase();
                const timing =
                  statusLower === 'declined' || statusLower === 'cancelled'
                    ? 'cancelled'
                    : isUpcoming
                    ? 'Upcoming'
                    : 'Done';

                // Status badge colors (normalize keys lowercase)
                const statusColor = {
                  confirmed: 'bg-blue-100 text-blue-700',
                  pending: 'bg-gray-200 text-black',
                  declined: 'bg-yellow-100 text-yellow-800',
                  cancelled: 'bg-red-100 text-red-700',
                };

                // Timing badge colors
                const timingColorClass = {
                  cancelled: 'bg-red-100 text-red-700',
                  Upcoming: 'bg-black text-white',
                  Done: 'bg-green-100 text-green-700',
                };

                return (
                  <tr key={r.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-3 px-5 whitespace-nowrap">{r.name}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{r.phone}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{reservationDate.toLocaleString()}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{r.guests}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{r.seating}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{r.occasion || 'None'}</td>
                    <td className="py-3 px-5 whitespace-nowrap">{r.request || 'None'}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColor[statusLower] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          timingColorClass[timing] || 'bg-gray-200 text-black'
                        }`}
                      >
                        {timing}
                      </span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      {statusLower === 'pending' ? (
                        <button
                          onClick={() => handleCancel(r.id)}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm focus:outline-none focus:underline"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm select-none cursor-not-allowed">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyReservations;
