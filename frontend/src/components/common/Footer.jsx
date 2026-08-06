import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-gray-800 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-bold text-[#DC2626] tracking-tighter mb-4 inline-block">
            CINE<span className="text-white">TIX</span>
          </Link>
          <p className="text-sm mt-2 max-w-sm">
            Experience the magic of cinema. Book tickets for the latest blockbusters in theaters near you with our premium booking experience.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#DC2626] transition-colors">Home</Link></li>
            <li><Link to="/movies" className="hover:text-[#DC2626] transition-colors">Movies</Link></li>
            <li><Link to="/theaters" className="hover:text-[#DC2626] transition-colors">Theaters</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#DC2626] transition-colors"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-[#DC2626] transition-colors"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-[#DC2626] transition-colors"><FiInstagram size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} CineTix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;