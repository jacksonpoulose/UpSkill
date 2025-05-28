import React from 'react';
import { Clock } from 'lucide-react';

// interface ProgressCardProps {
//   title: string;
//   progress: number;
//   total: number;
//   unit: string;
//   icon: React.ReactNode;
//   color: string;
// }

const ProgressCard = ({ 
  title, 
  progress, 
  total, 
  unit,
  icon,
  color
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-gray-900">{progress}</span>
          <span className="text-sm text-gray-500 ml-1">/ {total}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-semibold inline-block text-gray-600">
              {percentage}% Complete
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{unit}</span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-gradient-to-r ${
              color.includes('red') ? 'from-red-500 to-red-600' : 
              color.includes('blue') ? 'from-blue-500 to-blue-600' : 
              color.includes('green') ? 'from-green-500 to-green-600' : 
              color.includes('purple') ? 'from-purple-500 to-purple-600' : 
              'from-gray-500 to-gray-600'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;