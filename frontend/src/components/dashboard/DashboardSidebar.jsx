import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  User, 
  Settings,
  LogOut
} from 'lucide-react';

// interface SidebarLinkProps {
//   to: string;
//   icon: React.ReactNode;
//   label: string;
// }

const SidebarLink = ({ to, icon, label }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => 
      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
        isActive 
          ? 'bg-red-100 text-red-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`
    }
  >
    <span className="flex-shrink-0">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

const DashboardSidebar= () => {
  const navigationLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { to: '/dashboard/courses', icon: <GraduationCap size={20} />, label: 'My Courses' },
    { to: '/dashboard/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
    { to: '/dashboard/mentor', icon: <MessageSquare size={20} />, label: 'My Mentor' },
    { to: '/dashboard/assignments', icon: <FileText size={20} />, label: 'Assignments' },
    { to: '/dashboard/resources', icon: <BookOpen size={20} />, label: 'Resources' },
    { to: '/dashboard/profile', icon: <User size={20} />, label: 'Profile' },
    { to: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-64 py-6 px-3 flex flex-col">
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <GraduationCap className="mr-2 text-red-600" /> 
          Student Portal
        </h2>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navigationLinks.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}
      </nav>
      
      <div className="pt-6 mt-6 border-t border-gray-200">
        <button className="flex items-center space-x-3 text-gray-600 hover:text-red-600 px-4 py-3 w-full transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;