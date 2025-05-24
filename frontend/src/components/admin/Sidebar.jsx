import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  UserCog,
  GraduationCap,
  Folder,
  Layers,
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard /> },
    { label: 'Course Categories', path: '/admin/coursecategory', icon: <Folder /> },
    { label: 'Course Tracks', path: '/admin/tracks', icon: <Layers /> },
    { label: 'Courses', path: '/admin/courses', icon: <BookOpen /> },
    { label: 'Students', path: '/admin/students', icon: <Users /> },
    { label: 'Mentors', path: '/admin/mentors', icon: <UserCog /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings /> },
  ];
  

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed top-0 left-0">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Upskill Admin</span>
        </div>
      </div>
      <nav className="p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
