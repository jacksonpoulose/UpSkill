import api from './api';
import { User, Mentor } from '../types';

export const userService = {
  // Get all users (admin only)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Get public profile
  getPublicProfile: async (id: string) => {
    const response = await api.get(`/users/${id}/public`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Update profile picture
  updateProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await api.put('/users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Apply to become a mentor
  applyForMentor: async (mentorData: Partial<Mentor>) => {
    const response = await api.post('/users/apply-mentor', mentorData);
    return response.data;
  },

  // Approve mentor application (admin only)
  approveMentor: async (id: string) => {
    const response = await api.put(`/users/${id}/approve-mentor`);
    return response.data;
  },

  // Reject mentor application (admin only)
  rejectMentor: async (id: string) => {
    const response = await api.put(`/users/${id}/reject-mentor`);
    return response.data;
  },
  
  // Get all mentor applications (admin only)
  getMentorApplications: async () => {
    const response = await api.get('/users/mentor-applications');
    return response.data;
  },
};