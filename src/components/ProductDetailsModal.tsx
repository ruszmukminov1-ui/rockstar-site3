import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Key, Clock, HardDrive, Monitor, Shield, Copy, Check, Settings as SettingsIcon } from 'lucide-react';
import { PurchasedProduct } from '../types/User';
import { useApp } from '../context/AppContext';
import KeyInputModal from './KeyInputModal';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: PurchasedProduct | null;
  clickPosition?: { x: number; y: number };
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  clickPosition
}) => {
  const { t } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${product?.title}_Loader.exe`;
    link.click();
  };

  const handleKeyInputSuccess = () => {
    setShowKeyInput(false);
    // Refresh the product data or show success message
  };
  if (!isOpen || !product) return null;

  const originX = clickPosition ? clickPosition.x / window.innerWidth : 0.5;
  const originY = clickPosition ? clickPosition.y / window.innerHeight : 0.5;

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
          initial={{ 
            scale: 0, 
            opacity: 0, 
            originX, 
            originY,
            rotateX: -15,
            rotateY: 15
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotateX: 0,
            rotateY: 0
          }}
          exit={{ 
            scale: 0, 
            opacity: 0, 
            originX, 
            originY,
            rotateX: 15,
            rotateY: -15
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.6
          }}
          className="relative w-full max-w-sm md:max-w-2xl bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25 overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            boxShadow: '0 0 50px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#a855f7 transparent'
          }}
        >
          {/* Custom scrollbar styles */}
          <style jsx>{`
            .product-details-modal::-webkit-scrollbar {
              width: 8px;
            }
            .product-details-modal::-webkit-scrollbar-track {
              background: rgba(31, 41, 55, 0.5);
              border-radius: 4px;
            }
            .product-details-modal::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #a855f7, #ec4899);
              border-radius: 4px;
            }
            .product-details-modal::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #9333ea, #db2777);
            }
          `}</style>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>

          <div className="p-6 md:p-8 product-details-modal">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mb-3 md:mb-4"
              >
                <SettingsIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {product.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base">Настройки продукта</p>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Duration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Срок действия</h3>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {product.duration}
                </p>
                {product.expiryDate && (
                  <p className="text-sm text-gray-400 mt-2">
                    Истекает: {new Date(product.expiryDate).toLocaleDateString('ru-RU')}
                  </p>
                )}
              </motion.div>

              {/* Version */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-500/30 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Версия</h3>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {product.version}
                </p>
                {product.minecraftVersion && (
                  <p className="text-sm text-gray-400 mt-2">
                    Minecraft: {product.minecraftVersion}
                  </p>
                )}
              </motion.div>

              {/* RAM Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-500/30 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <HardDrive className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Оперативная память</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-400">Минимальная:</p>
                    <p className="text-lg font-bold text-orange-400">4 ГБ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Рекомендуемая:</p>
                    <p className="text-lg font-bold text-orange-400">{product.ramSize}</p>
                  </div>
                </div>
              </motion.div>

              {/* Purchase Date */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-600/30 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Дата покупки</h3>
                </div>
                <p className="text-lg font-bold text-gray-300">
                  {new Date(product.purchaseDate).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>
            </div>

            {/* Access Key */}
            {product.accessKey ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-xl p-4 md:p-6 mb-6 md:mb-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white">Ключ доступа</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(product.accessKey!)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      copiedKey === product.accessKey
                        ? 'bg-green-600 text-white'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    {copiedKey === product.accessKey ? (
                      <>
                        <Check size={16} />
                        <span className="hidden sm:inline">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span className="hidden sm:inline">Скопировать</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-800/50 border border-yellow-500/20 rounded-lg p-3">
                  <p className="font-mono text-yellow-300 text-sm md:text-base break-all">
                    {product.accessKey}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-xl p-4 md:p-6 mb-6 md:mb-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Key className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Ключ доступа</h3>
                </div>
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">У вас нет активного ключа для этого продукта</p>
                  <motion.button
                    onClick={() => setShowKeyInput(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Key size={16} />
                    <span>Ввести ключ</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Supported Minecraft Versions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-xl p-4 md:p-6 mb-6 md:mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Monitor className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Поддерживаемые версии Minecraft</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['1.16.5', '1.17.1', '1.18.2', '1.19.4', '1.20.1', '1.20.4', '1.21.0', '1.21.4'].map((version) => (
                  <div
                    key={version}
                    className="bg-green-800/30 border border-green-500/20 rounded-lg px-3 py-2 text-center"
                  >
                    <span className="text-green-300 font-semibold text-sm">{version}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <motion.button
                onClick={handleDownload}
                className={`w-full md:w-auto inline-flex items-center justify-center space-x-3 px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-full shadow-2xl transition-all duration-300 text-base md:text-lg ${
                  product.accessKey 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/50' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-500 cursor-not-allowed opacity-50'
                }`}
                disabled={!product.accessKey}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5 md:w-6 md:h-6" />
                <span>{product.accessKey ? 'Скачать лоадер' : 'Требуется ключ'}</span>
              </motion.button>
              <p className="text-gray-400 text-xs md:text-sm mt-3">
                {product.accessKey 
                  ? 'Размер файла: ~2.5 МБ • Совместимость: Windows 10/11'
                  : 'Введите ключ доступа для загрузки лоадера'
                }
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Key Input Modal */}
        {showKeyInput && (
          <KeyInputModal
            onClose={() => setShowKeyInput(false)}
            onSuccess={handleKeyInputSuccess}
            product={product}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal;