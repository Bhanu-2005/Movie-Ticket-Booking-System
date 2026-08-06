import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import Button from '../../components/common/Button';
import { FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../api/axios'; // We need this to fetch booking details since there's no getBookingById in bookingService yet

export default function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Dummy payment methods
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', exp: '', cvv: '' });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        // Assuming your backend has a way to get user bookings. If not, we rely on the state 
        // passed or we fetch from /bookings/ and find ours.
        const res = await api.get('/bookings/my-bookings');
        if (res.data && res.data.data) {
          const found = res.data.data.find(b => (b.id === bookingId || b._id === bookingId));
          if (found) {
            setBooking(found);
          } else {
            // Handle if booking not found
            toast.error("Booking not found");
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error fetching booking for payment:", error);
        toast.error("Failed to load booking details");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const paymentData = {
        booking_id: bookingId,
        payment_method: selectedMethod.toUpperCase(),
        amount: booking.total_amount
      };

      const res = await paymentService.processPayment(paymentData);
      
      if (res && res.success) {
        setPaymentSuccess(true);
        toast.success("Payment successful!");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error(error.response?.data?.detail || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 pt-20">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
          <FiCheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-8">Your payment was successful and your tickets have been booked.</p>
          
          <div className="bg-gray-800 rounded-xl p-4 mb-8 text-left border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Booking ID</p>
            <p className="font-mono text-white mb-4">{bookingId}</p>
            <p className="text-sm text-gray-400 mb-1">Amount Paid</p>
            <p className="text-lg font-bold text-[#DC2626]">${booking?.total_amount}</p>
          </div>
          
          <Link to="/my-bookings">
            <Button>View My Tickets</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Checkout</h1>
          <p className="text-gray-400 mt-2">Complete your payment securely.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Payment Form */}
          <div className="flex-grow bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <FiCreditCard className="mr-3 text-[#DC2626]" /> Payment Method
            </h3>
            
            <div className="flex gap-4 mb-8">
              <button 
                className={`flex-1 py-3 flex justify-center items-center rounded-lg border transition-colors ${selectedMethod === 'card' ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-gray-700 hover:border-gray-500'}`}
                onClick={() => setSelectedMethod('card')}
              >
                <FiCreditCard className={selectedMethod === 'card' ? 'text-[#DC2626] mr-2' : 'text-gray-400 mr-2'} /> 
                <span className={selectedMethod === 'card' ? 'text-white font-medium' : 'text-gray-400'}>Card</span>
              </button>
              <button 
                className={`flex-1 py-3 flex justify-center items-center rounded-lg border transition-colors ${selectedMethod === 'paypal' ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-gray-700 hover:border-gray-500'}`}
                onClick={() => setSelectedMethod('paypal')}
              >
                <FaCcPaypal size={24} className={selectedMethod === 'paypal' ? 'text-[#DC2626] mr-2' : 'text-gray-400 mr-2'} />
                <span className={selectedMethod === 'paypal' ? 'text-white font-medium' : 'text-gray-400'}>PayPal</span>
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              {selectedMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
                    <input type="text" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#DC2626]" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                    <div className="relative">
                      <input type="text" required maxLength="19" className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-3 pr-10 text-white focus:outline-none focus:border-[#DC2626]" placeholder="0000 0000 0000 0000" />
                      <div className="absolute right-3 top-2.5 flex space-x-1 text-gray-400">
                        <FaCcVisa size={20} />
                        <FaCcMastercard size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                      <input type="text" required placeholder="MM/YY" className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#DC2626]" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                      <input type="password" required maxLength="4" placeholder="123" className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#DC2626]" />
                    </div>
                  </div>
                </>
              )}
              
              {selectedMethod === 'paypal' && (
                <div className="p-6 bg-gray-800 rounded-xl text-center border border-gray-700">
                  <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                </div>
              )}

              <div className="pt-6 border-t border-gray-800 mt-8">
                <Button type="submit" isLoading={isProcessing} className="py-4 text-lg">
                  Pay ${booking?.total_amount} Now
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">Order Summary</h3>
              
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-1">Booking Reference</p>
                <p className="font-mono text-white text-sm">{bookingId}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Seats ({booking?.seats?.length || 0})</p>
                <p className="text-white font-medium">{booking?.seats?.join(', ')}</p>
              </div>
              
              <div className="border-t border-gray-800 pt-4 flex justify-between items-center text-xl">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-[#DC2626]">${booking?.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
