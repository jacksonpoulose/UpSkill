import React from 'react';
import { BookOpen, Calendar, Users, DollarSign } from 'lucide-react';

const CoursesPage = () => {
  const courses = [
    {
      name: 'Advanced React Development',
      addedDate: '2025-04-01',
      students: 156,
      fee: 299,
    },
    {
      name: 'Data Science Fundamentals',
      addedDate: '2025-03-18',
      students: 142,
      fee: 399,
    },
    {
      name: 'Machine Learning Basics',
      addedDate: '2025-02-25',
      students: 128,
      fee: 449,
    },
    {
      name: 'Python for Beginners',
      addedDate: '2025-01-10',
      students: 198,
      fee: 199,
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                <span><span className="font-medium text-gray-800">Added Date:</span> {course.addedDate}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2 text-green-500" />
                <span><span className="font-medium text-gray-800">Students:</span> {course.students}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
                <span><span className="font-medium text-gray-800">Fee:</span> ${course.fee}</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
