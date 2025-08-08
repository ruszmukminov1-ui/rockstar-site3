import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, X } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import { PurchasedProduct } from '../types/User';

interface KeyInputModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const KeyInputModal: React.FC<KeyInputModalProps> = ({ onClose, onSuccess }) => {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!accessKey.trim()) {
      setError('Введите ключ доступа');
      setIsLoading(false);
      return;
    }

    // Simulate key validation
    setTimeout(() => {
      const currentUser = storageUtils.getCurrentUser();
      if (!currentUser) {
        setError('Пользователь не найден');
        setIsLoading(false);
        return;
      }

      // For demo purposes, accept any key that looks like a valid format
      if (accessKey.length < 8) {
        setError('Неверный формат ключа');
        setIsLoading(false);
        return;
      }

      // Add a demo product to user's account
      const demoProduct: PurchasedProduct = {
        id: 1,
        title: "Rockstar 2.0",
        version: "2.0.1",
        duration: "Навсегда",
        ramSize: "8 ГБ",
        purchaseDate: new Date().toISOString(),
      };

      // Update user with the key and product
      const updatedUser = {
        ...currentUser,
        accessKey: accessKey,
        purchasedProducts: [demoProduct]
      };

      storageUtils.saveUser(updatedUser);
      storageUtils.setCurrentUser(updatedUser);

      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md p-8 bg-gray-900/95 backdrop-blur-md border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/25"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          boxShadow: '0 0 50px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mb-4"
          >
            <Key className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Введите ключ
          </h2>
          <p className="text-gray-400 mt-2">
            Введите ключ, полученный после покупки
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg"
          >
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Введите ваш ключ доступа"
              value={accessKey}
              onChange={(e) => {
                setAccessKey(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-center"
              required
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Проверка...</span>
              </div>
            ) : (
              'Активировать'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default KeyInputModal;