import api from '../api/axios';

export const bookingService = {
  // Get all shows for a movie
  getShowsByMovie: async (movieId) => {
    // In our backend, we might get all shows and filter, or hit a specific endpoint.
    // Assuming GET /shows/ and we filter on client, or a specific endpoint exists.
    // Based on standard FastAPI setups, let's just get all shows.
    const response = await api.get('/shows/');
    
    // Fallback filter if backend returns all
    if (response.data && response.data.data) {
       const movieShows = response.data.data.filter(show => show.movie_id === movieId);
       // Deduplicate by screen_id, show_date, show_time
       const uniqueShows = [];
       const seen = new Set();
       for (const show of movieShows) {
         const key = `${show.screen_id}-${show.show_date}-${show.show_time}`;
         if (!seen.has(key)) {
           seen.add(key);
           uniqueShows.push(show);
         }
       }
       return uniqueShows;
    }
    return [];
  },

  // Get specific show details
  getShowById: async (showId) => {
    const response = await api.get(`/shows/${showId}`);
    return response.data;
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  },

  // Get user's bookings
  getMyBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  }
};
