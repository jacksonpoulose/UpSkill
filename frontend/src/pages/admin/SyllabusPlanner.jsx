import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import Notification from "../../components/common/Notification";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import AddWeekModal from "../../components/modal/AddWeekModal";
import EditWeekModal from "../../components/modal/EditWeekModal";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Target,
  CheckSquare,
  Link,
  FileText,
  Calendar,
  BookOpen,
} from "lucide-react";
import axiosInstance from "../../services/axiosInstance";

const SyllabusPlanner = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseWeeks, setCourseWeeks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentWeeks, setCurrentWeeks] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedWeekTitle, setSelectedWeekTitle] = useState("");

  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCourses();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseWeeks();
    }
  }, [selectedCourse]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/category");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      showNotification("error", "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/courses");
      console.log("Fetched courses:", res.data); // ✅ Add this
      const allCourses = res.data.courses || res.data || [];

      const filteredCourses = Array.isArray(allCourses)
        ? allCourses.filter((course) => {
            const courseCategory =
              typeof course.category === "object"
                ? course.category._id
                : course.category;
            return courseCategory === selectedCategory;
          })
        : [];
      console.log("Filtered courses:", filteredCourses); // ✅ Add this
      setCourses(filteredCourses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      showNotification(
        "error",
        "Failed to fetch courses. Please check if the courses endpoint exists."
      );
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseWeeks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/syllabus/${selectedCourse}`);
      const weeks = res.data.weeks || res.data || [];
      setCourseWeeks(weeks);
      setCurrentWeeks(weeks);
    } catch (error) {
      console.error("Failed to fetch course weeks:", error);
      // If syllabus doesn't exist yet, that's okay - just show empty state
      setCourseWeeks([]);
      setCurrentWeeks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedCourse("");
    setCourses([]);
    setCourseWeeks([]);
    setCurrentWeeks([]);
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleAddWeek = () => {
    setIsAddModalOpen(true);
  };

  const handleEditWeek = (week) => {
    setSelectedWeek(week);
    setIsEditModalOpen(true);
  };

  const handleWeekAdded = (newWeek) => {
    const updatedWeeks = [...currentWeeks, newWeek];
    setCourseWeeks(updatedWeeks);
    setCurrentWeeks(updatedWeeks);
    showNotification("success", "Week added successfully");
  };

  const handleWeekUpdated = (updatedWeek) => {
    const updatedWeeks = currentWeeks.map((week) =>
      week._id === updatedWeek._id ? updatedWeek : week
    );
    setCourseWeeks(updatedWeeks);
    setCurrentWeeks(updatedWeeks);
    showNotification("success", "Week updated successfully");
  };

  const openDeleteModal = (weekId, weekTitle) => {
    setSelectedWeekId(weekId);
    setSelectedWeekTitle(weekTitle);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteWeek = async () => {
    try {
      await axiosInstance.delete(`/admin/syllabus/${selectedWeekId}`);
      const updatedWeeks = currentWeeks.filter(
        (week) => week._id !== selectedWeekId
      );
      setCourseWeeks(updatedWeeks);
      setCurrentWeeks(updatedWeeks);
      showNotification("success", "Week deleted successfully");
    } catch (error) {
      console.error("Failed to delete week:", error);
      showNotification("error", "Failed to delete week");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const toggleWeekExpansion = (weekId) => {
    const newExpanded = new Set(expandedWeeks);
    if (expandedWeeks.has(weekId)) {
      newExpanded.delete(weekId);
    } else {
      newExpanded.add(weekId);
    }
    setExpandedWeeks(newExpanded);
  };

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const getCategoryName = (categoryId) => {
    return categories.find((cat) => cat._id === categoryId)?.name || "Unknown";
  };

  const getCourseName = (courseId) => {
    return (
      courses.find((course) => course._id === courseId)?.title || "Unknown"
    );
  };

  const sortedWeeks = currentWeeks.sort((a, b) => a.weekNumber - b.weekNumber);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Syllabus Planner
            </h1>
            <p className="text-gray-600">
              Create and manage detailed course syllabi with weekly breakdowns
            </p>
          </div>
        </div>

        {/* Course Selection */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories
                    .filter((cat) => cat.isActive)
                    .map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!selectedCategory}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {selectedCategory && courses.length === 0 && !loading && (
                  <p className="text-sm text-gray-500 mt-1">
                    No published courses found for this category
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Content */}
        {selectedCourse && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {getCourseName(selectedCourse)} - Syllabus
                  </h2>
                  <p className="text-sm text-gray-600">
                    {currentWeeks.length} weeks planned • Category:{" "}
                    {getCategoryName(selectedCategory)}
                  </p>
                </div>
                <Button
                  variant="blue"
                  className="flex items-center space-x-2"
                  onClick={handleAddWeek}
                >
                  <Plus size={20} />
                  <span>Add Week</span>
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
                <p>Loading syllabus...</p>
              </div>
            ) : currentWeeks.length > 0 ? (
              <div className="p-6">
                <div className="space-y-4">
                  {sortedWeeks.map((week) => {
                    const isExpanded = expandedWeeks.has(week._id);
                    return (
                      <div
                        key={week._id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                W{week.weekNumber}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {week.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {week.objectives?.length || 0} objectives •{" "}
                                {week.tasks?.length || 0} tasks
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditWeek(week)}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() =>
                                openDeleteModal(week._id, week.title)
                              }
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => toggleWeekExpansion(week._id)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-6 bg-white border-t border-gray-200">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <div className="flex items-center space-x-2 mb-4">
                                  <Target className="w-5 h-5 text-blue-600" />
                                  <h4 className="font-medium text-gray-900">
                                    Learning Objectives
                                  </h4>
                                </div>
                                {week.objectives &&
                                week.objectives.length > 0 ? (
                                  <ul className="space-y-2">
                                    {week.objectives.map((objective, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-gray-600 flex items-start"
                                      >
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        {objective}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 italic">
                                    No objectives defined
                                  </p>
                                )}
                              </div>

                              <div>
                                <div className="flex items-center space-x-2 mb-4">
                                  <CheckSquare className="w-5 h-5 text-green-600" />
                                  <h4 className="font-medium text-gray-900">
                                    Tasks & Assignments
                                  </h4>
                                </div>
                                {week.tasks && week.tasks.length > 0 ? (
                                  <div className="space-y-4">
                                    {week.tasks.map((task, index) => (
                                      <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-4"
                                      >
                                        <div className="flex items-start justify-between mb-2">
                                          <h5 className="font-medium text-gray-900">
                                            {task.title}
                                          </h5>
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              task.isMandatory
                                                ? "bg-red-100 text-red-800"
                                                : "bg-blue-100 text-blue-800"
                                            }`}
                                          >
                                            {task.isMandatory
                                              ? "Mandatory"
                                              : "Optional"}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                          {task.description}
                                        </p>
                                        {task.resources &&
                                          task.resources.length > 0 && (
                                            <div>
                                              <div className="flex items-center space-x-1 mb-2">
                                                <Link className="w-4 h-4 text-purple-600" />
                                                <span className="text-xs font-medium text-gray-700">
                                                  Resources:
                                                </span>
                                              </div>
                                              <ul className="space-y-1">
                                                {task.resources.map(
                                                  (resource, resIndex) => (
                                                    <li
                                                      key={resIndex}
                                                      className="text-xs text-gray-600 flex items-start"
                                                    >
                                                      <span className="w-1 h-1 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                      {resource}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 italic">
                                    No tasks defined
                                  </p>
                                )}
                              </div>
                            </div>

                            {week.reviewNotes && (
                              <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center space-x-2 mb-3">
                                  <FileText className="w-5 h-5 text-orange-600" />
                                  <h4 className="font-medium text-gray-900">
                                    Review Notes
                                  </h4>
                                </div>
                                <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                                  {week.reviewNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Calendar size={48} className="mx-auto opacity-40" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No syllabus created yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start building your course syllabus by adding the first week.
                </p>
                <Button
                  variant="blue"
                  className="inline-flex items-center space-x-2"
                  onClick={handleAddWeek}
                >
                  <Plus size={18} />
                  <span>Add First Week</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddWeekModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onWeekAdded={handleWeekAdded}
        courseId={selectedCourse}
        existingWeeks={currentWeeks}
      />

      {selectedWeek && (
        <EditWeekModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedWeek(null);
          }}
          onWeekUpdated={handleWeekUpdated}
          week={selectedWeek}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Week"
        message="Are you sure you want to delete the following week?"
        itemName={selectedWeekTitle}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteWeek}
        onCancel={() => setIsDeleteModalOpen(false)}
        variant="danger"
      />

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

export default SyllabusPlanner;
