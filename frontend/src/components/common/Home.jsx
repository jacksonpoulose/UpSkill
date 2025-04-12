import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice"; // adjust the path if needed

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-red-600 flex flex-col items-center">
      {/* Top Navbar */}
      <nav className="w-full h-[50px] px-6 flex justify-between items-center bg-amber-50 text-gray-800">
        <div className="flex items-center space-x-4">
          <FaInstagram className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
          <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" size={20} />
          <div className="h-6 w-[1.5px] bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-gray-600" size={18} />
            <span className="text-gray-700 font-semibold">+91 98765 43210</span>
          </div>
        </div>

        {!user && (
          <Link to="/register">
            <button className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </Link>
        )}
      </nav>

      {/* Main Navbar */}
      <nav className="w-full h-[60px] px-6 flex justify-between items-center bg-white text-gray-800">
        <h1 className="text-2xl font-bold text-red-600">UpSkill</h1>

        <div className="flex space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-red-600 transition">Home</a>
          <a href="#" className="hover:text-red-600 transition">Courses</a>
          <a href="#" className="hover:text-red-600 transition">About</a>
          <a href="#" className="hover:text-red-600 transition">Contact</a>
          <a href="#" className="hover:text-red-600 transition">Blog</a>
        </div>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-[#EE2C3C] text-white font-semibold rounded-lg hover:bg-red-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/mentor">
                <button className="px-4 py-2 bg-[#1C0C3F] text-white font-semibold rounded-lg">
                  Become a Mentor
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Banner Section */}
      <div className="w-full mt-1 h-[500px] flex">
        <div className="w-[60%] relative">
          <img
            src="https://t3.ftcdn.net/jpg/02/96/07/04/360_F_296070498_zxCQFWTAdhAZZE58T1N0iW4ey28Xfl3V.jpg"
            alt="Banner"
            className="w-full h-full object-cover shadow-lg"
          />
          <div className="absolute inset-0 bg-[#1C0C3F] bg-opacity-50 flex flex-col justify-center items-start p-10 rounded-l-lg">
            <h1 className="text-5xl ms-5 font-extrabold text-white mb-6">
              Guided Learning, <br /> <br /> Guaranteed Success!
            </h1>
            <button className="ms-10 px-6 py-3 bg-[#EE2C3C] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="w-[40%]">
          <img
            src="https://t3.ftcdn.net/jpg/02/96/07/04/360_F_296070498_zxCQFWTAdhAZZE58T1N0iW4ey28Xfl3V.jpg"
            alt="Banner"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
        {/* Repeat Cards */}
        {[
          {
            title: "Learn Anytime",
            description: "Access quality courses anytime at your convenience.",
            image: "https://media.istockphoto.com/id/1195647237/photo/time-to-learn-educational-clock-concept.jpg?s=612x612&w=0&k=20&c=n6Enj5hLz6aS2HpnoI_saAFA1jAJd_awYtnFm_u3nr0=",
          },
          {
            title: "Expert Mentors",
            description: "Learn from experienced mentors in the industry.",
            image: "https://www.sincera.in/wp-content/uploads/2017/05/what-is-mentoring.jpg",
          },
          {
            title: "Certifications",
            description: "Get certified and boost your career opportunities.",
            image: "https://source.unsplash.com/300x200/?certificate",
          },
          {
            title: "Active Community",
            description: "Be part of a supportive learning community.",
            image: "https://source.unsplash.com/300x200/?community",
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-red-600">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
