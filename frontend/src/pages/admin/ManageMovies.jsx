import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { movieService } from '../../services/movieService';
import Button from '../../components/common/Button';
import { FiFilm, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await movieService.getAllMovies();
      setMovies(res.data || []);
    } catch (error) {
      toast.error('Failed to load movies');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }
    try {
      await movieService.deleteMovie(id);
      toast.success('Movie deleted successfully');
      fetchMovies();
    } catch (error) {
      toast.error('Failed to delete movie');
      console.error(error);
    }
  };

  return (
    <div className="pb-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
            <FiFilm className="mr-3 text-[#DC2626]" /> Manage Movies
          </h1>
          <p className="text-gray-400 mt-2">View, edit, or delete existing movies in the system.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/movies/add')} className="flex items-center">
          <FiPlus className="mr-2" /> Add New Movie
        </Button>
      </div>

      <div className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
          </div>
        ) : movies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-4 rounded-tl-lg">Title</th>
                  <th scope="col" className="px-6 py-4">Genre</th>
                  <th scope="col" className="px-6 py-4">Language</th>
                  <th scope="col" className="px-6 py-4">Duration</th>
                  <th scope="col" className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {movies.map((movie) => (
                  <tr key={movie.id || movie._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {movie.title}
                    </td>
                    <td className="px-6 py-4">
                      {movie.genre}
                    </td>
                    <td className="px-6 py-4">
                      {movie.language}
                    </td>
                    <td className="px-6 py-4">
                      {movie.duration || movie.duration_minutes} mins
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link 
                          to={`/dashboard/movies/edit/${movie.id || movie._id}`}
                          className="text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 p-2 rounded transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(movie.id || movie._id)}
                          className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 p-2 rounded transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiFilm className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-6">Get started by adding your first movie to the system.</p>
            <Button onClick={() => navigate('/dashboard/movies/add')}>
              Add Movie
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
