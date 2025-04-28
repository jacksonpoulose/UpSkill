import api from './api';

export const paymentService = {
  // Create Razorpay order
  createOrder: async (courseId: string) => {
    const response = await api.post('/payments/create-order', { courseId });
    return response.data;
  },

  // Verify Razorpay payment
  verifyPayment: async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    courseId: string;
    amount: number;
  }) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async () => {
    const response = await api.get('/payments/history');
    return response.data;
  },
};