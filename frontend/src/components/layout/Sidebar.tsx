import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Users, Settings, BarChart2, 
  DollarSign, Bookmark, Award, ChevronRight, ChevronLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  
  if (!user) return null;

  const sidebarLinks = {
    admin: [
      { path: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
      { path: '/admin/courses', icon: <BookOpen size={20} />, label: 'Manage Courses' },
      { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
      { path: '/admin/mentors', icon: <Award size={20} />, label: 'Mentors' },
      { path: '/admin/payments', icon: <DollarSign size={20} />, label: 'Payments' },
      { path: '/admin/reports', icon: <BarChart2 size={20} />, label: 'Reports' },
      { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
    ],
    mentor: [
      { path: '/mentor/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
      { path: '/mentor/courses', icon: <BookOpen size={20} />, label: 'My Courses' },
      { path: '/mentor/students', icon: <Users size={20} />, label: 'Students' },
    ],
    student: [
      { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
      { path: '/courses', icon: <BookOpen size={20} />, label: 'All Courses' },
      { path: '/my-courses', icon: <Bookmark size={20} />, label: 'My Courses' },
      { path: '/certificates', icon: <Award size={20} />, label: 'Certificates' },
    ],
  };

  const activeLinks = sidebarLinks[user.role] || [];

  const linkClasses = (isActive: boolean) => {
    return `flex items-center p-3 rounded-md transition-colors ${
      isActive
        ? isAdmin
          ? 'bg-admin-100 text-admin-800'
          : 'bg-primary-100 text-primary-800'
        : 'hover:bg-gray-100'
    }`;
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 h-[calc(100vh-64px)] bg-white border-r border-gray-200 overflow-y-auto sticky top-16`}
    >
      <div className="p-4 sticky top-0 bg-white z-10 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {activeLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => linkClasses(isActive)}
              >
                <span>{link.icon}</span>
                {!collapsed && <span className="ml-3">{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;