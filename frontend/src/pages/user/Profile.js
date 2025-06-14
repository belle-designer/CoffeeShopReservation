import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dexter Ochavillo',
    email: 'dexterrochavilloo@gmail.com',
    phone: '09668932298',
    address: 'Blk 11 Lot 64 Phase 1 Extension',
    profileImage: '',
  });

  const [reservationCount, setReservationCount] = useState(0);

  const getMembership = (count) => {
    if (count >= 30) return 'Diamond';
    if (count >= 20) return 'Emerald';
    if (count >= 15) return 'Painite';
    if (count >= 10) return 'Taaffeite';
    if (count >= 5) return 'Musgravite';
    return 'No Membership';
  };

  const membership = getMembership(reservationCount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfile((prev) => ({
      ...prev,
      profileImage: '',
    }));
  };

  const toggleEdit = () => {
    if (editing) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedCount = localStorage.getItem('reservationCount');
    if (savedCount) {
      setReservationCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    const fetchReservationCount = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reservations/count');
        setReservationCount(res.data.count);
        localStorage.setItem('reservationCount', res.data.count);
      } catch (err) {
        console.error('Error fetching reservation count:', err);
      }
    };

    fetchReservationCount();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 flex flex-col min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
        MY PROFILE
      </h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-8">
        {/* Profile Picture & Name */}
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-300 shadow-md flex items-center justify-center bg-indigo-50">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-indigo-300 text-sm font-semibold">No Image</div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="mt-1 text-indigo-600 font-semibold">{membership}</p>
          </div>
        </div>

        {/* Profile Picture Upload & Remove */}
        {editing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-100 file:text-indigo-700
                hover:file:bg-indigo-200
                focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {profile.profileImage && (
              <button
                onClick={handleRemoveImage}
                className="mt-2 text-red-600 text-sm font-medium hover:underline focus:outline-none"
              >
                Remove Profile Picture
              </button>
            )}
          </div>
        )}

        {/* Other Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{profile.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            {editing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            ) : (
              <p className="text-gray-900">{profile.phone || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            {editing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            ) : (
              <p className="text-gray-900">{profile.address || '-'}</p>
            )}
          </div>
        </div>

        {/* Reservation Count */}
        {!editing && (
          <p className="text-gray-600 text-sm text-center mt-2">
            Total Reservations Made: <strong>{reservationCount}</strong>
          </p>
        )}

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleEdit}
            className={`px-6 py-3 rounded-xl font-semibold tracking-wide shadow-md transition
              ${
                editing
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
          >
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
