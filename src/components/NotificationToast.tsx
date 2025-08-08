import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type,
  isVisible,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-6 right-6 z-[100] max-w-sm"
        >
          <div className={`
            relative p-4 rounded-xl backdrop-blur-md border shadow-2xl
            ${type === 'success' 
              ? 'bg-green-900/90 border-green-500/50 shadow-green-500/25' 
              : 'bg-red-900/90 border-red-500/50 shadow-red-500/25'
            }
          `}>
            <div className="flex items-center space-x-3">
              <div className={`
                p-2 rounded-full
                ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
              `}>
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-white font-semibold flex-1">{message}</p>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Неоновое свечение */}
            <div className={`
              absolute inset-0 rounded-xl opacity-30 blur-md -z-10
              ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            `} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;