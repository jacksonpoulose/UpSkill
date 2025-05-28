import React from 'react';
import { PlayCircle, Clock, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const CourseCard = ({
  id,
  title,
  instructor,
  coverImage,
  progress,
  totalModules,
  completedModules,
  nextLesson,
  estimatedTime
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-300">by {instructor}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-800 mb-1">Next up:</h4>
          <div className="flex items-start">
            <PlayCircle size={16} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-2">{nextLesson}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <CheckCircle size={14} className="mr-1" />
            <span>{completedModules}/{totalModules} modules</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{estimatedTime}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="red" 
            size="sm" 
            fullWidth 
            className="mt-2"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;