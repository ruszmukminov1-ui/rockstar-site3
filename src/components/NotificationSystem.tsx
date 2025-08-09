import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Copy, Check } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  accessKey?: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onRemove
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[100] max-w-sm space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
            copiedKey={copiedKey}
            onCopyKey={copyToClipboard}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
  copiedKey: string | null;
  onCopyKey: (key: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
  copiedKey,
  onCopyKey
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, notification.duration || 4000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onRemove]);

  const getNotificationStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-900/90 border-green-500/50 shadow-green-500/25';
      case 'error':
        return 'bg-red-900/90 border-red-500/50 shadow-red-500/25';
      default:
        return 'bg-purple-900/90 border-purple-500/50 shadow-purple-500/25';
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-purple-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -100, scale: 0.8, rotateX: 90 }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.6
      }}
      className={`
        relative p-4 rounded-xl backdrop-blur-md border shadow-2xl
        ${getNotificationStyles()}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
      }}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`p-2 rounded-full ${getIconColor()}`}
        >
          <CheckCircle className="w-5 h-5 text-white" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold mb-1">{notification.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
          
          {notification.accessKey && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 border border-yellow-500/30 rounded-lg p-3 mt-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-yellow-400 font-semibold">Ваш ключ доступа:</span>
                <button
                  onClick={() => onCopyKey(notification.accessKey!)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-semibold transition-all duration-300 ${
                    copiedKey === notification.accessKey
                      ? 'bg-green-600 text-white'
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  {copiedKey === notification.accessKey ? (
                    <>
                      <Check size={12} />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-yellow-300 text-sm break-all">
                {notification.accessKey}
              </p>
            </motion.div>
          )}
        </div>
        
        <button
          onClick={() => onRemove(notification.id)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Неоновое свечение */}
      <div className={`
        absolute inset-0 rounded-xl opacity-30 blur-md -z-10
        ${notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-purple-500'}
      `} />
      
      {/* Progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: (notification.duration || 4000) / 1000, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-purple-500'
        }`}
      />
    </motion.div>
  );
};

export default NotificationSystem;