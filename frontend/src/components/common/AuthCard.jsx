import React from 'react';
import { Link } from 'react-router-dom';

const AuthCard = ({ title, subtitle, children, bottomText, bottomLinkText, bottomLinkTo }) => {
  return (
    <div className="w-full max-w-md w-full space-y-8 p-10 bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative inner glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#DC2626]/50 to-transparent"></div>
      
      <div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8">
        {children}
      </div>

      {(bottomText || bottomLinkText) && (
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">{bottomText} </span>
          <Link to={bottomLinkTo} className="font-medium text-[#DC2626] hover:text-red-400 transition-colors">
            {bottomLinkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthCard;