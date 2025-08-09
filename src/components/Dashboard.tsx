import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowLeft, Download, Clock, HardDrive, Shield, Key, Monitor, Settings } from 'lucide-react';
import { User as UserType } from '../types/User';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  user: UserType;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onBack }) => {
  const { t, openProductDetailsModal } = useApp();

  const handleProductClick = (product: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    openProductDetailsModal(product, clickPosition);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-16 md:pt-20 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm md:text-base">{t('dashboard.back')}</span>
            </button>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('dashboard.title')}
              </h1>
              <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">{t('dashboard.welcome')}, {user.email}</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/40 border border-purple-500/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm shadow-2xl shadow-purple-500/20"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="bg-purple-600 p-2 md:p-3 rounded-full w-fit">
              <User size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold">{t('dashboard.accountInfo')}</h3>
              <p className="text-gray-300 text-sm md:text-base">{t('dashboard.email')} {user.email}</p>
              {user.accessKey && (
                <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2 mt-1">
                  <Key size={14} className="text-cyan-400 hidden md:block" />
                  <p className="text-cyan-300 font-mono text-xs md:text-sm break-all">{user.accessKey}</p>
                </div>
              )}
              <p className="text-gray-300 text-sm">{t('dashboard.registered')} {new Date(user.createdAt).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <div className="grid gap-4 md:gap-6">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('dashboard.myProducts')}
          </h2>
          
          {user.purchasedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center py-8 md:py-12 bg-gray-900/50 rounded-xl border border-gray-700"
            >
              <Shield size={40} className="mx-auto text-gray-500 mb-3 md:mb-4 md:w-12 md:h-12" />
              <p className="text-gray-400 text-base md:text-lg">{t('dashboard.noProducts')}</p>
              <p className="text-gray-500 mt-2 text-sm md:text-base px-4">{t('dashboard.goToShop')}</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {user.purchasedProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-purple-500/50 rounded-xl p-4 md:p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 backdrop-blur-sm cursor-pointer"
                  onClick={(e) => handleProductClick(product, e)}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-purple-400">{product.title}</h3>
                    <div className="bg-green-600 p-1.5 md:p-2 rounded-full">
                      <Shield size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center space-x-2">
                      <Download size={14} className="text-cyan-400" />
                      <span className="text-xs md:text-sm">{t('dashboard.version')} {product.version}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-cyan-400" />
                      <span className="text-xs md:text-sm">{t('dashboard.duration')} {product.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HardDrive size={14} className="text-cyan-400" />
                      <span className="text-xs md:text-sm">{t('dashboard.ram')} {product.ramSize}</span>
                    </div>
                    
                    {product.minecraftVersion && (
                      <div className="flex items-center space-x-2">
                        <Monitor size={14} className="text-cyan-400" />
                        <span className="text-xs md:text-sm">{t('dashboard.minecraft')} {product.minecraftVersion}</span>
                      </div>
                    )}
                    
                    {product.accessKey && (
                      <div className="flex items-center space-x-2">
                        <Key size={14} className="text-yellow-400" />
                        <span className="text-xs md:text-sm font-mono text-yellow-300 break-all">{product.accessKey}</span>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        {t('dashboard.purchased')} {new Date(product.purchaseDate).toLocaleDateString('ru-RU')}
                      </p>
                      {product.expiryDate && (
                        <p className="text-xs text-gray-400">
                          {t('dashboard.expires')} {new Date(product.expiryDate).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3 md:mt-4">
                    <motion.button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/40 text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product, e);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Подробнее
                    </motion.button>
                    
                    <motion.button 
                      className="px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/40 text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product, e);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title="Настройки продукта"
                    >
                      <Settings size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;