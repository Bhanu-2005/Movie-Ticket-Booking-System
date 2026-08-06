import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-2xl w-full mx-auto -mt-8 z-20">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-4 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for movies, genres, or theaters..."
          className="w-full pl-12 pr-4 py-4 bg-[#1E293B] border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent shadow-xl transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-2 px-6 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-medium rounded-full transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;