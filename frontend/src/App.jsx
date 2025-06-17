import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Courses from "./pages/admin/Courses"
import AddCourse from "./pages/admin/AddCourse"; // Import
import EditCourse from "./pages/admin/EditCourse"
import Students from "./pages/admin/Students";
import CourseCategory from "./pages/admin/CourseCategory";
import CoursesPage from "./pages/common/CoursePage";
import MentorRegister from "./pages/mentor/MentorRegistration";
import ForgotPassword from "./pages/common/ForgotPassword";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import Mentors from "./pages/admin/Mentors";
import ResetPassword from "./pages/common/ResetPassword";
import Users from "./pages/admin/Users";
import CourseDetails from "./pages/admin/CourseDetails";
const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<Courses />} />
      <Route path="/admin/courses/add" element={<AddCourse />} />
      <Route path="/admin/courses/edit/:id" element={<EditCourse />} />

      <Route path="/admin/students" element={<Students/>}/>
      <Route path="/admin/coursecategory" element={<CourseCategory/>}/>

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/mentor/register" element={<MentorRegister/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/studentdashboard" element={<StudentDashboard/>}/>
      <Route path="/studentdashboard/profile" element={<StudentProfile/>}/>
      <Route path="/mentor/mentordashboard" element={<MentorDashboard/>}/>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin/courses/view/:id" element={<CourseDetails/>}/>
      <Route path="/admin/users" element={<Users/>}/>
    </Routes>
  );
};

export default App;
