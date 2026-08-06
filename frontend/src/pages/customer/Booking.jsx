import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { movieService } from '../../services/movieService';
import { AuthContext } from '../../context/AuthContext';
import SeatLayout from '../../components/booking/SeatLayout';
import BookingSummary from '../../components/booking/BookingSummary';
import toast from 'react-hot-toast';

export default function Booking() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [show, setShow] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dummy booked seats logic since backend might not send seat map on show GET.
  // In a real app, `show.booked_seats` would come from backend.
  const [bookedSeats, setBookedSeats] = useState(['S5', 'S6', 'S15', 'S16']);

  useEffect(() => {
    const fetchShowAndMovie = async () => {
      try {
        setLoading(true);
        const showData = await bookingService.getShowById(showId);
        
        if (showData && showData.data) {
          setShow(showData.data);
          
          // Now fetch the movie details
          const movieData = await movieService.getMovieById(showData.data.movie_id);
          if (movieData && movieData.data) {
            setMovie(movieData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error("Failed to load show details");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchShowAndMovie();
  }, [showId, navigate]);

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      // Limit selection to 10 tickets max
      if (selectedSeats.length >= 10) {
        toast.error("You can only select up to 10 seats at a time");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const totalAmount = selectedSeats.length * show.ticket_price;
      
      const bookingData = {
        show_id: show.id || show._id,
        seats: selectedSeats,
        total_amount: totalAmount,
        user_id: user.id // Usually backend gets this from JWT, but schema requires it? Wait, our schema requires show_id, seats, total_amount for BookingCreate. user_id is injected by auth dependency.
      };

      const response = await bookingService.createBooking({
        show_id: show.id || show._id,
        seats: selectedSeats,
        total_amount: totalAmount
      });
      
      if (response && response.success) {
        toast.success("Seats reserved successfully!");
        // Navigate to payment page with the booking ID
        navigate(`/payment/${response.data.id || response.data._id}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.detail || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Select Seats</h1>
          <p className="text-gray-400 mt-2">Choose your preferred seats for the show.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Seat Layout Area */}
          <div className="flex-grow lg:w-2/3">
            <SeatLayout 
              totalSeats={60} 
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
              bookedSeats={bookedSeats}
            />
          </div>
          
          {/* Sidebar Booking Summary */}
          <div className="w-full lg:w-1/3">
            <BookingSummary 
              movie={movie} 
              show={show} 
              selectedSeats={selectedSeats} 
              onContinue={handleProceedToPayment}
              isLoading={isSubmitting}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
