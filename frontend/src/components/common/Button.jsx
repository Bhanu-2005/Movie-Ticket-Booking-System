import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Button = ({ children, type = 'button', variant = 'primary', isLoading = false, className = '', ...props }) => {
  const baseStyle = "w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "text-white bg-[#DC2626] hover:bg-red-700 focus:ring-[#DC2626] shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]",
    secondary: "text-white bg-gray-700 hover:bg-gray-600 focus:ring-gray-500",
    outline: "text-[#DC2626] bg-transparent border-[#DC2626] hover:bg-[#DC2626] hover:text-white focus:ring-[#DC2626]"
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <FiLoader className="animate-spin text-xl" /> : children}
    </button>
  );
};

export default Button;