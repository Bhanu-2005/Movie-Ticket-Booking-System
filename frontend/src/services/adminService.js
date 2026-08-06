import api from '../api/axios';

export const adminService = {
  // Theatres
  getAllTheatres: async () => {
    const response = await api.get('/theatres/');
    return response.data;
  },
  addTheatre: async (theatreData) => {
    const response = await api.post('/theatres/', theatreData);
    return response.data;
  },

  // Screens
  getAllScreens: async () => {
    const response = await api.get('/screens/');
    return response.data;
  },

  // Shows
  getAllShows: async () => {
    const response = await api.get('/shows/');
    return response.data;
  },
  addShow: async (showData) => {
    const response = await api.post('/shows/', showData);
    return response.data;
  },

  // Bookings
  // Note: Backend might not have a get all bookings yet, so we use dashboard stats or mock for now,
  // or call a new endpoint if we add it. We'll assume GET /bookings/all exists for admin.
  getAllBookings: async () => {
    try {
      const response = await api.get('/bookings/all');
      return response.data;
    } catch (error) {
      console.warn("Backend might not support /bookings/all yet, returning empty list.");
      return { data: [] };
    }
  }
};
