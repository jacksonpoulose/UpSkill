import React, { useEffect, useState } from "react";
import {
  User,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import Navbar from "../../components/common/Navbar";
import Button from "../../components/common/Button";
import Card, { CardBody } from "../../components/common/Card";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setIsLoggedIn(true);
      setUsername(user.name);
      setRole(user.role || "");
    }

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        setProfile(response.data);
        setEditForm(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(profile);
    }
    setError("");
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    setShowConfirmationModal(true);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const response = await axiosInstance.put("/user/me", editForm);
      setProfile(response.data.user || response.data);
      setEditForm(response.data.user || response.data);
      setIsEditing(false);
      setError("");
      setShowConfirmationModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
    setError("");
  };

  const handleModalClose = () => {
    setShowConfirmationModal(false);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-red-900 text-white text-center py-2 text-sm">
          <p>Transform Your Career with Expert-Led Courses</p>
        </div>
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          role={role}
          onLogout={handleLogout}
        />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-red-900 text-white text-center py-2 text-sm">
          <p>Transform Your Career with Expert-Led Courses</p>
        </div>
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          role={role}
          onLogout={handleLogout}
        />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center text-red-500">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-lg font-semibold mb-2">Error Loading Profile</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Pre-header */}
      <div className="bg-red-900 text-white text-center py-2 text-sm">
        <p>Transform Your Career with Expert-Led Courses</p>
      </div>

      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        role={role}
        onLogout={handleLogout}
      />

      {/* Profile Header */}
      <section className="relative bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent)]"></div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-12 w-12 text-red-700" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {profile?.name || "Your Profile"}
            </h1>
            <p className="text-red-100 text-lg">{profile?.email}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 transform -skew-y-3 translate-y-8"></div>
      </section>

      {/* Profile Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Profile Information
              </h2>
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button
                    variant="red"
                    onClick={handleEditToggle}
                    leftIcon={<Edit2 size={18} />}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="red"
                      onClick={handleSaveClick}
                      loading={saveLoading}
                      leftIcon={<Save size={18} />}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      leftIcon={<X size={18} />}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Profile Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <Card>
                <CardBody>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="h-5 w-5 text-red-600 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <ProfileField
                      label="Full Name"
                      value={profile?.name}
                      editValue={editForm?.name}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("name", value)}
                      required
                    />
                    <ProfileField
                      label="Email"
                      value={profile?.email}
                      isEditing={false}
                      icon={<Mail className="h-4 w-4 text-gray-400" />}
                    />
                    <ProfileField
                      label="Phone"
                      value={profile?.phone}
                      editValue={editForm?.phone}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("phone", value)}
                      type="tel"
                      icon={<Phone className="h-4 w-4 text-gray-400" />}
                    />
                    <ProfileField
                      label="Gender"
                      value={profile?.gender}
                      editValue={editForm?.gender}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("gender", value)}
                      type="select"
                      options={[
                        { value: "", label: "Select Gender" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                    <ProfileField
                      label="Date of Birth"
                      value={
                        profile?.dateOfBirth
                          ? new Date(profile.dateOfBirth).toLocaleDateString()
                          : ""
                      }
                      editValue={
                        editForm?.dateOfBirth
                          ? new Date(editForm.dateOfBirth)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange("dateOfBirth", value)
                      }
                      type="date"
                      icon={<Calendar className="h-4 w-4 text-gray-400" />}
                    />
                  </div>
                </CardBody>
              </Card>

              {/* Address Information */}
              <Card>
                <CardBody>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <MapPin className="h-5 w-5 text-red-600 mr-2" />
                    Address Information
                  </h3>
                  <div className="space-y-4">
                    <ProfileField
                      label="Address"
                      value={profile?.address}
                      editValue={editForm?.address}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("address", value)}
                      type="textarea"
                    />
                    <ProfileField
                      label="City"
                      value={profile?.city}
                      editValue={editForm?.city}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("city", value)}
                    />
                    <ProfileField
                      label="State"
                      value={profile?.state}
                      editValue={editForm?.state}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("state", value)}
                    />
                    <ProfileField
                      label="Country"
                      value={profile?.country}
                      editValue={editForm?.country}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("country", value)}
                    />
                    <ProfileField
                      label="Zip Code"
                      value={profile?.zipCode}
                      editValue={editForm?.zipCode}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange("zipCode", value)}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleModalClose}
        onConfirm={handleSave}
        title="Save Changes"
        message="Are you sure you want to save these changes to your profile?"
        confirmText="Save Changes"
        cancelText="Cancel"
        loading={saveLoading}
      />
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  editValue,
  isEditing,
  onChange,
  type = "text",
  icon,
  required = false,
  options = [],
  placeholder,
}) => {
  if (isEditing) {
    if (type === "textarea") {
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={editValue || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-colors"
          />
        </div>
      );
    }

    if (type === "select") {
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={editValue || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            value={editValue || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
            className={`w-full ${
              icon ? "pl-10" : "pl-3"
            } pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <span className="text-gray-900">{value || "Not provided"}</span>
      </div>
    </div>
  );
};

export default ProfilePage;