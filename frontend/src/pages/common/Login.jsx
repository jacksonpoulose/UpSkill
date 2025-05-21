


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice'; // adjust path if needed
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      const loggedInUser = result.payload.user; // safely access user
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      console.error('Login failed:', result.payload || result.error);
      // Optionally, show a toast/error message here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button
            onClick={() => window.location.href = "/signup"}
            className="font-medium text-blue-950 hover:text-blue-500"
          >
            create a new account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-600 text-center">{error}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  onClick={() => window.location.href = "/forgot-password"}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="red"
                size="lg"
                className="w-full text-left bg-red-900 text-white hover:bg-red-900 py-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('Google login')}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('GitHub login')}
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-8 flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </button>
    </div>
  );
};

export default Login;
