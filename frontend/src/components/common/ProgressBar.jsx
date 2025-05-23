import React from 'react';

const ProgressBar = ({ progress, color, height = 8 }) => {
  const boundedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div 
      className="w-full bg-gray-200 rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div 
        className={`${color} transition-all duration-300 ease-in-out`} 
        style={{ 
          width: `${boundedProgress}%`,
          height: '100%'
        }}
      />
      <div className="text-xs font-medium text-gray-500 mt-1">{boundedProgress}%</div>
    </div>
  );
};

export default ProgressBar;
