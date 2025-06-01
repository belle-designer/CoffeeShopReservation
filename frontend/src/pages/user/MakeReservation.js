import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function MakeReservation() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    seating: '',
    occasion: '',
    request: '',
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, date, guests, seating, occasion, request } = form;

    // Validate required fields
    if (!name || !phone || !date || !guests || !seating) {
      Swal.fire({
        title: 'Oops! 🍵',
        text: 'Please complete all required fields before confirming.',
        icon: 'warning',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Reservation',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date & Time:</strong> ${new Date(date).toLocaleString()}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Seating:</strong> ${seating}</p>
        <p><strong>Occasion:</strong> ${occasion || 'None'}</p>
        <p><strong>Requests:</strong> ${request || 'None'}</p>
        <p>Do you want to confirm this reservation?</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#000',
      cancelButtonColor: '#ccc',
    });

if (result.isConfirmed) {
  try {
    // Send reservation data to backend
    await axios.post('http://localhost:5000/api/reservations', form);

    await Swal.fire({
      title: 'Reservation Confirmed! 🎉',
      html: `
        <p>Thanks, <b>${name}</b>!</p>
        <p>Your table for <b>${guests} guest${guests > 1 ? 's' : ''}</b> is booked on <b>${new Date(date).toLocaleString()}</b>.</p>
        <p>Seating: <b>${seating}</b></p>
        <p>Occasion: <b>${occasion || 'None'}</b></p>
        <p>We'll contact you at <b>${phone}</b>.</p>
      `,
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      confirmButtonColor: '#b5651d',
    });

    // Reset form and step
    setForm({
      name: '',
      phone: '',
      date: '',
      guests: '',
      seating: '',
      occasion: '',
      request: '',
    });
    setStep(1);
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Failed to save your reservation. Please try again later.',
      icon: 'error',
    });
  }
}

  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-50">
      <div className="p-8 max-w-4xl w-full bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          MAKE A RESERVATION
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="block font-medium text-black mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-black mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +123 456 7890"
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block font-medium text-black mb-1">Date & Time *</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-black mb-1">Guests *</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Select guests</option>
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium text-black mb-1">Seating Preference *</label>
                <select
                  name="seating"
                  value={form.seating}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Choose seating</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Near Window">Near Window</option>
                </select>
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <div>
                <label className="block font-medium text-black mb-1">Occasion (Optional)</label>
                <select
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">No special occasion</option>
                  <option value="Birthday">Birthday 🎂</option>
                  <option value="Business">Business Meeting 💼</option>
                  <option value="Casual">Casual Hangout ☕</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-black mb-1">Special Requests</label>
                <textarea
                  name="request"
                  value={form.request}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any preferences or allergies?"
                  className="w-full border border-gray-400 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>
            </>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="p-4 border border-gray-300 rounded bg-gray-100 text-sm text-black">
              <h3 className="font-bold mb-4 text-center text-lg">Review Your Details</h3>
              <p><strong>Name:</strong> {form.name || '-'}</p>
              <p><strong>Phone:</strong> {form.phone || '-'}</p>
              <p><strong>Date & Time:</strong> {form.date ? new Date(form.date).toLocaleString() : '-'}</p>
              <p><strong>Guests:</strong> {form.guests || '-'}</p>
              <p><strong>Seating:</strong> {form.seating || '-'}</p>
              <p><strong>Occasion:</strong> {form.occasion || 'None'}</p>
              <p><strong>Special Requests:</strong> {form.request || 'None'}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-black hover:bg-gray-800 text-white px-6 py-2 rounded transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
              >
                Confirm Reservation
              </button>
            )}
          </div>
        </form>

        {/* Step Indicator */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                    step === s
                      ? 'bg-black text-white scale-110 shadow-lg'
                      : 'bg-gray-300 text-gray-700'
                  } transition duration-300`}
                >
                  {s}
                </div>
                {s !== 4 && <div className="w-8 h-1 bg-gray-300 rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeReservation;
