import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCog,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  TrendingUp,
  Users2,
  GraduationCap
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen /> },
    { id: 'students', label: 'Students', icon: <Users /> },
    { id: 'mentors', label: 'Mentors', icon: <UserCog /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Student Enrollments',
        data: [65, 78, 90, 85, 99, 105],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const courseCompletionData = {
    labels: ['Web Dev', 'Data Science', 'AI/ML', 'Mobile Dev'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [75, 68, 82, 71],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
      },
    ],
  };

  const stats = [
    { label: 'Total Students', value: '2,845', icon: <Users2 />, trend: '+12%' },
    { label: 'Active Courses', value: '48', icon: <BookOpen />, trend: '+5%' },
    { label: 'Total Revenue', value: '$124,592', icon: <BarChart3 />, trend: '+18%' },
    { label: 'Course Completion', value: '74%', icon: <TrendingUp />, trend: '+7%' },
  ];

  const recentCourses = [
    { name: 'Advanced React Development', students: 156, rating: 4.8 },
    { name: 'Data Science Fundamentals', students: 142, rating: 4.7 },
    { name: 'Machine Learning Basics', students: 128, rating: 4.9 },
    { name: 'Python for Beginners', students: 198, rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Upskill Admin</span>
          </div>
        </div>
        <nav className="p-4">
  {sidebarItems.map((item) => (
    item.id === 'courses' ? (
      <Link
        key={item.id}
        to="/admin-dashboard/courses"
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
          currentSection === item.id
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    ) : (
      <button
        key={item.id}
        onClick={() => setCurrentSection(item.id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
          currentSection === item.id
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    )
  ))}
</nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Admin"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-gray-700">Admin User</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {React.cloneElement(stat.icon, { className: 'h-6 w-6 text-blue-600' })}
                  </div>
                  <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Student Enrollment Trend</h3>
              <Line data={enrollmentData} options={{ responsive: true }} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Course Completion Rates</h3>
              <Bar data={courseCompletionData} options={{ responsive: true }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Courses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Course Name</th>
                      <th className="text-left py-3 px-4">Enrolled Students</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCourses.map((course, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{course.name}</td>
                        <td className="py-3 px-4">{course.students}</td>
                        <td className="py-3 px-4">⭐ {course.rating}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
