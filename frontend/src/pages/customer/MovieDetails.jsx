import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import { bookingService } from '../../services/bookingService';
import { FiClock, FiCalendar, FiPlay, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Using Promise.all to fetch both movie and its shows
        const movieRes = await movieService.getMovieById(id);
        if (movieRes && movieRes.data) {
          setMovie(movieRes.data);
        }

        const showsData = await bookingService.getShowsByMovie(id);
        setShows(showsData);
        
      } catch (error) {
        console.error("Failed to load movie details:", error);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link to="/" className="text-[#DC2626] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen pb-20">
      {/* Cinematic Header */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <img 
          src={movie.poster_url || "/images/hero_bg.png"} 
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/hero_bg.png"; }}
          alt={movie.title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 translate-y-20 z-10 flex flex-col md:flex-row gap-8">
          <div className="w-48 h-72 md:w-64 md:h-96 flex-shrink-0 rounded-xl overflow-hidden border-4 border-gray-800 shadow-2xl hidden sm:block">
            <img 
              src={movie.poster_url || "/images/poster_2.png"} 
              onError={(e) => { e.target.onerror = null; e.target.src = "/images/poster_2.png"; }}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-end pb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-sm uppercase tracking-wider">
                {movie.genre}
              </span>
              <span className="px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-sm border border-gray-700">
                {movie.language}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {movie.title}
            </h1>
            <div className="flex items-center text-gray-300 text-sm gap-6 mb-6">
              <div className="flex items-center"><FiClock className="mr-2 text-[#DC2626]" /> {movie.duration} mins</div>
              <div className="flex items-center"><FiCalendar className="mr-2 text-[#DC2626]" /> 2026</div>
              <div className="flex items-center text-yellow-500"><FiStar className="mr-2 fill-current" /> 4.8/5</div>
            </div>
            <p className="text-gray-300 max-w-2xl leading-relaxed">
              {movie.description || "Experience the thrill of the big screen with this spectacular blockbuster."}
            </p>
          </div>
        </div>
      </div>

      {/* spacer for overlapping header */}
      <div className="h-24 md:h-32"></div>

      {/* Shows Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-white border-l-4 border-[#DC2626] pl-4 mb-8">
          Available Shows
        </h2>
        
        {shows.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">No shows currently available for this movie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => (
              <div key={show.id || show._id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Screen {show.screen_id}</h3>
                    <p className="text-sm text-gray-400 mt-1">{show.show_date}</p>
                  </div>
                  <div className="bg-[#DC2626]/10 text-[#DC2626] font-bold px-3 py-1 rounded border border-[#DC2626]/20">
                    {show.show_time}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
                  <div className="text-white font-medium">
                    ${show.ticket_price} <span className="text-gray-500 text-sm font-normal">/ ticket</span>
                  </div>
                  <Link 
                    to={`/book/${show.id || show._id}`}
                    className="px-6 py-2 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-medium rounded transition-colors shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                  >
                    Book Seats
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
