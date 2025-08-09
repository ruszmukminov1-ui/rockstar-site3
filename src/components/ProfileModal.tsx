import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Key, Copy, Check, LogOut, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storageUtils } from '../utils/storage';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setCurrentUser, t } = useApp();
  const [theme, setTheme] = useState<'old' | 'new'>('new');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('rockstar_theme') as 'old' | 'new';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const applyTheme = (selectedTheme: 'old' | 'new') => {
    const root = document.documentElement;
    
    if (selectedTheme === 'old') {
      // Старый дизайн - более яркие неоновые цвета
      root.style.setProperty('--primary-gradient', 'linear-gradient(90deg, #00ff41, #00d4ff)');
      root.style.setProperty('--secondary-gradient', 'linear-gradient(90deg, #ff0080, #ff8c00)');
      root.style.setProperty('--accent-color', '#00ff41');
      root.style.setProperty('--glow-color', 'rgba(0, 255, 65, 0.5)');
      root.style.setProperty('--border-color', 'rgba(0, 255, 65, 0.3)');
    } else {
      // Новый дизайн - текущие фиолетово-розовые цвета
      root.style.setProperty('--primary-gradient', 'linear-gradient(90deg, #a855f7, #ec4899)');
      root.style.setProperty('--secondary-gradient', 'linear-gradient(90deg, #8b5cf6, #f59e0b)');
      root.style.setProperty('--accent-color', '#a855f7');
      root.style.setProperty('--glow-color', 'rgba(168, 85, 247, 0.5)');
      root.style.setProperty('--border-color', 'rgba(168, 85, 247, 0.3)');
    }
  };

  const handleThemeChange = (newTheme: 'old' | 'new') => {
    setTheme(newTheme);
    localStorage.setItem('rockstar_theme', newTheme);
    applyTheme(newTheme);
  };

  const handleLogout = () => {
    storageUtils.clearCurrentUser();
    setCurrentUser(null);
    onClose();
  };

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0, originX: 0.1, originY: 0.1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, originX: 0.1, originY: 0.1 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.4
          }}
          className="relative w-full max-w-sm md:max-w-lg bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            boxShadow: '0 0 50px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-3 md:mb-4"
              >
                <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Профиль
              </h2>
            </div>

            {/* Theme Switcher */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Тема оформления</h3>
              </div>
              <div className="flex bg-gray-800/50 rounded-full p-1 border border-purple-500/30">
                <button
                  onClick={() => handleThemeChange('new')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                    theme === 'new'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Новый дизайн
                </button>
                <button
                  onClick={() => handleThemeChange('old')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                    theme === 'old'
                      ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg shadow-green-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Старый дизайн
                </button>
              </div>
            </div>

            {/* User Info */}
            {currentUser ? (
              <div className="space-y-4 md:space-y-6">
                {/* Account Info */}
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Информация об аккаунте</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-purple-400">Email:</span> {currentUser.email}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-purple-400">Дата регистрации:</span>{' '}
                      {new Date(currentUser.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>

                {/* Purchased Products */}
                <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-600/30 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Мои продукты</h3>
                  
                  {currentUser.purchasedProducts.length === 0 ? (
                    <div className="text-center py-4">
                      <Key size={32} className="mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-400">У вас пока нет приобретенных продуктов</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentUser.purchasedProducts.map((product, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-3 md:p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-purple-400">{product.title}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(product.purchaseDate).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-300 mb-3">
                            <p>Версия: {product.version}</p>
                            <p>Срок: {product.duration}</p>
                            {product.minecraftVersion && (
                              <p>Minecraft: {product.minecraftVersion}</p>
                            )}
                          </div>

                          {product.accessKey && (
                            <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Key size={16} className="text-yellow-400" />
                                  <span className="text-xs text-gray-400">Ключ доступа:</span>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(product.accessKey!)}
                                  className={`p-1.5 rounded-md transition-all duration-300 ${
                                    copiedKey === product.accessKey
                                      ? 'bg-green-600 text-white'
                                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                  }`}
                                  title="Скопировать ключ"
                                >
                                  {copiedKey === product.accessKey ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                              </div>
                              <p className="font-mono text-yellow-300 text-sm mt-2 break-all">
                                {product.accessKey}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={18} />
                  <span>Выйти из аккаунта</span>
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-8">
                <User size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400 mb-4">Вы не авторизованы</p>
                <p className="text-gray-500 text-sm">Войдите в аккаунт, чтобы увидеть свой профиль</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;