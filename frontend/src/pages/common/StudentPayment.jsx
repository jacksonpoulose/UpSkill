import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Loader2 } from 'lucide-react';

const StudentPayment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleStripeRedirect = async () => {
    try {
      const response = await axiosInstance.post('/user/create-payment-intent');
      const { url } = response.data;

      if (url) {
        window.location.href = url; // 🔁 Redirect to Stripe Checkout page
      } else {
        setError('No Stripe Checkout URL received.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleStripeRedirect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
        {loading ? (
          <div className="text-blue-600 flex items-center justify-center">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            Redirecting to Stripe Checkout...
          </div>
        ) : error ? (
          <div className="text-red-600 font-semibold">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentPayment;
