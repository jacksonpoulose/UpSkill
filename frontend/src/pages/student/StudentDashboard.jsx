import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Clock 
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ProgressCard from '../../components/dashboard/ProgressCard';
import CourseCard from '../../components/dashboard/CourseCard';
import AssignmentCard from '../../components/dashboard/AssignmentCard';
import MentorCard from '../../components/dashboard/MentorCard';
import UpcomingScheduleCard from '../../components/dashboard/UpcomingScheduleCard';
import Navbar from '../../components/common/Navbar';

const StudentDashboard= () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Mock data
  const studentName = "Alex Johnson";
  const enrolledCourses = [
    {
      id: "course1",
      title: "Web Development Fundamentals",
      instructor: "Sarah Miller",
      coverImage: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 68,
      totalModules: 12,
      completedModules: 8,
      nextLesson: "CSS Grid and Flexbox Deep Dive",
      estimatedTime: "25 min"
    },
    {
      id: "course2",
      title: "Data Science Essentials",
      instructor: "David Chen",
      coverImage: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 42,
      totalModules: 10,
      completedModules: 4,
      nextLesson: "Introduction to Machine Learning Algorithms",
      estimatedTime: "40 min"
    }
  ];
  
  const upcomingAssignments = [
    {
      id: "assign1",
      title: "Responsive Portfolio Project",
      course: "Web Development Fundamentals",
      dueDate: "Tomorrow",
      timeRemaining: "18 hours left",
      isUrgent: true,
      status: "pending"
    },
    {
      id: "assign2",
      title: "Data Visualization Challenge",
      course: "Data Science Essentials",
      dueDate: "May 15, 2025",
      timeRemaining: "5 days left",
      isUrgent: false,
      status: "pending"
    }
  ];
  
  const mentor = {
    name: "Dr. Michael Rodriguez",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Full Stack Development & AI",
    rating: 4.8,
    nextSession: {
      date: "May 12, 2025",
      time: "3:00 PM",
      topic: "Career Growth & Portfolio Review"
    },
    availableSlots: 3
  };
  
  const scheduleItems = [
    {
      id: "sched1",
      title: "Interactive JavaScript Workshop",
      type: "class",
      date: "Today",
      time: "11:00 AM",
      duration: "1h 30m"
    },
    {
      id: "sched2",
      title: "Responsive Portfolio Project Due",
      type: "assignment",
      date: "Tomorrow",
      time: "11:59 PM",
      duration: "deadline"
    },
    {
      id: "sched3",
      title: "Mentoring Session: Career Growth",
      type: "mentoring",
      date: "May 12, 2025",
      time: "3:00 PM",
      duration: "45m"
    }
  ];
  
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
  
  return (
    <div>
     
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
          username={studentName} 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="text-sm text-gray-500">Last updated: Today, 9:41 AM</div>
            </div>
            
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <ProgressCard 
                title="Courses in Progress" 
                progress={2} 
                total={2} 
                unit="courses"
                icon={<BookOpen size={18} className="text-blue-600" />}
                color="bg-blue-100"
              />
              <ProgressCard 
                title="Assignments Completed" 
                progress={14} 
                total={18} 
                unit="assignments"
                icon={<FileText size={18} className="text-yellow-600" />}
                color="bg-yellow-100"
              />
              <ProgressCard 
                title="Hours of Learning" 
                progress={26} 
                total={40} 
                unit="hours"
                icon={<Clock size={18} className="text-green-600" />}
                color="bg-green-100"
              />
              <ProgressCard 
                title="Certificates Earned" 
                progress={1} 
                total={3} 
                unit="certificates"
                icon={<GraduationCap size={18} className="text-purple-600" />}
                color="bg-purple-100"
              />
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Current Courses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {enrolledCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                </div>
                
                {/* Assignments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Assignments</h2>
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {upcomingAssignments.map((assignment) => (
                      <AssignmentCard 
                        key={assignment.id} 
                        {...assignment} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Mentor */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Mentor</h2>
                  <MentorCard {...mentor} />
                </div>
                
                {/* Upcoming Schedule */}
                <UpcomingScheduleCard scheduleItems={scheduleItems} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;