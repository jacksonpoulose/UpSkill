import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/admin/Sidebar";
import CourseBasicsSection from "../../components/admin/course/CourseBasicsSection";
import DurationSection from "../../components/admin/course/DurationSection";
import PricingSection from "../../components/admin/course/PricingSection";
import ImageUploadSection from "../../components/admin/course/ImageUploadSection";
import FormActions from "../../components/admin/course/FormAction";
import Notification from "../../components/common/Notification";
import PageHeader from "../../components/admin/PageHeader";
import axiosInstance from "../../api/axiosInstance";

const AddCourse = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [errors, setErrors] = useState({});
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
    courseFee: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchCategories();
    calculateFormProgress();
  }, [courseData, image]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/admin/category');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      showNotification('error', 'Failed to fetch categories');
    }
  };

  const calculateFormProgress = () => {
    const fields = [
      courseData.title,
      courseData.description,
      courseData.category,
      courseData.durationWeeks,
      courseData.courseFee,
      image
    ];
    const filledFields = fields.filter(field => field).length;
    const progress = Math.round((filledFields / fields.length) * 100);
    setFormProgress(progress);
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
    setNotification({ type, message, isVisible: true });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!courseData.title.trim()) newErrors.title = "Title is required";
    if (!courseData.description.trim()) newErrors.description = "Description is required";
    if (!courseData.category) newErrors.category = "Category is required";
    if (!courseData.durationWeeks || isNaN(courseData.durationWeeks)) newErrors.durationWeeks = "Valid duration is required";
    if (!courseData.courseFee || isNaN(courseData.courseFee)) newErrors.courseFee = "Valid fee is required";
    if (!image) newErrors.image = "Course image is required";


    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorKey}"]`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("error", "Please fix the form errors");
      return;
    }

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
        formData.append("courseImage", image);
      }

      await axios.post("http://localhost:3000/api/v1/admin/courses/add", formData, {
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
        <div className="max-w-4xl mx-auto">
          <PageHeader 
            title="Add New Course" 
            subtitle="Create a new course in your catalog"
            backLink="/admin/courses"
            backLabel="Back to Courses"
          />

          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Progress</span>
              <span>{formProgress}% Complete</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md">
            <form onSubmit={handleSubmit} className="space-y-8">
              <CourseBasicsSection 
                courseData={courseData}
                categories={categories}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <DurationSection 
                durationWeeks={courseData.durationWeeks}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <PricingSection 
                courseFee={courseData.courseFee}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <ImageUploadSection 
                preview={preview}
                handleImageChange={handleImageChange}
                setImage={setImage}
                setPreview={setPreview}
                error={errors.image}
              />

              <FormActions loading={loading} />
            </form>
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

export default AddCourse;
