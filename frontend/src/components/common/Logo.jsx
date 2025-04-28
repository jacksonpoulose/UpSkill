import React from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Logo = ({ size = 'medium' }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-4xl';
      case 'medium':
      default:
        return 'text-2xl';
    }
  };

  return (
    <div className="flex items-center">
      <div className={`${isAdmin ? 'text-admin-300' : 'text-primary-300'} ${getSizeClass()}`}>
        <BookOpen />
      </div>
    </div>
  );
};

export default Logo;
