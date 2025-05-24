import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import { Plus, Search, MoreVertical, Edit2, Trash2, BookOpen } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    type: 'success',
    message: '',
    isVisible: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/v1/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      showNotification('error', 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    navigate("/admin/courses/add");
  };

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(prev => prev.filter(course => course._id !== id));
      showNotification('success', 'Course deleted successfully');
    } catch (error) {
      console.error("Failed to delete course:", error);
      showNotification('error', 'Failed to delete course');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600">Manage your course catalog</p>
          </div>
          <Button variant="blue" className="flex items-center space-x-2" onClick={handleAddCourse}>
            <Plus size={20} />
            <span>Add Course</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
              <p className="text-gray-500">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map(course => (
                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{course.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {course.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.durationWeeks} weeks
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.studentsEnrolled?.length || 0} enrolled
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.startDate ? format(new Date(course.startDate), 'MMM d, yyyy') : 'Not set'}
                        </div>
                        <div className="text-sm text-gray-500">
                          to {course.endDate ? format(new Date(course.endDate), 'MMM d, yyyy') : 'Not set'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/admin/courses/edit/${course._id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            aria-label="Edit course"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            aria-label="Delete course"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
                            aria-label="More options"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mb-4 text-gray-400">
                <BookOpen size={48} className="mx-auto opacity-40" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "There are no courses added yet. Create your first course!"}
              </p>
              {!searchQuery && (
                <Button
                  variant="blue"
                  className="inline-flex items-center space-x-2"
                  onClick={handleAddCourse}
                >
                  <Plus size={18} />
                  <span>Add Your First Course</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default Courses;
