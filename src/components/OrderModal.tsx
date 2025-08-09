import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PurchasedProduct } from "../types/User";
import { storageUtils } from "../utils/storage";
import { generateAccessKey } from "../utils/keyGenerator";
import { X, CreditCard } from "lucide-react";
import { useApp } from "../context/AppContext";

const OrderModal: React.FC = () => {
  const { isOrderOpen, closeOrderModal, selectedProductForOrder, currentUser, t, showPurchaseSuccess } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOrderModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeOrderModal]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate free purchase
    setTimeout(() => {
      if (currentUser && selectedProductForOrder) {
        // Generate unique key and show notification
        const accessKey = showPurchaseSuccess(selectedProductForOrder.title);
        
        const purchasedProduct: PurchasedProduct = {
          id: selectedProductForOrder.id,
          title: selectedProductForOrder.title,
          version: "2.0.1",
          duration: selectedProductForOrder.duration,
          ramSize: "8 ГБ", 
          minecraftVersion: "1.20.1",
          accessKey: accessKey,
          purchaseDate: new Date().toISOString(),
          expiryDate: selectedProductForOrder.duration !== t('shop.forever')
            ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
            : undefined
        };
        
        storageUtils.addPurchasedProduct(currentUser.id, purchasedProduct);
      }
      
      setIsProcessing(false);
      closeOrderModal();
    }, 1500);
  };

  if (!isOrderOpen || !selectedProductForOrder) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={closeOrderModal}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm md:max-w-md p-6 md:p-8 bg-gray-900/95 backdrop-blur-md border border-green-500/50 rounded-2xl shadow-2xl shadow-green-500/25"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={closeOrderModal}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6 md:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-3 md:mb-4"
          >
            <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {t('order.title')}
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 p-3 md:p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm md:text-base">{t('order.product')}</span>
            <span className="text-white font-semibold text-sm md:text-base">{selectedProductForOrder.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm md:text-base">{t('order.duration')}</span>
            <span className="text-green-400 text-sm md:text-base">{selectedProductForOrder.duration}</span>
          </div>
          <div className="border-t border-gray-700 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-base md:text-lg font-semibold">{t('order.total')}</span>
              <span className="text-xl md:text-2xl font-bold text-green-400">{t('order.free')}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-center font-semibold text-sm md:text-base">
            {t('order.specialOffer')}
          </p>
        </div>

        <form onSubmit={handlePurchase}>
          <motion.button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25 text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('order.processing')}</span>
              </div>
            ) : (
              t('order.getFree')
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;