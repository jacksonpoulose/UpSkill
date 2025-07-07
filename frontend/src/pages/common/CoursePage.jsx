import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Users } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import CourseCard from '../../components/courses/CourseCard';
import CourseFilters from '../../components/courses/CourseFilters';
import PurchaseModal from '../../components/courses/PurchaseModal';
import axiosInstance from '../../services/axiosInstance';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [durationFilter, setDurationFilter] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/common/courses');
        const fetchedCourses = res.data.courses;
        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Load user info
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      setIsLoggedIn(true);
      setUsername(user.name);
      setRole(user.role || '');
    }
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...courses];

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(course => course.category.name === selectedCategory);
    }

    if (durationFilter) {
      const [min, max] = durationFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      filtered = filtered.filter(course => {
        if (max === Infinity) return course.durationWeeks >= min;
        return course.durationWeeks >= min && course.durationWeeks <= max;
      });
    }

    filtered = filtered.filter(course =>
      course.courseFee >= priceRange[0] && course.courseFee <= priceRange[1]
    );

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, durationFilter, priceRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setDurationFilter('');
    setPriceRange([0, 100000]);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowPurchaseModal(true);
  };

  const totalStudents = courses.reduce((sum, course) => sum + (course.studentsEnrolled?.length || 0), 0);
  const averageRating =
    courses.length > 0
      ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1)
      : 0;

  const categories = Array.from(new Set(courses.map(course => course.category?.name).filter(Boolean)));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        role={role}
        onLogout={() => {
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUsername('');
          setRole('');
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Discover world-class courses taught by industry experts. Start your learning journey today.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-red-300 mr-2" />
                  <span className="text-3xl font-bold">{courses.length}</span>
                </div>
                <p className="text-red-100">Expert Courses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-red-300 mr-2" />
                  <span className="text-3xl font-bold">{totalStudents}+</span>
                </div>
                <p className="text-red-100">Students Enrolled</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-red-300 mr-2" />
                  <span className="text-3xl font-bold">{averageRating}</span>
                </div>
                <p className="text-red-100">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        durationFilter={durationFilter}
        onDurationFilterChange={setDurationFilter}
        onClearFilters={handleClearFilters}
        categories={categories}
      />

      {/* Course Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="text-sm text-gray-600">
              Showing results for your search and filters
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course._id} onClick={() => handleEnrollClick(course)}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all courses.
              </p>
              <button
                onClick={handleClearFilters}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Purchase Modal */}
      {selectedCourse && (
        <PurchaseModal
          isOpen={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default CoursesPage;
