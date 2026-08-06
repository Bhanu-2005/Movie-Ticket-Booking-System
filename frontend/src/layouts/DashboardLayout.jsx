import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/dashboard/Sidebar'; // We will create this in the dashboard module

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-grow pt-16 h-[calc(100vh-64px)]">
        {/* Sidebar for admin navigation */}
        <div className="hidden md:block w-64 flex-shrink-0 bg-gray-900 border-r border-gray-800">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto bg-[#0F172A] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
