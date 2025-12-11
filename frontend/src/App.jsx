import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import CoursesPage from "./pages/common/CoursePage";
import CourseDetailsPage from "./pages/common/CourseDetailsPage";
import StudentRegistrationPage from "./pages/common/StudentRegistration";
import ProfilePage from "./pages/common/ProfilePage";
import AboutUs from "./pages/common/AboutUs";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse from "./pages/admin/AddCourse";
import CourseCategory from "./pages/admin/CourseCategory";
import CourseDetails from "./pages/admin/CourseDetails";
import Courses from "./pages/admin/Courses";
import EditCourse from "./pages/admin/EditCourse";
import Mentors from "./pages/admin/Mentors";
import Students from "./pages/admin/Students";
import SyllabusPlanner from "./pages/admin/SyllabusPlanner";
import Users from "./pages/admin/Users";
import UserDetails from "./pages/admin/UserDetails"; // Fixed typo

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentPayment from "./pages/common/StudentPayment";
import PaymentSuccess from "./pages/common/PaymentSuccess";
import PaymentCancel from "./pages/common/PaymentCancel";
// Mentor Pages
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorRegister from "./pages/mentor/MentorRegistration";

const App = () => {
  return (
    <Routes>

      {/* Common Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/student/register/:courseId" element={<StudentRegistrationPage />} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/about" element={<AboutUs />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<Courses />} />
      <Route path="/admin/courses/add" element={<AddCourse />} />
      <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
      <Route path="/admin/courses/view/:id" element={<CourseDetails />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/coursecategory" element={<CourseCategory />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/users/:id" element={<UserDetails />} />
      <Route path="/admin/syllabus" element={<SyllabusPlanner />} />
      <Route path="/admin/mentors" element={<Mentors />} />

      {/* Student Routes */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/studentdashboard/profile" element={<StudentProfile />} />
      <Route path="/student/payment" element={<StudentPayment />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/failure" element={<PaymentCancel />} />

      {/* Mentor Routes */}
      <Route path="/mentor/register" element={<MentorRegister />} />
      <Route path="/mentor/mentordashboard" element={<MentorDashboard />} />

    </Routes>
  );
};

export default App;
