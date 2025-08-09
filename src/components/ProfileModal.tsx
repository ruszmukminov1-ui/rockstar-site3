import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Copy, Check, Key } from "lucide-react";

const ProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Личный кабинет</h2>

        {/* Список продуктов */}
        {!currentUser?.purchasedProducts || currentUser.purchasedProducts.length === 0 ? (
          <div className="text-center py-4">
            <Key size={32} className="mx-auto text-gray-500 mb-2" />
            <p className="text-gray-400">У вас пока нет приобретённых продуктов</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {currentUser.purchasedProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-400">{product.title}</h4>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                    Настройки продукта
                  </button>
                </div>
                {product.accessKey && (
                  <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Ключ:</span>
                      <button
                        onClick={() => copyToClipboard(product.accessKey!)}
                        className={`p-1.5 rounded-md transition-all duration-300 ${
                          copiedKey === product.accessKey
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
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
    </div>
  );
};

export default ProfileModal;
