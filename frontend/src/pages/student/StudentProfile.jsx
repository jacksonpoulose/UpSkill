import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Github, Globe, BookOpen, Award, Save, Menu, X } from 'lucide-react';
import Button from '../../components/common/Button';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

const StudentProfile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    learningGoals: 'Become a full-stack developer and build real-world applications',
    skillLevel: 'intermediate',
    githubLink: 'https://github.com/alexjohnson',
    portfolioLink: 'https://alexjohnson.dev'
  });

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      if (!newIsMobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
      if (newIsMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile updated:', formData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {(sidebarOpen || !isMobile) && (
        <div className={`${isMobile ? 'fixed inset-0 z-40 flex' : 'relative'}`}>
          {/* Overlay */}
          {isMobile && (
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75" 
              onClick={toggleSidebar}
            ></div>
          )}
          
          {/* Sidebar component */}
          <div className={`${isMobile ? 'relative flex-1 flex flex-col max-w-xs w-full' : ''} z-50`}>
            <DashboardSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          username={formData.name} 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              {/* Profile Header */}
              <div className="bg-red-600 rounded-t-lg px-6 py-8">
                <div className="flex items-center space-x-6">
                  <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-4xl font-bold border-4 border-white">
                    {formData.name.charAt(0)}
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                    <p className="text-red-100">Student</p>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skill Level
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="skillLevel"
                            value={formData.skillLevel}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Goals */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Goals</h2>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="learningGoals"
                        value={formData.learningGoals}
                        onChange={handleInputChange}
                        rows={4}
                        className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="What are your learning objectives?"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub Profile
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Github className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Portfolio Website
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="portfolioLink"
                            value={formData.portfolioLink}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    variant="red"
                    size="lg"
                    leftIcon={<Save size={18} />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;