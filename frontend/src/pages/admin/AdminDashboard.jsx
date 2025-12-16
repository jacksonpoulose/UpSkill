import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from "react-redux";
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
  GraduationCap,
  DollarSign,
  Award,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Activity,
  Globe,
  Zap,
  Eye,
  MessageSquare,
  Download,
  Filter,
  MoreVertical,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Briefcase,
  Heart,
  Share2
} from "lucide-react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("7d");
  const user = useSelector((state) => state.user.user);

  const enrollmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Student Enrollments",
        data: [65, 78, 90, 85, 99, 105, 120, 135, 142, 158, 165, 180],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Course Completions",
        data: [45, 52, 68, 74, 82, 89, 95, 108, 115, 125, 132, 145],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const revenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [28000, 35000, 42000, 48000],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const courseDistributionData = {
    labels: ["Web Development", "Data Science", "AI/ML", "Mobile Dev", "DevOps", "Design"],
    datasets: [
      {
        data: [35, 25, 20, 12, 5, 3],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#8B5CF6",
          "#F59E0B",
          "#EF4444",
          "#EC4899",
        ],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#fff",
      },
    ],
  };

  const stats = [
    {
      label: "Total Students",
      value: "12,845",
      icon: Users2,
      trend: "+12.5%",
      trendUp: true,
      change: "+1,205",
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Courses",
      value: "248",
      icon: BookOpen,
      trend: "+8.2%",
      trendUp: true,
      change: "+18",
      color: "emerald",
      bgGradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Revenue",
      value: "₹2,84,592",
      icon: DollarSign,
      trend: "+23.1%",
      trendUp: true,
      change: "+₹52,840",
      color: "purple",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Completion Rate",
      value: "87.4%",
      icon: Award,
      trend: "+4.3%",
      trendUp: true,
      change: "+3.2%",
      color: "orange",
      bgGradient: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const quickStats = [
    {
      label: "New Enrollments Today",
      value: "47",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Courses Published",
      value: "12",
      icon: PlayCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Mentors",
      value: "156",
      icon: UserCog,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Avg. Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  const recentCourses = [
    {
      name: "Advanced React Development & Modern Architecture",
      instructor: "Sarah Johnson",
      students: 156,
      rating: 4.8,
      revenue: "₹78,400",
      status: "published",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=150",
      category: "Frontend",
      completion: 87,
    },
    {
      name: "Data Science Fundamentals with Python",
      instructor: "Michael Chen",
      students: 142,
      rating: 4.7,
      revenue: "₹71,000",
      status: "published",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=150",
      category: "Data Science",
      completion: 92,
    },
    {
      name: "Machine Learning & AI Essentials",
      instructor: "Dr. Emily Rodriguez",
      students: 128,
      rating: 4.9,
      revenue: "₹96,000",
      status: "published",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150",
      category: "AI/ML",
      completion: 78,
    },
    {
      name: "Full-Stack JavaScript Development",
      instructor: "Alex Thompson",
      students: 198,
      rating: 4.6,
      revenue: "₹89,100",
      status: "draft",
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=150",
      category: "Full-Stack",
      completion: 65,
    },
    {
      name: "Mobile App Development with React Native",
      instructor: "Lisa Park",
      students: 89,
      rating: 4.5,
      revenue: "₹53,400",
      status: "published",
      image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=150",
      category: "Mobile",
      completion: 73,
    },
  ];

  const recentActivities = [
    {
      type: "enrollment",
      message: "New student enrolled in React Development course",
      time: "2 minutes ago",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      type: "course",
      message: "Course 'Python Basics' was published",
      time: "15 minutes ago",
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      type: "completion",
      message: "Student completed 'Data Science Fundamentals'",
      time: "1 hour ago",
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      type: "review",
      message: "New 5-star review for 'Machine Learning Basics'",
      time: "2 hours ago",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      type: "mentor",
      message: "New mentor application received",
      time: "3 hours ago",
      icon: UserCog,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        padding: 12,
      },
    },
    cutout: '60%',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600">Welcome back! Here's what's happening with your platform.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2.5 w-80">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, students, mentors..."
                  className="ml-3 bg-transparent border-none focus:outline-none flex-1 text-slate-700 placeholder-slate-400"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button className="relative p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    3
                  </span>
                </button>
                <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Admin"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.role === "admin" ? user.name : "Admin User"}
                    </p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {stat.trendUp ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {stat.value}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-xs text-slate-500">{stat.change} from last month</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg shadow-slate-200/50 p-4 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Enrollment Trend */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Enrollment & Completion Trends</h3>
                  <p className="text-sm text-slate-600">Monthly overview of student activity</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 3 months</option>
                    <option value="1y">Last year</option>
                  </select>
                  <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <Line data={enrollmentData} options={chartOptions} />
              </div>
            </div>

            {/* Course Distribution */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Course Categories</h3>
                  <p className="text-sm text-slate-600">Distribution by category</p>
                </div>
                <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <div className="h-64">
                <Doughnut data={courseDistributionData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Weekly Revenue</h3>
                  <p className="text-sm text-slate-600">Last 4 weeks performance</p>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.2%</span>
                </div>
              </div>
              <div className="h-64">
                <Bar data={revenueData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <p className="text-sm text-slate-600">Latest platform activities</p>
                </div>
                <Link to="/admin/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                      <div className={`p-2 rounded-lg ${activity.bg} flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Courses Table */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Top Performing Courses</h3>
                  <p className="text-sm text-slate-600">Your most successful courses this month</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200">
                    <Filter className="h-4 w-4" />
                  </button>
                  <Link
                    to="/admin/courses"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    View All Courses
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={course.image}
                            alt={course.name}
                            className="h-12 w-12 rounded-xl object-cover shadow-md"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-slate-900 line-clamp-1">{course.name}</div>
                            <div className="text-xs text-slate-500">{course.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{course.instructor}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Users className="h-4 w-4 mr-1 text-slate-400" />
                          {course.students}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-slate-900">{course.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-900">{course.revenue}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full"
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600">{course.completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(course.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;