import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Users } from 'lucide-react';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/admin/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to fetch courses', err));
  }, []);

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Our Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course._id} className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{course.description}</p>
            <div className="flex items-center text-gray-700 text-sm space-x-4 mb-2">
              <span className="flex items-center"><Calendar size={16} className="mr-1" /> {course.durationWeeks} weeks</span>
              <span className="flex items-center"><Users size={16} className="mr-1" /> {course.studentsEnrolled?.length || 0} students</span>
            </div>
            <p className="text-xs text-gray-500">Starts: {course.startDate?.substring(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
