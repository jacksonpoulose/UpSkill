import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  UserCheck,
  UserX,
  Users as UsersIcon,
  GraduationCap,
  Clock,
  Activity,
  Settings,
  Ban,
  CheckCircle,
  AlertTriangle,
  X,
  Edit3,
  Save,
  MoreVertical,
  Bell,
  Key,
  Smartphone,
  Globe,
  Award,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Star,
  Zap,
  Heart,
  Target,
  Calendar as CalendarIcon,
  Briefcase,
  MapPinIcon
} from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/users/${id}`);
      setUser(response.data.user);
      setEditData(response.data.user);
      setError("");
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async () => {
    try {
      await axiosInstance.put(`/admin/users/${id}/block`, {
        isActive: !user.isActive,
      });
      
      setUser(prev => ({ ...prev, isActive: !prev.isActive }));
      setShowConfirmModal(false);
      setActionType("");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleRoleChange = async (newRole) => {
    try {
      await axiosInstance.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      
      setUser(prev => ({ ...prev, role: newRole }));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}`, editData);
      setUser(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const openConfirmModal = (action) => {
    setActionType(action);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setActionType("");
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return "bg-purple-100 text-purple-800 border-purple-200";
      case 'mentor':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'student':
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield size={16} />;
      case 'mentor':
        return <UserCheck size={16} />;
      case 'student':
        return <GraduationCap size={16} />;
      default:
        return <UsersIcon size={16} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: UsersIcon },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading user details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Not Found</h3>
            <p className="text-gray-600 mb-4">{error || "The user you're looking for doesn't exist."}</p>
            <button
              onClick={() => navigate('/admin/users')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Users
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin/users')}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
                >
                  <ArrowLeft size={20} />
                </button>
                <nav className="flex items-center space-x-2 text-sm">
                  <Link to="/admin/users" className="text-gray-500 hover:text-gray-700">
                    Users
                  </Link>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">{user.name || 'User Details'}</span>
                </nav>
              </div>
              
              <div className="flex items-center space-x-3">
                {!editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <Edit3 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => openConfirmModal(user.isActive ? "block" : "unblock")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        user.isActive 
                          ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                          : 'text-green-600 hover:bg-green-50 hover:text-green-700'
                      }`}
                    >
                      {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                      <span>{user.isActive ? 'Block User' : 'Unblock User'}</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditData(user);
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* User Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
            <div className="px-8 pb-8">
              <div className="flex items-start justify-between -mt-16">
                <div className="flex items-end space-x-6">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-2xl bg-white shadow-2xl border-4 border-white flex items-center justify-center">
                      <div className="h-24 w-24 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    </div>
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  
                  <div className="mt-4">
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.name || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none mb-2"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name || 'Unknown User'}</h1>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span>{user.role?.charAt(0)?.toUpperCase() + user.role?.slice(1) || 'User'}</span>
                      </span>
                      
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(user.isActive)}`}>
                        {user.isActive ? (
                          <>
                            <CheckCircle size={14} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <Ban size={14} />
                            <span>Blocked</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="guest">Guest</option>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-8">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span>Contact Information</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          {editMode ? (
                            <input
                              type="email"
                              value={editData.email || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                              className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-medium text-gray-900">{user.email || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          {editMode ? (
                            <input
                              type="tel"
                              value={editData.phone || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                              className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-medium text-gray-900">{user.phone || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Account Information</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium text-gray-900">{formatDate(user.updatedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Key className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">User ID</p>
                          <p className="font-medium text-gray-900 font-mono text-sm">{user._id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>User Activity</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Sessions</p>
                          <p className="text-2xl font-bold text-blue-900">42</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Completed</p>
                          <p className="text-2xl font-bold text-green-900">38</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 text-sm font-medium">Points</p>
                          <p className="text-2xl font-bold text-purple-900">1,250</p>
                        </div>
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-600 text-sm font-medium">Streak</p>
                          <p className="text-2xl font-bold text-orange-900">7 days</p>
                        </div>
                        <Zap className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Activity Timeline</h4>
                    <p className="text-gray-600">Detailed activity tracking coming soon...</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <span>Account Settings</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">SMS notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Push notifications</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Privacy Settings</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Profile visibility</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Activity tracking</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
                      <p className="text-red-700 text-sm mb-4">These actions cannot be undone.</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${actionType === 'block' ? 'bg-red-100' : 'bg-green-100'}`}>
                      <AlertTriangle className={`h-6 w-6 ${actionType === 'block' ? 'text-red-600' : 'text-green-600'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {actionType === 'block' ? 'Block User' : 'Unblock User'}
                    </h3>
                  </div>
                  <button
                    onClick={closeConfirmModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to {actionType} <span className="font-semibold">{user.name}</span>?
                  </p>
                  
                  {actionType === 'block' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Warning:</strong> This user will lose access to their account.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={closeConfirmModal}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBlockUnblock}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      actionType === 'block'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {actionType === 'block' ? 'Block User' : 'Unblock User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDetails;