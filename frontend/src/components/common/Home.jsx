import React from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-red-600 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full h-[50px] px-6 flex justify-between items-center bg-amber-50 text-gray-800 ">
        {/* Left Side - Social Icons & Phone */}
        <div className="flex items-center space-x-4">
          <FaInstagram
            className="text-gray-600 hover:text-red-500 cursor-pointer"
            size={20}
          />
          <FaFacebookF
            className="text-gray-600 hover:text-blue-600 cursor-pointer"
            size={20}
          />

          {/* Vertical Line */}
          <div className="h-6 w-[1.5px] bg-gray-300"></div>

          {/* Phone Icon & Number */}
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-gray-600" size={18} />
            <span className="text-gray-700 font-semibold">+91 98765 43210</span>
          </div>
        </div>

        {/* Right Side - Sign Up Button */}
        <Link to="/signup">
          <button className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </Link>
      </nav>
      <nav className="w-full h-[60px] px-6 flex justify-between items-center bg-white text-gray-800">
        {/* Left Side - Logo */}
        <h1 className="text-2xl font-bold text-red-600">UpSkill</h1>

        {/* Center - Navigation Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-red-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Courses
          </a>
          <a href="#" className="hover:text-red-600 transition">
            About
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Contact
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Blog
          </a>
        </div>

        {/* Right Side - Buttons */}
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-[#EE2C3C] text-white font-semibold rounded-lg hover:bg-red-700 transition">
              Login
            </button>
          </Link>
          <Link to="/mentor">
            <button className="px-4 py-2 bg-blue-950 text-white font-semibold rounded-lg ">
              Become a Mentor
            </button>
          </Link>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="relative h-100 w-full mt-1">
        <img
          src="../../public/images/banner.jpg"
          alt="Banner"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <button className="px-6 py-3 bg-white text-red-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://source.unsplash.com/300x200/?learning"
            alt="Learning"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-red-600">
              Learn Anytime
            </h3>
            <p className="text-gray-600 text-sm">
              Access quality courses anytime at your convenience.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://source.unsplash.com/300x200/?mentor"
            alt="Mentor"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-red-600">
              Expert Mentors
            </h3>
            <p className="text-gray-600 text-sm">
              Learn from experienced mentors in the industry.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://source.unsplash.com/300x200/?certificate"
            alt="Certificate"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-red-600">
              Certifications
            </h3>
            <p className="text-gray-600 text-sm">
              Get certified and boost your career opportunities.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://source.unsplash.com/300x200/?community"
            alt="Community"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-red-600">
              Active Community
            </h3>
            <p className="text-gray-600 text-sm">
              Be part of a supportive learning community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
