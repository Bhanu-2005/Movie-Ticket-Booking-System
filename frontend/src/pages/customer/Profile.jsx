import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { FiUser, FiMail, FiShield, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-[#0F172A] min-h-screen pb-20 pt-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#DC2626] to-red-900 relative">
            <div className="absolute -bottom-12 left-8 w-24 h-24 bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center text-4xl text-gray-400">
              {user.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-16 p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400 mt-1 flex items-center">
                  <FiMail className="mr-2" /> {user.email}
                </p>
              </div>
              <span className="px-3 py-1 bg-gray-800 text-[#DC2626] text-xs font-bold rounded uppercase tracking-wider border border-gray-700 flex items-center">
                <FiShield className="mr-2" /> {user.role || 'User'}
              </span>
            </div>
            
            <div className="border-t border-gray-800 pt-8 mt-4 space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-500 text-xs uppercase mb-1">Full Name</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-500 text-xs uppercase mb-1">Email Address</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-500 text-xs uppercase mb-1">Phone Number</p>
                  <p className="text-white font-medium">{user.phone || 'Not provided'}</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-500 text-xs uppercase mb-1">Account Role</p>
                  <p className="text-white font-medium capitalize">{user.role || 'User'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 mt-8 flex justify-end">
              <button 
                onClick={handleLogout}
                className="flex items-center px-6 py-3 bg-transparent hover:bg-gray-800 text-[#DC2626] font-medium rounded-md border border-[#DC2626] transition-colors"
              >
                <FiLogOut className="mr-2" /> Sign Out
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
