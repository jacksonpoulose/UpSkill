import React, { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';

// interface DashboardHeaderProps {
//   username: string;
//   toggleSidebar: () => void;
//   isMobile: boolean;
//   sidebarOpen: boolean;
// }

const DashboardHeader=({ 
  username, 
  toggleSidebar,
  isMobile,
  sidebarOpen
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const notifications = [
    { id: 1, message: 'New assignment for Web Development', time: '2 hours ago', read: false },
    { id: 2, message: 'Mentor replied to your question', time: '1 day ago', read: false },
    { id: 3, message: 'Weekly progress report available', time: '2 days ago', read: true },
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        <div className="relative max-w-xs w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search courses, resources..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-1 text-gray-600 hover:text-gray-900 focus:outline-none rounded-full hover:bg-gray-100"
          >
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <Bell size={20} />
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <button className="text-xs text-red-600 hover:text-red-800">Mark all as read</button>
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 hover:bg-gray-50 transition-colors ${notification.read ? 'opacity-70' : ''}`}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      {!notification.read && <span className="h-2 w-2 bg-red-500 rounded-full"></span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-gray-50 text-center">
                <button className="text-sm text-red-600 hover:text-red-800">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-medium text-sm">
            {username.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {username}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;