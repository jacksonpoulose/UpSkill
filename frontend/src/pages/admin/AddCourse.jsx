import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import { ArrowLeft, Upload } from "lucide-react";

const AddCourse = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isVisible: false,
  });

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    durationWeeks: "",
    mentorIds: [],
    startDate: "",
    endDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchMentors();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/category",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.categories || []);
    } catch (error) {
      showNotification("error", "Failed to fetch categories");
    }
  };

  const fetchMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/mentors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMentors(response.data.mentors || []);
    } catch (error) {
      showNotification("error", "Failed to fetch mentors");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMentorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setCourseData((prev) => ({
      ...prev,
      mentorIds: selectedOptions,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(courseData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value);
        }
      });

      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:3000/api/v1/admin/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showNotification("success", "Course added successfully");
      setTimeout(() => navigate("/admin/courses"), 1500);
    } catch (error) {
      console.error("Error adding course:", error);
      showNotification("error", "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin/courses">
              <Button
                variant="white"
                className="flex items-center space-x-2 border border-gray-300"
              >
                <ArrowLeft size={20} />
                <span>Back to Courses</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
              <p className="text-gray-600">Create a new course in your catalog</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Weeks)
                </label>
                <input
                  type="number"
                  name="durationWeeks"
                  value={courseData.durationWeeks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mentors
                </label>
                <select
                  name="mentorIds"
                  multiple
                  value={courseData.mentorIds}
                  onChange={handleMentorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor._id}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={courseData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={courseData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description
              </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image (optional)
              </label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Upload className="mr-2" size={18} />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-16 w-16 rounded object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="blue"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Course"}
              </Button>
            </div>
          </form>
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

export default AddCourse;
