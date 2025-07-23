import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Edit2, 
  BookOpen, 
  Eye, 
  Filter,
  Grid3X3,
  List,
  Users,
  Clock,
  DollarSign,
  Tag,
  TrendingUp,
  Award,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Star,
  UserCheck,
  GraduationCap,
  Activity
} from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import axiosInstance from "../../services/axiosInstance";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'published', 'draft', 'removed'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isVisible: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [statusToUpdate, setStatusToUpdate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      showNotification("error", "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    navigate("/admin/courses/add");
  };

  const showNotification = (type, message) => {
    setNotification({ type, message, isVisible: true });
  };

  const openStatusModal = (id, title, status) => {
    setSelectedCourseId(id);
    setSelectedCourseTitle(title);
    setStatusToUpdate(status);
    setIsModalOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/admin/courses/${selectedCourseId}/status`,
        { status: statusToUpdate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCourses();
      showNotification("success", `Course status updated to ${statusToUpdate}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      showNotification("error", "Failed to update course status");
    } finally {
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="mr-2 h-4 w-4" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="mr-2 h-4 w-4" />
            Draft
          </span>
        );
      case "removed":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="mr-2 h-4 w-4" />
            Removed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category?.name === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: courses.length,
    published: courses.filter(course => course.status === 'published').length,
    draft: courses.filter(course => course.status === 'draft').length,
    removed: courses.filter(course => course.status === 'removed').length,
    totalStudents: courses.reduce((sum, course) => sum + (course.studentsEnrolled?.length || 0), 0),
    totalRevenue: courses.reduce((sum, course) => sum + ((course.courseFee || 0) * (course.studentsEnrolled?.length || 0)), 0)
  };

  const uniqueCategories = [...new Set(courses.map(course => course.category?.name).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto flex justify-center items-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mb-6"></div>
              <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 animate-ping"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading courses...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
                <p className="text-slate-600">Manage your complete course catalog and analytics</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'table' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
                <Button
                  variant="blue"
                  className="inline-flex items-center"
                  onClick={handleAddCourse}
                >
                  <Plus size={18} className="mr-2" />
                  Add Course
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Courses</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-xs text-slate-500 mt-1">All courses</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Published</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
                  <p className="text-xs text-slate-500 mt-1">Live courses</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Students</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Enrolled students</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-orange-600">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Course earnings</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 mb-8">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses by title..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 min-w-[140px]"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="removed">Removed</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 min-w-[140px]"
                    >
                      <option value="all">All Categories</option>
                      {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            {filteredCourses.length > 0 ? (
              viewMode === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {filteredCourses.map((course) => (
                        <tr key={course._id} className="hover:bg-slate-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {course.courseImage ? (
                                <img
                                  src={`http://localhost:3000/uploads/courses/${course.courseImage}`}
                                  alt={course.title}
                                  className="h-12 w-12 rounded-xl object-cover shadow-md"
                                />
                              ) : (
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-blue-600" />
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-slate-900 line-clamp-1">{course.title}</div>
                                <div className="text-xs text-slate-500 line-clamp-1">{course.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {course.category?.name || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-slate-400" />
                              {course.durationWeeks}w
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-slate-400" />
                              {course.studentsEnrolled?.length || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            ₹{course.courseFee.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={course.status}
                              onChange={(e) => openStatusModal(course._id, course.title, e.target.value)}
                              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                              <option value="removed">Removed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/admin/courses/edit/${course._id}`}
                                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                              >
                                <Edit2 size={16} />
                              </Link>
                              <Link
                                to={`/admin/courses/view/${course._id}`}
                                className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                              >
                                <Eye size={16} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <div key={course._id} className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                          {course.courseImage ? (
                            <img
                              src={`http://localhost:3000/uploads/courses/${course.courseImage}`}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-blue-600" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            {getStatusBadge(course.status)}
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-600 hover:text-slate-900">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                {course.title}
                              </h3>
                              <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                                {course.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                              {course.category?.name || "Uncategorized"}
                            </span>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {course.durationWeeks}w
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {course.studentsEnrolled?.length || 0}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-slate-900">
                              ₹{course.courseFee?.toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/admin/courses/edit/${course._id}`}
                                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                              >
                                <Edit2 size={14} />
                              </Link>
                              <Link
                                to={`/admin/courses/view/${course._id}`}
                                className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                              >
                                <Eye size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' ? (
                    <Search size={32} className="text-slate-400" />
                  ) : (
                    <BookOpen size={32} className="text-slate-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' ? 'No courses found' : 'No courses yet'}
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? `No courses match your current search and filter criteria.`
                    : "Start building your course catalog by creating your first course."}
                </p>
                {(!searchQuery && statusFilter === 'all' && categoryFilter === 'all') && (
                  <Button
                    variant="blue"
                    className="inline-flex items-center"
                    onClick={handleAddCourse}
                  >
                    <Plus size={18} className="mr-2" />
                    Create Your First Course
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification((prev) => ({ ...prev, isVisible: false }))}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Change Course Status"
        message={`Are you sure you want to change the status to "${statusToUpdate}"?`}
        itemName={selectedCourseTitle}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={confirmStatusChange}
        onCancel={() => setIsModalOpen(false)}
        variant="info"
      />
    </div>
  );
};

export default Courses;