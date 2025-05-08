import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Users, Settings } from 'lucide-react';
import Logo from '../common/Logo';

const Sidebar = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <GraduationCap size={20} />, label: 'Courses', path: '/admin/courses' },
    { icon: <Users size={20} />, label: 'Students', path: '/admin/students' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Logo size="medium" />
          <span className="text-xl font-bold text-gray-900">Admin</span>
        </div>
      </div>

      <nav className="mt-6">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50
              ${isActive ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : ''}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
