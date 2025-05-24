import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Check, AlertCircle, X } from 'lucide-react';

const Notification = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    let timer;
    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const Icon = type === 'success' ? Check : AlertCircle;
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconBgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div 
      className={`fixed top-4 right-4 max-w-sm w-full ${bgColor} border ${borderColor} rounded-lg shadow-md z-50 transform transition-all duration-500 ease-in-out`}
      style={{ animation: 'notification-slide-in 0.4s ease-out forwards' }}
    >
      <div className="p-4 flex items-start">
        <div className={`flex-shrink-0 ${iconBgColor} p-1 rounded-full mr-3`}>
          <Icon size={18} className={iconColor} />
        </div>
        <div className="flex-1 ml-2">
          <div className={`text-sm font-medium ${textColor}`}>{message}</div>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>

      <style jsx>{`
        @keyframes notification-slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Notification;
