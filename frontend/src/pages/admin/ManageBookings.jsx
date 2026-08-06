import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { FiDollarSign } from 'react-icons/fi';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsFetching(true);
      const res = await adminService.getAllBookings();
      setBookings(res.data || []);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
          <FiDollarSign className="mr-3 text-[#DC2626]" /> System Bookings
        </h1>
        <p className="text-gray-400 mt-2">View all tickets booked across the system.</p>
      </div>

      <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
        {isFetching ? (
          <p className="text-gray-400">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-800/80 text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">ID</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Show ID</th>
                  <th className="px-6 py-4">Seats</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-lg text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id || b._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{b.id || b._id}</td>
                    <td className="px-6 py-4">{b.user_id}</td>
                    <td className="px-6 py-4">{b.show_id}</td>
                    <td className="px-6 py-4">{b.seats?.join(', ') || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-green-900/50 text-green-400">
                        {b.booking_status || 'CONFIRMED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-white">${b.total_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 italic">No bookings found in the system yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
