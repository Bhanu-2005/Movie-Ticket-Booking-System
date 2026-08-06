import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // wait, FaUserCircle is from react-icons/fa
import { FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#DC2626] tracking-tighter">
              CINE<span className="text-white">TIX</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
                <div className="relative group cursor-pointer">
                  <div className="flex items-center space-x-2 bg-gray-800 rounded-full py-1 px-3 border border-gray-700">
                    <FiUser className="text-gray-400" />
                    <span className="text-sm text-gray-200 font-medium">{user.name}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-[#0F172A] border border-gray-700 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Profile
                    </Link>
                    <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      My Bookings
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-gray-800 flex items-center space-x-2">
                      <FiLogOut /> <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-[#DC2626] hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;