import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };

const handleLogout = () => {
  localStorage.removeItem("token"); // if stored in localStorage
  navigate("/login"); // or window.location.href = "/login"
};

  return (
    <header 
      className={`sticky top-0 z-50 shadow-md ${
        isAdmin ? 'bg-admin-700 text-white' : 'bg-primary-700 text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Logo />
            <h1 className="text-xl font-bold hidden md:block">LearnHub</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <Link to="/courses" className="hover:text-gray-200 transition-colors">Courses</Link>
            {isAuthenticated && (
              <>
                {user?.role === 'student' && (
                  <Link to="/dashboard" className="hover:text-gray-200 transition-colors">My Learning</Link>
                )}
                {user?.role === 'mentor' && (
                  <Link to="/mentor/dashboard" className="hover:text-gray-200 transition-colors">Mentor Dashboard</Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="hover:text-gray-200 transition-colors">Admin Dashboard</Link>
                )}
              </>
            )}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to="/notifications" className="hover:text-gray-200">
                  <Bell size={20} />
                </Link>
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      {user?.profilePicture ? (
                        <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-gray-700" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 transform group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                      <button 
                        onClick={handleLogout} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link 
                  to="/login" 
                  className={`py-2 px-4 rounded-md ${
                    isAdmin 
                      ? 'bg-white text-admin-700 hover:bg-gray-100' 
                      : 'bg-white text-primary-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`py-2 px-4 rounded-md border ${
                    isAdmin 
                      ? 'border-white text-white hover:bg-admin-600' 
                      : 'border-white text-white hover:bg-primary-600'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-gray-200" onClick={toggleMenu}>Home</Link>
              <Link to="/courses" className="hover:text-gray-200" onClick={toggleMenu}>Courses</Link>
              {isAuthenticated && (
                <>
                  {user?.role === 'student' && (
                    <Link to="/dashboard" className="hover:text-gray-200" onClick={toggleMenu}>My Learning</Link>
                  )}
                  {user?.role === 'mentor' && (
                    <Link to="/mentor/dashboard" className="hover:text-gray-200" onClick={toggleMenu}>Mentor Dashboard</Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard" className="hover:text-gray-200" onClick={toggleMenu}>Admin Dashboard</Link>
                  )}
                  <Link to="/profile" className="hover:text-gray-200" onClick={toggleMenu}>Profile</Link>
                  <Link to="/settings" className="hover:text-gray-200" onClick={toggleMenu}>Settings</Link>
                  <button 
                    onClick={() => { handleLogout(); toggleMenu(); }} 
                    className="flex items-center space-x-2 text-left hover:text-gray-200"
                  >
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link 
                    to="/login" 
                    className={`py-2 px-4 rounded-md text-center ${
                      isAdmin 
                        ? 'bg-white text-admin-700' 
                        : 'bg-white text-primary-700'
                    }`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`py-2 px-4 rounded-md border text-center ${
                      isAdmin 
                        ? 'border-white text-white' 
                        : 'border-white text-white'
                    }`}
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;