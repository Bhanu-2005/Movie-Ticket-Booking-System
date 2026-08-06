import React, { useState, useEffect } from 'react';
import Hero from '../../components/home/Hero';
import SearchBar from '../../components/home/SearchBar';
import CategoryFilter from '../../components/home/CategoryFilter';
import MovieGrid from '../../components/home/MovieGrid';
import { movieService } from '../../services/movieService';
import toast from 'react-hot-toast';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await movieService.getAllMovies();
      if (response && response.data) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      toast.error("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter movies based on search term and selected category
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || 
                            movie.genre.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Just using the first movie as featured for now (could be randomized or a specific flag)
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  return (
    <div className="bg-[#0F172A] min-h-screen pb-20">
      <Hero featuredMovie={featuredMovie} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white border-l-4 border-[#DC2626] pl-4">Now Showing</h2>
          </div>
          
          <MovieGrid movies={filteredMovies} loading={loading} />
        </div>
      </div>
    </div>
  );
}
