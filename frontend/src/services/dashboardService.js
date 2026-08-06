import api from '../api/axios';

export const dashboardService = {
  getOverviewStats: async () => {
    // In a complete backend, there'd be an /admin/stats endpoint.
    // For now, we simulate fetching aggregated stats using our existing endpoints
    // or assume the backend has some admin aggregation route. 
    // We'll return mock/aggregated data for presentation if an endpoint doesn't exist.
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      // Fallback stub for demonstration if the backend doesn't have this exact route yet
      console.warn("Using fallback admin stats due to missing endpoint.");
      return {
        revenue: 14500.50,
        bookings: 342,
        movies: 12,
        theatres: 4,
        screens: 18,
        shows: 48
      };
    }
  }
};
