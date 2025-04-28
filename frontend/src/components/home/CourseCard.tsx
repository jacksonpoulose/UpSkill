import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '../../types';
import Card from '../common/Card';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course,
  isEnrolled = false,
  progress = 0
}) => {
  return (
    <Card 
      hover 
      className="h-full flex flex-col transition-transform duration-300 hover:scale-[1.01]"
    >
      <div className="relative">
        {isEnrolled && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Enrolled
          </div>
        )}
        <Link to={`/courses/${course._id}`}>
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        {isEnrolled && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-primary-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">
            {course.category}
          </span>
        </div>
        
        <Link to={`/courses/${course._id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{course.duration} weeks</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen size={14} className="mr-1" />
            <span>{course.syllabus.length} modules</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="font-bold text-lg text-gray-900">
            ${course.price.toFixed(2)}
          </p>
          
          <Link 
            to={isEnrolled ? `/my-courses/${course._id}` : `/courses/${course._id}`} 
            className={`px-3 py-1.5 rounded-md text-sm font-medium
              ${isEnrolled 
                ? 'bg-primary-100 text-primary-700 hover:bg-primary-200' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
          >
            {isEnrolled ? 'Continue Learning' : 'View Course'}
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;