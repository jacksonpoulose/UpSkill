import React from 'react';
import { MessageCircle, Calendar, Clock } from 'lucide-react';
import Button from '../common/Button';

// interface MentorCardProps {
//   name: string;
//   avatar: string;
//   specialization: string;
//   rating: number;
//   nextSession: {
//     date: string;
//     time: string;
//     topic: string;
//   } | null;
//   availableSlots: number;
// }

const MentorCard= ({
  name,
  avatar,
  specialization,
  rating,
  nextSession,
  availableSlots
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5">
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="h-16 w-16 rounded-full object-cover border-2 border-red-100"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{specialization}</p>
            
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {nextSession ? (
          <div className="mt-5 bg-red-50 rounded-lg p-4 border border-red-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Next Mentoring Session</h4>
            <div className="flex items-center text-sm text-gray-700 mb-1">
              <Calendar size={14} className="mr-2 text-red-600" />
              <span>{nextSession.date}</span>
              <Clock size={14} className="ml-4 mr-2 text-red-600" />
              <span>{nextSession.time}</span>
            </div>
            <p className="text-sm text-gray-700">Topic: {nextSession.topic}</p>
            
            <div className="mt-3 flex space-x-2">
              <Button 
                variant="red" 
                size="sm"
              >
                Join Session
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                Reschedule
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-5 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              No upcoming sessions scheduled. 
              {availableSlots > 0 && ` ${availableSlots} slots available this week.`}
            </p>
            <Button 
              variant="red" 
              size="sm"
            >
              Schedule Session
            </Button>
          </div>
        )}
        
        <div className="mt-5 flex">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center justify-center"
            leftIcon={<MessageCircle size={16} />}
          >
            Message
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 ml-2"
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;