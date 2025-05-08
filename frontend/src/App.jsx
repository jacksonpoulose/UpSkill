import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Courses from "./pages/admin/Courses"
import AddCourse from "./pages/admin/AddCourse"; // Import


const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/courses" element={<Courses />} />
      <Route path="/admin-dashboard/courses/add" element={<AddCourse />} />

    </Routes>
  );
};

export default App;
