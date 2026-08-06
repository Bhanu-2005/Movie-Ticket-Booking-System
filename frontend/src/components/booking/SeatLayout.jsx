import React from 'react';
import { MdEventSeat } from 'react-icons/md';

const SeatLayout = ({ totalSeats = 60, selectedSeats, onSeatSelect, bookedSeats = [] }) => {
  // Simple grid of seats: 10 seats per row
  const seatsPerRow = 10;
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const seatMap = Array.from({ length: rows }, (_, rowIndex) => {
    return Array.from({ length: seatsPerRow }, (_, colIndex) => {
      const seatNumber = (rowIndex * seatsPerRow) + colIndex + 1;
      return seatNumber <= totalSeats ? `S${seatNumber}` : null;
    }).filter(Boolean);
  });

  return (
    <div className="w-full bg-[#0F172A]/80 border border-gray-700 rounded-2xl p-6 md:p-10 shadow-xl overflow-x-auto">
      {/* Screen Area */}
      <div className="mb-16 relative w-full max-w-2xl mx-auto">
        <div className="h-3 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.5)]"></div>
        <p className="text-center text-gray-500 text-sm mt-6 tracking-[0.4em] uppercase font-bold">Screen This Way</p>
      </div>

      {/* Seats Grid */}
      <div className="flex flex-col gap-6 min-w-[600px] items-center">
        {seatMap.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-4">
            <div className="w-6 flex items-center justify-center text-gray-500 text-sm font-medium">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            
            <div className="flex gap-3">
              {row.map((seatId) => {
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                let seatColor = "text-gray-600 hover:text-gray-300"; // Available
                if (isBooked) seatColor = "text-gray-800 cursor-not-allowed"; // Booked
                else if (isSelected) seatColor = "text-[#DC2626] drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"; // Selected

                return (
                  <button
                    key={seatId}
                    disabled={isBooked}
                    onClick={() => onSeatSelect(seatId)}
                    className={`transition-all duration-200 transform ${isSelected ? 'scale-110' : 'hover:scale-110'}`}
                    title={seatId}
                  >
                    <MdEventSeat size={32} className={seatColor} />
                  </button>
                );
              })}
            </div>
            
            <div className="w-6 flex items-center justify-center text-gray-500 text-sm font-medium">
              {String.fromCharCode(65 + rowIndex)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-16 flex justify-center gap-10 border-t border-gray-800 pt-8">
        <div className="flex items-center gap-3">
          <MdEventSeat size={24} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-3">
          <MdEventSeat size={24} className="text-[#DC2626]" />
          <span className="text-sm font-medium text-gray-300">Selected</span>
        </div>
        <div className="flex items-center gap-3">
          <MdEventSeat size={24} className="text-gray-800" />
          <span className="text-sm font-medium text-gray-500">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
