import React from 'react';
import Button from '../common/Button';
import { FiTag } from 'react-icons/fi';

const BookingSummary = ({ movie, show, selectedSeats, onContinue, isLoading }) => {
  const pricePerTicket = show?.ticket_price || 0;
  const totalAmount = selectedSeats.length * pricePerTicket;
  
  // Hardcoded taxes and fees for presentation
  const convenienceFee = selectedSeats.length > 0 ? 1.50 * selectedSeats.length : 0;
  const grandTotal = totalAmount + convenienceFee;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Booking Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-[#DC2626] font-semibold">{movie?.title}</h4>
          <p className="text-gray-400 text-sm mt-1">{show?.language || 'English'} • 2D</p>
        </div>
        
        <div className="text-sm text-gray-300">
          <p className="mb-1"><span className="text-gray-500">Date:</span> {show?.show_date}</p>
          <p className="mb-1"><span className="text-gray-500">Time:</span> {show?.show_time}</p>
          <p><span className="text-gray-500">Screen:</span> Screen {show?.screen_id}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-800 border-dashed pt-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-gray-300">
            <span className="font-medium text-white">{selectedSeats.length} Tickets</span>
            {selectedSeats.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{selectedSeats.join(', ')}</p>
            )}
          </div>
          <span className="text-white font-medium">${totalAmount.toFixed(2)}</span>
        </div>
        
        {selectedSeats.length > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2 mt-3">
            <span>Convenience Fee</span>
            <span>${convenienceFee.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      {/* Promo Code section */}
      {selectedSeats.length > 0 && (
        <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg mb-6 border border-gray-700">
          <FiTag className="text-[#DC2626]" />
          <input 
            type="text" 
            placeholder="Apply Promo Code" 
            className="bg-transparent border-none focus:outline-none text-sm text-white w-full"
          />
          <button className="text-[#DC2626] text-sm font-medium hover:text-red-400">Apply</button>
        </div>
      )}

      <div className="border-t border-gray-800 pt-4 mb-6">
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold text-white">Total Amount</span>
          <span className="font-bold text-[#DC2626]">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        onClick={onContinue}
        disabled={selectedSeats.length === 0}
        isLoading={isLoading}
        className="text-lg py-3"
      >
        {selectedSeats.length === 0 ? 'Select Seats to Proceed' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default BookingSummary;
