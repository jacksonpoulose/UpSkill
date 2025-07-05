import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import axiosInstance from "../../services/axiosInstance";
import {
  ArrowLeft,
  BookOpen,
  Users,
  Clock,
  DollarSign,
  Tag,
  Calendar,
  Edit2,
  UserCheck,
  GraduationCap,
  Star,
  PlayCircle,
  Award,
  Globe,
  TrendingUp,
  Eye,
  Download,
  Share2,
  MoreVertical,
  ChevronRight,
  Activity,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/courses/${id}`);
      setCourse(res.data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
      showNotification("error", "Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const handleEditCourse = () => {
    navigate(`/admin/courses/edit/${id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="mr-2 h-4 w-4" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="mr-2 h-4 w-4" />
            Draft
          </span>
        );
      case "removed":
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="mr-2 h-4 w-4" />
            Removed
          </span>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'content', label: 'Content', icon: PlayCircle },
  ];

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
            <p className="text-slate-600 font-medium">Loading course details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Course not found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              The course you're looking for doesn't exist or has been removed from the system.
            </p>
            <Button variant="blue" onClick={() => navigate("/admin/courses")} className="inline-flex items-center">
              <ArrowLeft className="mr-2" size={18} />
              Back to Courses
            </Button>
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/admin/courses")}
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="font-medium">Back to Courses</span>
                </button>
                <div className="h-6 w-px bg-slate-300"></div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
                  <p className="text-slate-600">Detailed course information and analytics</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200">
                  <Eye size={18} />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200">
                  <Share2 size={18} />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200">
                  <MoreVertical size={18} />
                </button>
                <Button variant="blue" onClick={handleEditCourse} className="inline-flex items-center">
                  <Edit2 size={16} className="mr-2" />
                  Edit Course
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      {getStatusBadge(course.status)}
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        <Tag className="h-3 w-3 mr-1.5" />
                        {course.category?.name || "Uncategorized"}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                      {course.title}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      {course.description}
                    </p>
                    
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-600">Duration</p>
                            <p className="text-xl font-bold text-blue-900">{course.durationWeeks}w</p>
                          </div>
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-emerald-600">Students</p>
                            <p className="text-xl font-bold text-emerald-900">{course.studentsEnrolled?.length || 0}</p>
                          </div>
                          <Users className="h-6 w-6 text-emerald-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-600">Mentors</p>
                            <p className="text-xl font-bold text-purple-900">{course.mentorIds?.length || 0}</p>
                          </div>
                          <UserCheck className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-orange-600">Revenue</p>
                            <p className="text-xl font-bold text-orange-900">₹{((course.courseFee || 0) * (course.studentsEnrolled?.length || 0)).toLocaleString()}</p>
                          </div>
                          <TrendingUp className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Image & Quick Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sticky top-32">
                <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-blue-100 to-blue-200">
                  {course.courseImage ? (
                    <img
                      src={`http://localhost:3000/uploads/courses/${course.courseImage}`}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-blue-600" />
                    </div>
                  )}
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-slate-600 mr-1" />
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{course.courseFee?.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">Course Fee</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Created
                    </span>
                    <span className="font-medium text-slate-900">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Status
                    </span>
                    <span className="font-medium text-slate-900 capitalize">
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Completion Rate
                    </span>
                    <span className="font-medium text-emerald-600">
                      85%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 mb-8">
            <div className="border-b border-slate-200">
              <div className="flex space-x-8 px-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Prerequisites
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {course.prerequisites || "No specific prerequisites required"}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                        Learning Outcomes
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {course.learningOutcomes || "Learning outcomes not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Course Analytics</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-blue-900">Enrollment Rate</h4>
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-900 mb-2">78%</div>
                      <p className="text-sm text-blue-700">+12% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-emerald-900">Completion Rate</h4>
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-bold text-emerald-900 mb-2">85%</div>
                      <p className="text-sm text-emerald-700">+5% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-purple-900">Avg. Rating</h4>
                        <Star className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-900 mb-2">4.8</div>
                      <p className="text-sm text-purple-700">Based on 247 reviews</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Enrolled Students</h3>
                    <span className="text-slate-600">{course.studentsEnrolled?.length || 0} total students</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-8 text-center">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Student management interface would be implemented here</p>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Course Content</h3>
                    <Button variant="outline" className="inline-flex items-center">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Manage Content
                    </Button>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-8 text-center">
                    <PlayCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Course content management interface would be implemented here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default CourseDetails;