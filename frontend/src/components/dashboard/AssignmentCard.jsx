import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const AssignmentCard = ({
  id,
  title,
  course,
  dueDate,
  timeRemaining,
  isUrgent,
  status,
  grade
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'submitted':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'graded':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          badge: 'bg-green-100 text-green-800'
        };
      case 'overdue':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-100 text-red-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const styles = getStatusStyles();

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'To Do';
      case 'submitted':
        return 'Submitted';
      case 'graded':
        return `Graded: ${grade}`;
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  return (
    <div className={`rounded-lg ${styles.bg} ${styles.border} border p-4`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${styles.badge}`}>
            {getStatusText()}
          </span>
          <h3 className="text-gray-900 font-medium mt-1">{title}</h3>
          <p className="text-sm text-gray-600">{course}</p>
        </div>

        {isUrgent && status === 'pending' && (
          <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-medium">
            <AlertCircle size={14} className="mr-1" />
            Urgent
          </div>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-3 space-x-4">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>Due: {dueDate}</span>
        </div>

        {status === 'pending' && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{timeRemaining}</span>
          </div>
        )}
      </div>

      {status === 'pending' && (
        <div className="mt-3">
          <Button variant="outline" size="sm" className="mr-2">
            View Details
          </Button>
          <Button variant="red" size="sm">
            Start Assignment
          </Button>
        </div>
      )}

      {status === 'submitted' && (
        <div className="mt-3">
          <Button variant="outline" size="sm">
            View Submission
          </Button>
        </div>
      )}

      {status === 'graded' && (
        <div className="mt-3">
          <Button variant="outline" size="sm">
            View Feedback
          </Button>
        </div>
      )}

      {status === 'overdue' && (
        <div className="mt-3">
          <Button variant="outline" size="sm" className="mr-2">
            View Details
          </Button>
          <Button variant="red" size="sm">
            Submit Late
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
