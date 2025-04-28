import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Courses from "./pages/admin/Courses"

const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/courses" element={<Courses />} />

    </Routes>
  );
};

export default App;
