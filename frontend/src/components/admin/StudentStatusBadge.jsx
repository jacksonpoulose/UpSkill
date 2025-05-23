import React from 'react';
import { BadgeCheck, UserX, Clock } from 'lucide-react';

const StudentStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <BadgeCheck size={14} className="mr-1" />,
          label: 'Active'
        };
      case 'inactive':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <UserX size={14} className="mr-1" />,
          label: 'Inactive'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <Clock size={14} className="mr-1" />,
          label: 'Pending'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: null,
          label: status || 'Unknown'
        };
    }
  };

  const { bg, text, icon, label } = getStatusConfig(status);

  return (
    <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${bg} ${text}`}>
      {icon}
      {label}
    </span>
  );
};

export default StudentStatusBadge;
