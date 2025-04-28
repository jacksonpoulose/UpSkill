import React from 'react';
import { CheckCircle, Clock, Calendar, Award, Users } from 'lucide-react';
import { Course } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface CourseDetailCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: () => void;
  isEnrolling?: boolean;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({
  course,
  isEnrolled = false,
  onEnroll,
  isEnrolling = false,
}) => {
  const features = [
    'Access to all course materials',
    'Weekly syllabus & assignments',
    'Certificate of completion',
    'Dedicated mentor support',
    'Lifetime course updates',
  ];

  return (
    <Card className="sticky top-20">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">${course.price.toFixed(2)}</h3>
        </div>

        {isEnrolled ? (
          <Button
            variant="primary"
            fullWidth
            leftIcon={<Award size={18} />}
          >
            Continue Learning
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            leftIcon={<Award size={18} />}
            onClick={onEnroll}
            isLoading={isEnrolling}
          >
            Enroll Now
          </Button>
        )}
      </div>

      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-4">This course includes:</h4>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-center">
            <Clock size={18} className="text-gray-500 mr-3" />
            <span>{course.duration} weeks of content</span>
          </li>
          <li className="flex items-center">
            <Calendar size={18} className="text-gray-500 mr-3" />
            <span>Weekly syllabus updates</span>
          </li>
          <li className="flex items-center">
            <Award size={18} className="text-gray-500 mr-3" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center">
            <Users size={18} className="text-gray-500 mr-3" />
            <span>Dedicated mentor support</span>
          </li>
        </ul>
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">What you'll get:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={16} className="text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CourseDetailCard;