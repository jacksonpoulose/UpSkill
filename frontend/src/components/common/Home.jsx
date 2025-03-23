import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-red-600 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-red-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">UpSkill</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </button>
          <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-red-800 font-semibold rounded-lg hover:bg-yellow-300 transition">
            Become a Mentor
          </button>
        </div>
      </nav>
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-red-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">UpSkill</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </button>
          <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-red-800 font-semibold rounded-lg hover:bg-yellow-300 transition">
            Become a Mentor
          </button>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="relative w-full max-w-5xl mt-10">
        <img
          src="https://source.unsplash.com/1200x500/?education,learning"
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
