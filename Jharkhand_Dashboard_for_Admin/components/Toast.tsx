import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Notification } from '../types';

interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success': return 'bg-white border-emerald-100 text-slate-800';
      case 'error': return 'bg-white border-red-100 text-slate-800';
      default: return 'bg-white border-blue-100 text-slate-800';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border animate-slideIn mb-3 min-w-[300px] ${getStyles()}`}>
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button onClick={() => onClose(notification.id)} className="text-slate-400 hover:text-slate-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;