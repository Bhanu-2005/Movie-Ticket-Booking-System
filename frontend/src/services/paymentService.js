import api from '../api/axios';

export const paymentService = {
  // Process payment for a booking
  processPayment: async (paymentData) => {
    // Expected format: { booking_id: string, payment_method: string, amount: float }
    const response = await api.post('/payments/', paymentData);
    return response.data;
  },
  
  // Optional: Verify payment status if needed
  getPaymentStatus: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  }
};
