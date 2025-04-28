import api from './api';
import { Course } from '../types';

export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get course by ID
  getCourseById: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Create new course (admin only)
  createCourse: async (courseData: Partial<Course>) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Update course (admin only)
  updateCourse: async (id: string, courseData: Partial<Course>) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  // Delete course (admin only)
  deleteCourse: async (id: string) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Enroll in a course (student only)
  enrollCourse: async (courseId: string) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  // Get enrolled courses (student only)
  getEnrolledCourses: async () => {
    const response = await api.get('/courses/enrolled');
    return response.data;
  },

  // Update course progress (student only)
  updateProgress: async (courseId: string, weekNumber: number) => {
    const response = await api.put(`/courses/${courseId}/progress`, { weekNumber });
    return response.data;
  },

  // Get assigned courses (mentor only)
  getAssignedCourses: async () => {
    const response = await api.get('/courses/assigned');
    return response.data;
  },

  // Upload syllabus PDF (admin & mentor only)
  uploadSyllabus: async (courseId: string, weekNumber: number, file: File) => {
    const formData = new FormData();
    formData.append('syllabusPdf', file);
    
    const response = await api.post(
      `/courses/${courseId}/syllabus/${weekNumber}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};