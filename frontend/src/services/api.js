import axiosInstance from './axiosInstance';

export const userAPI = {
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  },

  submitMentorRegistration: async (data) => {
    const response = await axiosInstance.post('/user/mentorregistration', data);
    return response.data;
  },
};

export default axiosInstance;
