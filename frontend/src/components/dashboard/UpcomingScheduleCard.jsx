import React from 'react';
import { Calendar, Clock, Video, Users, ArrowRight } from 'lucide-react';

// interface ScheduleItem {
//   id: string;
//   title: string;
//   type: 'class' | 'assignment' | 'mentoring' | 'exam';
//   date,
//   time,
//   duration,
// }

// interface UpcomingScheduleCardProps {
//   scheduleItems: ScheduleItem[];
// }

const UpcomingScheduleCard = ({ scheduleItems }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'class':
        return <Video size={16} className="text-blue-500" />;
      case 'assignment':
        return <ArrowRight size={16} className="text-yellow-500" />;
      case 'mentoring':
        return <Users size={16} className="text-red-500" />;
      case 'exam':
        return <Clock size={16} className="text-purple-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };
  
  const getTypeClass = (type) => {
    switch (type) {
      case 'class':
        return 'border-blue-200 bg-blue-50';
      case 'assignment':
        return 'border-yellow-200 bg-yellow-50';
      case 'mentoring':
        return 'border-red-200 bg-red-50';
      case 'exam':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Schedule</h3>
        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
          View Calendar
        </button>
      </div>
      
      <div className="space-y-3">
        {scheduleItems.map((item) => (
          <div 
            key={item.id}
            className={`flex p-3 rounded-lg border ${getTypeClass(item.type)}`}
          >
            <div className="mr-3 mt-0.5">
              {getTypeIcon(item.type)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              <div className="flex items-center mt-1 text-xs text-gray-600">
                <Calendar size={12} className="mr-1" />
                <span className="mr-3">{item.date}</span>
                <Clock size={12} className="mr-1" />
                <span>{item.time} ({item.duration})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {scheduleItems.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <p>No upcoming events for today</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingScheduleCard;