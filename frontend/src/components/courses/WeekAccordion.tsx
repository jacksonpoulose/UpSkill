import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Download, Check } from 'lucide-react';
import { Week } from '../../types';

interface WeekAccordionProps {
  weeks: Week[];
  currentWeek?: number;
  completedWeeks?: number[];
}

const WeekAccordion: React.FC<WeekAccordionProps> = ({
  weeks,
  currentWeek = 1,
  completedWeeks = [],
}) => {
  const [activeWeek, setActiveWeek] = useState<number | null>(currentWeek);

  const toggleWeek = (weekNumber: number) => {
    setActiveWeek(activeWeek === weekNumber ? null : weekNumber);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
      
      {weeks.map((week) => {
        const isActive = activeWeek === week.weekNumber;
        const isCompleted = completedWeeks.includes(week.weekNumber);
        const isCurrent = currentWeek === week.weekNumber;
        
        return (
          <div 
            key={week.weekNumber}
            className={`border rounded-md overflow-hidden transition-all duration-200
              ${isActive ? 'shadow-md' : ''}
              ${isCurrent && !isCompleted ? 'border-primary-300 ring-1 ring-primary-100' : 'border-gray-200'}
              ${isCompleted ? 'bg-gray-50' : ''}
            `}
          >
            <div 
              className={`flex items-center justify-between px-5 py-4 cursor-pointer
                ${isActive ? 'bg-gray-50' : ''}
              `}
              onClick={() => toggleWeek(week.weekNumber)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm
                      ${isCompleted 
                        ? 'bg-success-100 text-success-700 border border-success-200' 
                        : isCurrent 
                          ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'}
                    `}
                  >
                    {isCompleted ? <Check size={14} /> : week.weekNumber}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Week {week.weekNumber}: {week.title}</h4>
                </div>
              </div>
              <div>
                {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {isActive && (
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 animate-slide-down">
                <p className="text-gray-600 mb-4">{week.description}</p>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <FileText size={18} className="text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium text-sm">Week {week.weekNumber} Syllabus</p>
                      <p className="text-xs text-gray-500">PDF • Updated {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a
                    href={week.syllabusPdf}
                    download
                    className="flex items-center text-primary-600 hover:text-primary-700 p-1.5 rounded-md hover:bg-primary-50"
                  >
                    <Download size={16} />
                  </a>
                </div>
                
                {week.tasks && week.tasks.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Tasks & Assignments</h5>
                    <ul className="space-y-2">
                      {week.tasks.map((task) => (
                        <li key={task._id} className="flex items-center">
                          <div className="w-4 h-4 mr-2 border border-gray-300 rounded-sm"></div>
                          <span>{task.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeekAccordion;