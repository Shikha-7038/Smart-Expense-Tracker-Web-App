import { useState, useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle, FiX } from 'react-icons/fi';

const Alert = ({ type, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const config = {
    success: {
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      icon: <FiCheckCircle className="h-5 w-5 text-green-500" />
    },
    error: {
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      textColor: 'text-red-700',
      icon: <FiXCircle className="h-5 w-5 text-red-500" />
    },
    warning: {
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      icon: <FiAlertCircle className="h-5 w-5 text-yellow-500" />
    },
    info: {
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      icon: <FiInfo className="h-5 w-5 text-blue-500" />
    }
  };

  const currentConfig = config[type] || config.info;

  return (
    <div className={`${currentConfig.bgColor} border-l-4 ${currentConfig.borderColor} rounded-lg shadow-md mb-4`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {currentConfig.icon}
          <p className={`${currentConfig.textColor} font-medium`}>{message}</p>
        </div>
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Alert;