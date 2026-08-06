import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { movieService } from '../../services/movieService';
import { FiCalendar, FiClock, FiMapPin, FiHash, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Fetch all bookings for the user
        const response = await bookingService.getMyBookings();
        
        if (response && response.data) {
          // Since the booking doesn't inherently contain the movie details in our current schema,
          // we should theoretically fetch the movie for each booking or join in backend.
          // For frontend logic, assuming the backend doesn't hydrate the movie, we will fetch movies here.
          
          const rawBookings = response.data;
          
          // Let's fetch all movies once to map them
          const moviesRes = await movieService.getAllMovies();
          const movies = moviesRes.data || [];
          
          const hydratedBookings = rawBookings.map(booking => {
            // In a real app we need the show details to link to the movie.
            // If booking only has show_id, we'd need to fetch shows too.
            // Assuming booking object has enough data or we mock it slightly for UI layout matching design:
            
            return {
              ...booking,
              status: booking.booking_status || 'CONFIRMED'
            };
          });
          
          setBookings(hydratedBookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load your tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight border-l-4 border-[#DC2626] pl-4">My Tickets</h1>
          <p className="text-gray-400 mt-2 ml-5">View and manage your past and upcoming movie tickets.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <h3 className="text-xl text-white font-bold mb-2">No tickets found</h3>
            <p className="text-gray-400 mb-6">Looks like you haven't booked any movies yet.</p>
            <Link to="/" className="px-6 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-medium rounded-md transition-colors">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id || booking._id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-lg hover:border-gray-600 transition-colors">
                
                {/* Visual Ticket Stub Left Side */}
                <div className="bg-gray-800 p-6 sm:w-1/3 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r border-gray-700 border-dashed relative">
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0F172A]"></div>
                  <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-[#0F172A]"></div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Seats</p>
                    <p className="text-[#DC2626] font-bold text-xl">{booking.seats?.join(', ')}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700 w-full text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total</p>
                    <p className="text-white font-bold">${booking.total_amount}</p>
                  </div>
                </div>

                {/* Ticket Details Right Side */}
                <div className="p-6 sm:w-2/3 relative">
                  {booking.status === 'CONFIRMED' ? (
                    <div className="absolute top-4 right-4 flex items-center text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
                      <FiCheckCircle className="mr-1" /> Confirmed
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 flex items-center text-red-500 text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
                      <FiXCircle className="mr-1" /> Cancelled
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-4 pr-24">Booking Reference</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <FiHash className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Booking ID</p>
                        <p className="text-gray-300 font-mono">{booking.id || booking._id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiCalendar className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Show ID</p>
                        <p className="text-gray-300 font-mono">{booking.show_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
