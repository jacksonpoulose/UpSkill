import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false 
}) => {
  const baseClasses = 'rounded-lg overflow-hidden bg-white shadow-sm';
  
  const variantClasses = {
    default: '',
    primary: 'border-l-4 border-primary-500',
    admin: 'border-l-4 border-admin-500',
  };
  
  const hoverClass = hover ? 'transition-all duration-300 hover:shadow-md' : '';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'border-b border-gray-200',
    primary: 'bg-primary-50 border-b border-primary-100',
    admin: 'bg-admin-50 border-b border-admin-100',
  };
  
  return (
    <div className={`px-6 py-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
