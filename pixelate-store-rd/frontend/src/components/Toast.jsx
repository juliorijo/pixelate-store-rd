import React from 'react';
import { ToastContext } from '../context/ToastContext';
import { FiCheck, FiX, FiInfo, FiAlertCircle } from 'react-icons/fi';

const Toast = () => {
  const { toasts, removeToast } = React.useContext(ToastContext);

  const getStyles = (type) => {
    const baseStyles = 'fixed right-4 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-right text-white font-semibold max-w-sm z-50';
    const typeStyles = {
      success: 'bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-300',
      error: 'bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-300',
      info: 'bg-gradient-to-r from-blue-500 to-blue-600 border-l-4 border-blue-300',
      warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-l-4 border-yellow-300',
    };
    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getIcon = (type) => {
    const iconProps = { size: 24, className: 'flex-shrink-0' };
    switch (type) {
      case 'success':
        return <FiCheck {...iconProps} />;
      case 'error':
        return <FiX {...iconProps} />;
      case 'warning':
        return <FiAlertCircle {...iconProps} />;
      default:
        return <FiInfo {...iconProps} />;
    }
  };

  return (
    <div className="fixed right-0 top-20 pointer-events-none z-50">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={getStyles(toast.type)}
          style={{
            animation: `slideInRight 0.3s ease-out forwards`,
            marginTop: `${index * 90}px`,
            pointerEvents: 'auto',
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            {getIcon(toast.type)}
            <span className="text-sm">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:opacity-75 transition ml-2 flex-shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        .animate-fade-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Toast;
