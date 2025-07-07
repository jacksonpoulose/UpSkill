import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

import Sidebar from "../../components/admin/Sidebar";
import CourseBasicsSection from "../../components/admin/course/CourseBasicsSection";
import DurationSection from "../../components/admin/course/DurationSection";
import PricingSection from "../../components/admin/course/PricingSection";
import ImageUploadSection from "../../components/admin/course/ImageUploadSection";
import FormActions from "../../components/admin/course/FormAction";
import Notification from "../../components/common/Notification";
import PageHeader from "../../components/admin/PageHeader";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageRemoved, setImageRemoved] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    calculateFormProgress();
  }, [courseData, image]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/admin/category");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      showNotification("error", "Failed to fetch categories");
    }
  };

  const fetchCourseDetails = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(`/admin/courses/${id}`);
      const course = response.data.course;

      setCourseData({
        title: course.title || "",
        description: course.description || "",
        category: course.category?._id || "",
        durationWeeks: course.durationWeeks || "",
        courseFee: course.courseFee || "",
        mentorIds: course.mentorIds || [],
      });

      if (course.courseImage) {
        const fullImageUrl = `http://localhost:3000/uploads/courses/${course.courseImage}`;
        setExistingImageUrl(fullImageUrl);
        setPreview(fullImageUrl);
      }
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      showNotification("error", "Failed to fetch course details");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setExistingImageUrl(null);
      setImageRemoved(false);
    }
  };

  const handleRemoveImage = () => {
    console.log("Removing image...");
    setImage(null);
    setPreview(null);
    setExistingImageUrl(null);
    setImageRemoved(true);
  };
  
  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const calculateFormProgress = () => {
    const fields = [
      courseData.title,
      courseData.description,
      courseData.category,
      courseData.durationWeeks,
      courseData.courseFee,
      image || existingImageUrl,
    ];

    const filledFields = fields.filter((field) => field).length;
    const progress = Math.round((filledFields / fields.length) * 100);
    setFormProgress(progress);
  };

  // ✅ Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!courseData.title.trim()) newErrors.title = "Course title is required";
    if (!courseData.description.trim())
      newErrors.description = "Description is required";
    if (!courseData.category) newErrors.category = "Category is required";
    if (!courseData.durationWeeks)
      newErrors.durationWeeks = "Duration is required";
    if (!courseData.courseFee || courseData.courseFee < 0)
      newErrors.courseFee = "Valid course fee is required";

    // If image removed and no new image uploaded
    if (imageRemoved && !image)
      newErrors.courseImage = "Course image is required";

    // If no old image and no new image
    if (!existingImageUrl && !image)
      newErrors.courseImage = "Course image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      showNotification("error", "Please fix the validation errors.");
      return;
    }

    setLoading(true);

    try {
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
      } else if (existingImageUrl) {
        const existingFileName = existingImageUrl.split("/").pop();
        formData.append("existingImage", existingFileName);
      }

      formData.append("imageRemoved", imageRemoved ? "true" : "false");

      await axiosInstance.put(`/admin/courses/${id}/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showNotification("success", "Course updated successfully");
      setTimeout(() => navigate("/admin/courses"), 1500);
    } catch (error) {
      console.error("Error updating course:", error);
      showNotification("error", "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Edit Course"
            subtitle="Update your course details"
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
                key={preview || "no-preview"} 
                preview={preview}
                handleImageChange={handleImageChange}
                setImage={setImage}
                setPreview={setPreview}
                error={errors.courseImage}
                handleRemoveImage={handleRemoveImage}
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
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
    </div>
  );
};

export default EditCourse;
