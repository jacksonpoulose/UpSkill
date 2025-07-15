import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Calendar,
  Award,
  CheckCircle,
  Play,
  Download,
  Share2,
  Heart,
  ArrowLeft,
  Globe,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import axiosInstance from "../../services/axiosInstance";
import PurchaseModal from "../../components/courses/PurchaseModal";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [user, setUser] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/common/courses/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDurationText = (weeks) => {
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""}`;
    const months = Math.floor(weeks / 4);
    const remainingWeeks = weeks % 4;
    if (remainingWeeks === 0) return `${months} month${months > 1 ? "s" : ""}`;
    return `${months}m ${remainingWeeks}w`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-5 w-5 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Course link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          isLoggedIn={!!user.name}
          username={user.name}
          role={user.role}
          onLogout={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        />
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Loading Course Details
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch the course information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          isLoggedIn={!!user.name}
          username={user.name}
          role={user.role}
          onLogout={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        />
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Course Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                {error || "The course does not exist or was removed."}
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Browse All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar
        isLoggedIn={!!user.name}
        username={user.name}
        role={user.role}
        onLogout={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Course Image */}
            <div className="lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={
                    course.courseImage
                      ? `http://localhost:3000/uploads/courses/${course.courseImage}`
                      : "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt={course.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="lg:col-span-2">
              {/* Category & Status */}
              <div className="flex items-center gap-4 mb-4">
                {course.category && (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {course.category.name}
                  </span>
                )}
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {course.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                {course.rating && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-lg font-semibold">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400">
                      ({course.reviews || 0} reviews)
                    </span>
                  </div>
                )}

                <div className="flex items-center text-gray-300">
                  <Users className="h-5 w-5 mr-2" />
                  <span>
                    {course.studentsEnrolled?.length || 0} students enrolled
                  </span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>English</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(`/student/register/${course._id}`, { state: { course } })}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                >
                  <Award className="h-6 w-6 mr-3" />
                  Enroll Now - {formatPrice(course.courseFee)}
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`border-2 border-white/30 hover:border-white/50 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                    isWishlisted ? "bg-white/10" : "hover:bg-white/10"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>

                <button
                  onClick={handleShare}
                  className="border-2 border-white/30 hover:border-white/50 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10 flex items-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "curriculum", label: "Curriculum", icon: Target },
                    { id: "instructors", label: "Instructors", icon: Users },
                    { id: "reviews", label: "Reviews", icon: Star },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 font-semibold transition-colors ${
                        activeTab === tab.id
                          ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        What you'll learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Master the fundamentals and advanced concepts",
                          "Build real-world projects from scratch",
                          "Get hands-on experience with industry tools",
                          "Receive personalized feedback from experts",
                          "Join a community of like-minded learners",
                          "Get lifetime access to course materials",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Description
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {course.description}
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                          This comprehensive course is designed to take you from
                          beginner to advanced level. You'll work on real
                          projects, learn industry best practices, and gain the
                          skills needed to excel in your career.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Course Curriculum
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Introduction and Setup",
                          lessons: 5,
                          duration: "45 min",
                        },
                        {
                          title: "Core Concepts",
                          lessons: 8,
                          duration: "2h 30min",
                        },
                        {
                          title: "Practical Applications",
                          lessons: 12,
                          duration: "4h 15min",
                        },
                        {
                          title: "Advanced Topics",
                          lessons: 10,
                          duration: "3h 45min",
                        },
                        {
                          title: "Final Project",
                          lessons: 6,
                          duration: "2h 30min",
                        },
                      ].map((module, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {module.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {module.lessons} lessons • {module.duration}
                              </p>
                            </div>
                            <Play className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "instructors" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Meet Your Instructors
                    </h3>
                    {course.mentorIds && course.mentorIds.length > 0 ? (
                      <div className="space-y-6">
                        {course.mentorIds.map((mentor, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl"
                          >
                            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {mentor.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                {mentor.name}
                              </h4>
                              <p className="text-gray-600 mb-3">
                                Expert Instructor & Industry Professional
                              </p>
                              <p className="text-gray-700">
                                With years of experience in the field,{" "}
                                {mentor.name} brings real-world expertise and
                                practical insights to help you master the
                                subject.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Instructor information will be available soon.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Student Reviews
                    </h3>
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Reviews will appear here once students start enrolling.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Course Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {getDurationText(course.durationWeeks)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>Start Date</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {course.startDate
                        ? new Date(course.startDate).toLocaleDateString()
                        : "Flexible"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <TrendingUp className="h-5 w-5 mr-3" />
                      <span>Level</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {course.level || "All Levels"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <Shield className="h-5 w-5 mr-3" />
                      <span>Certificate</span>
                    </div>
                    <span className="font-semibold text-gray-900">Yes</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center text-gray-600">
                      <Download className="h-5 w-5 mr-3" />
                      <span>Resources</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      Downloadable
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg p-6 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {formatPrice(course.courseFee)}
                  </div>
                  <p className="text-red-100 mb-6">
                    One-time payment • Lifetime access
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/student/register/${course._id}`, {
                        state: { course },
                      })
                      
                    }
                    className="w-full bg-white text-red-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    Enroll Now
                  </button>

                  <p className="text-red-100 text-sm mt-4">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  This course includes:
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Play, text: "On-demand video content" },
                    { icon: Download, text: "Downloadable resources" },
                    { icon: Shield, text: "Certificate of completion" },
                    { icon: Users, text: "Community access" },
                    { icon: BookOpen, text: "Lifetime access" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <feature.icon className="h-5 w-5 text-red-600 mr-3" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
