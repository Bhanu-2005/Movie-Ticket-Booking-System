import api from '../api/axios';

export const movieService = {
  // Fetch all movies
  getAllMovies: async () => {
    const response = await api.get('/movies/');
    return response.data;
  },

  // Fetch single movie by ID
  getMovieById: async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  // Add new movie (Admin)
  addMovie: async (movieData) => {
    const response = await api.post('/movies/', movieData);
    return response.data;
  },

  // Update existing movie (Admin)
  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  // Delete movie (Admin)
  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  }
};