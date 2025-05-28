import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetLink } from '../../redux/userSlice'; // Make sure this action exists
import { ArrowLeft } from 'lucide-react';
import Logo from '../../components/common/Logo';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, resetSuccess } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendResetLink({ email }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {resetSuccess && (
              <p className="text-green-600 text-center">
                Reset link sent! Check your email.
              </p>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="red"
                size="lg"
                className="w-full bg-red-900 text-white hover:bg-red-800 py-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </button>
    </div>
  );
};

export default ForgotPassword;
