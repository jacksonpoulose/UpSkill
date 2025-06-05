// src/pages/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import Button from '../../components/common/Button';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get('token');

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccessMsg(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="large" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset Your Password</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your new password below.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleReset}>
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-red-900 text-white hover:bg-red-800 py-2"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
