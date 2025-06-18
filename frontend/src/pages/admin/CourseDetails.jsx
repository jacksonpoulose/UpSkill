import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import axiosInstance from "../../api/axiosInstance";
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Clock, 
  DollarSign, 
  Tag, 
  Calendar,
  CheckCircle,
  XCircle,
  Edit2,
  Eye,
  UserCheck,
  GraduationCap
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
              <p className="text-gray-500">Loading course details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mb-4 text-gray-400">
              <BookOpen size={48} className="mx-auto opacity-40" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Course not found
            </h3>
            <p className="text-gray-500 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button
              variant="blue"
              onClick={() => navigate("/admin/courses")}
              className="inline-flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Courses</span>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Details</h1>
            <p className="text-gray-600">View and manage course information</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Courses</span>
            </Button>
            <Button
              variant="blue"
              onClick={handleEditCourse}
              className="flex items-center space-x-2"
            >
              <Edit2 size={18} />
              <span>Edit Course</span>
            </Button>
          </div>
        </div>

        {/* Course Overview Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {/* Course Image */}
              <div className="flex-shrink-0">
                {course.courseImage ? (
                  <img
                    src={`http://localhost:3000/uploads/courses/${course.courseImage}`}
                    alt={course.title}
                    className="w-32 h-32 rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center shadow-md">
                    <BookOpen className="text-blue-600 w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {course.isPublished ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle size={16} className="mr-1" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <XCircle size={16} className="mr-1" />
                        Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          Category
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {course.category?.name || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">
                          Duration
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {course.durationWeeks} week{course.durationWeeks !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                          Course Fee
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{course.courseFee?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                      <div>
                        <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                          Created
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentors Card */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <UserCheck className="h-5 w-5 text-blue-600 mr-2" />
                  Assigned Mentors
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {course.mentorIds?.length || 0} mentor{course.mentorIds?.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {course.mentorIds && course.mentorIds.length > 0 ? (
                <div className="space-y-3">
                  {course.mentorIds.map((mentor, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Mentor {index + 1}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {mentor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm">No mentors assigned yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Assign mentors to help students with this course
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Students Card */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="h-5 w-5 text-green-600 mr-2" />
                  Enrolled Students
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {course.studentsEnrolled?.length || 0} student{course.studentsEnrolled?.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {course.studentsEnrolled && course.studentsEnrolled.length > 0 ? (
                <div className="space-y-3">
                  {course.studentsEnrolled.slice(0, 5).map((student, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Student {index + 1}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {student}
                        </p>
                      </div>
                    </div>
                  ))}
                  {course.studentsEnrolled.length > 5 && (
                    <div className="text-center py-2">
                      <p className="text-xs text-gray-500">
                        +{course.studentsEnrolled.length - 5} more students
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm">No students enrolled yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Students will appear here once they enroll
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Content/Modules Section (if available) */}
        {course.modules && course.modules.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                Course Modules
              </h3>
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">
                      Module {index + 1}: {module.title || `Module ${index + 1}`}
                    </h4>
                    {module.description && (
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Course Information */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Course Prerequisites</h4>
                <p className="text-sm text-gray-600">
                  {course.prerequisites || "No specific prerequisites required"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Outcomes</h4>
                <p className="text-sm text-gray-600">
                  {course.learningOutcomes || "Learning outcomes not specified"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Last Updated</h4>
                <p className="text-sm text-gray-600">
                  {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Course Level</h4>
                <p className="text-sm text-gray-600">
                  {course.level || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
    </div>
  );
};

export default CourseDetails;