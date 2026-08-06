import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiStar } from 'react-icons/fi';

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-gray-900 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#DC2626]/20">
      {/* Poster */}
      <div className="aspect-[2/3] w-full overflow-hidden relative">
        <img 
          src={movie.poster_url || "/images/poster_1.png"} 
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/poster_1.png"; }}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
        
        {/* Overlay Content (Always visible at bottom) */}
        <div className="absolute bottom-0 w-full p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold px-2 py-1 bg-[#DC2626] text-white rounded-md uppercase">
              {movie.genre}
            </span>
            <div className="flex items-center text-yellow-500 text-sm font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
              <FiStar className="mr-1 fill-current" /> 4.8
            </div>
          </div>
        </div>
      </div>

      {/* Details below poster */}
      <div className="p-4 bg-gray-900">
        <h3 className="text-lg font-bold text-white truncate" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center text-sm text-gray-400 mt-2">
          <FiClock className="mr-1.5" />
          <span>{movie.duration} mins</span>
          <span className="mx-2">•</span>
          <span>{movie.language}</span>
        </div>
        
        {/* Hidden button that slides up on hover */}
        <div className="mt-4 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            to={`/movies/${movie.id || movie._id}`} 
            className="block w-full py-2 bg-[#DC2626] hover:bg-red-700 text-white text-center font-medium rounded-md transition-colors"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;