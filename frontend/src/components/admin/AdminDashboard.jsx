import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/userSlice"; // Import logout action
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get the user from Redux store
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch users from API on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Add token to auth header
          },
        });
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login"; // Redirect to login page after logout
  };

  // Handle user deletion (this is just a basic example)
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from the list
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 text-white p-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 mt-2"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
