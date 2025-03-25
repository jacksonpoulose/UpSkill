import React from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-red-600 flex flex-col items-center">

      {/* Navbar */}
      <nav className="w-full h-[40px] px-6 flex justify-between items-center bg-amber-50 text-gray-800 ">
      {/* Left Side - Social Icons & Phone */}
      <div className="flex items-center space-x-4">
        <FaInstagram className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
        <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" size={20} />
        
        {/* Vertical Line */}
        <div className="h-6 w-[1.5px] bg-gray-300"></div>
        
        {/* Phone Icon & Number */}
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-gray-600" size={18} />
          <span className="text-gray-700 font-semibold">+91 98765 43210</span>
        </div>
      </div>

      {/* Right Side - Sign Up Button */}
      <button className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
        Sign Up
      </button>
    </nav>
    <nav className="w-full h-[60px] px-6 flex justify-between items-center bg-white text-gray-800">
      {/* Left Side - Logo */}
      <h1 className="text-2xl font-bold text-red-600">UpSkill</h1>

      {/* Center - Navigation Links */}
      <div className="flex space-x-8 text-lg font-medium">
        <a href="#" className="hover:text-red-600 transition">Home</a>
        <a href="#" className="hover:text-red-600 transition">Courses</a>
        <a href="#" className="hover:text-red-600 transition">About</a>
        <a href="#" className="hover:text-red-600 transition">Contact</a>
        <a href="#" className="hover:text-red-600 transition">Blog</a>

      </div>

      {/* Right Side - Buttons */}
      <div className="space-x-4">
        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-950 text-white font-semibold rounded-lg ">
          Become a Mentor
        </button>
      </div>
    </nav>

      {/* Banner Section */}
      <div className="relative h-100 w-full mt-1 bg-blue-950">
        <img
          src="https://t3.ftcdn.net/jpg/04/00/77/64/360_F_400776431_5JxdDYRr1mn9yISiUFMPcLtLp3zt6NA1.jpg"
          alt="Banner"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <button className="px-6 py-3 bg-white text-red-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-red-100 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">MERN Stack</h2>
          <p className="mt-2 text-gray-600">Master MongoDB, Express, React, and Node.js.</p>
        </div>
        <div className="p-6 bg-red-100 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">Python Programming</h2>
          <p className="mt-2 text-gray-600">Learn Python for web development and AI.</p>
        </div>
        <div className="p-6 bg-red-100 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">Live Projects</h2>
          <p className="mt-2 text-gray-600">Work on real-world projects and gain experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
