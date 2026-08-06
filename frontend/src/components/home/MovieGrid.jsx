import React from 'react';
import MovieCard from './MovieCard';
import { FiLoader } from 'react-icons/fi';

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FiLoader className="animate-spin text-[#DC2626] text-4xl" />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl text-gray-400 font-medium">No movies found matching your criteria.</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {movies.map((movie) => (
        <MovieCard key={movie.id || movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;