import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiFilm, FiMonitor, FiVideo, FiDollarSign } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="h-full py-6 flex flex-col">
      <div className="px-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Admin Menu</h2>
      </div>
      <nav className="flex-1 space-y-1">
        <Link to="/dashboard" className="flex items-center px-6 py-3 text-sm font-medium text-white bg-gray-800 border-l-4 border-[#DC2626]">
          <FiHome className="mr-3 text-gray-400" size={18} /> Overview
        </Link>
        <Link to="/dashboard/movies" className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-gray-600 transition-colors">
          <FiFilm className="mr-3 text-gray-400" size={18} /> Movies
        </Link>
        <Link to="/dashboard/theaters" className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-gray-600 transition-colors">
          <FiMonitor className="mr-3 text-gray-400" size={18} /> Theaters
        </Link>
        <Link to="/dashboard/shows" className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-gray-600 transition-colors">
          <FiVideo className="mr-3 text-gray-400" size={18} /> Shows
        </Link>
        <Link to="/dashboard/bookings" className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-gray-600 transition-colors">
          <FiDollarSign className="mr-3 text-gray-400" size={18} /> Bookings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
