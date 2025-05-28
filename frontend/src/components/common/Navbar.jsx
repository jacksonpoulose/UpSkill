import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, Info, Menu, X,BookOpen } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/courses', label: 'Our Courses', icon: <BookOpen size={18} /> },
    { path: '/studentdashboard', label: 'Student Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/about', label: 'About Us', icon: <Info size={18} /> },

  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo size="large" />
            <h1 className="text-2xl font-bold text-gray-900">Upskill.com</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-red-600 font-medium bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, {username} 👋</span>
                <Button
                  variant="outline"
                  size="md"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="text"
                  size="md"
                  className="text-gray-700 hover:text-red-600"
                  as={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  as={Link}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </>
            )}

            <Button
              variant="red"
              size="md"
              className="bg-red-600 text-white hover:bg-red-700"
              as={Link}
              to="/mentor/register"
            >
              Become a Mentor
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 mt-4 animate-fade-in-down">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-red-600 font-medium bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 mt-4">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <p className="text-gray-700 font-medium">Welcome, {username} 👋</p>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="text"
                    size="md"
                    className="w-full text-left text-gray-700 hover:text-red-600"
                    as={Link}
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                    as={Link}
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              <Button
                variant="red"
                size="md"
                className="w-full bg-red-600 text-white hover:bg-red-700 mt-3"
                as={Link}
                to="/become-mentor"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Mentor
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
