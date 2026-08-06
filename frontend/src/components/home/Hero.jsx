import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlayCircle, FiInfo } from 'react-icons/fi';

const Hero = ({ featuredMovie }) => {
  if (!featuredMovie) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={featuredMovie.poster_url || "/images/hero_bg.png"} 
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/hero_bg.png"; }}
          alt={featuredMovie.title} 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-[#0F172A]/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
        <div className="max-w-2xl space-y-6 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-sm uppercase tracking-wider">
              Featured
            </span>
            <span className="text-gray-300 text-sm font-medium">{featuredMovie.genre}</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-300 text-sm font-medium">{featuredMovie.duration} mins</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            {featuredMovie.title}
          </h1>
          
          <p className="text-lg text-gray-300 line-clamp-3">
            {featuredMovie.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              to={`/movies/${featuredMovie.id}`} 
              className="flex items-center justify-center px-8 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-semibold rounded-md transition-all duration-200 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105"
            >
              <FiPlayCircle className="mr-2" size={20} />
              Book Tickets
            </Link>
            <Link 
              to={`/movies/${featuredMovie.id}`} 
              className="flex items-center justify-center px-8 py-3 bg-gray-800/80 hover:bg-gray-700 text-white font-semibold rounded-md backdrop-blur-sm border border-gray-700 transition-all duration-200 hover:scale-105"
            >
              <FiInfo className="mr-2" size={20} />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;