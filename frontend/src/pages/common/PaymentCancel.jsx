import React from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Cancelled</h2>
        <p className="text-gray-700 mb-6">Your payment was not completed. You can try again.</p>
        <button
          onClick={() => navigate('/student/register')}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
        >
          Back to Registration
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
