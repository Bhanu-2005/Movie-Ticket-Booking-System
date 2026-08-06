import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[url('/images/image.png')] bg-cover bg-center opacity-80"></div>

      {/* Background styling elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#DC2626] opacity-10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600 opacity-10 blur-[120px]"></div>
      </div>

      {/* Header for auth pages */}
      <header className="p-6 relative z-10">
        <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors w-fit">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </header>

      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;