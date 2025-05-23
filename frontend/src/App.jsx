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

    </Routes>
  );
};

export default App;
