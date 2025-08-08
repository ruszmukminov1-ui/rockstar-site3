// src/components/KeyGenerator.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, Plus, Trash2, Check } from 'lucide-react';
import { generateAccessKey } from '../utils/keyGenerator';
import { storageUtils } from '../utils/storage';
import { AccessKey } from '../types/User';

const KeyGenerator: React.FC = () => {
  const [keys, setKeys] = useState<AccessKey[]>(storageUtils.getAccessKeys());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateNewKey = () => {
    const newKey: AccessKey = {
      key: generateAccessKey(),
      isUsed: false,
      createdAt: new Date().toISOString(),
    };
    
    storageUtils.saveAccessKey(newKey);
    setKeys(storageUtils.getAccessKeys());
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

  const deleteKey = (keyToDelete: string) => {
    const updatedKeys = keys.filter(k => k.key !== keyToDelete);
    localStorage.setItem('rockstar_access_keys', JSON.stringify(updatedKeys));
    setKeys(updatedKeys);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Генератор ключей
            </h1>
            <p className="text-gray-400 mt-2">Управление ключами доступа</p>
          </div>
          <button
            onClick={generateNewKey}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Plus size={20} />
            <span>Создать ключ</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <Key className="text-blue-400" size={24} />
              <div>
                <p className="text-2xl font-bold">{keys.length}</p>
                <p className="text-gray-400">Всего ключей</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <Check className="text-green-400" size={24} />
              <div>
                <p className="text-2xl font-bold">{keys.filter(k => !k.isUsed).length}</p>
                <p className="text-gray-400">Доступных</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-red-900/40 to-pink-900/40 border border-red-500 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <Trash2 className="text-red-400" size={24} />
              <div>
                <p className="text-2xl font-bold">{keys.filter(k => k.isUsed).length}</p>
                <p className="text-gray-400">Использованных</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Keys List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/50 border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">Список ключей</h2>
          
          {keys.length === 0 ? (
            <div className="text-center py-8">
              <Key size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">Ключи не созданы</p>
            </div>
          ) : (
            <div className="space-y-3">
              {keys.map((keyObj, index) => (
                <motion.div
                  key={keyObj.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    keyObj.isUsed 
                      ? 'bg-red-900/20 border-red-500/50' 
                      : 'bg-green-900/20 border-green-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      keyObj.isUsed ? 'bg-red-600' : 'bg-green-600'
                    }`}>
                      <Key size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-lg font-semibold">{keyObj.key}</p>
                      <p className="text-sm text-gray-400">
                        Создан: {new Date(keyObj.createdAt).toLocaleDateString('ru-RU')}
                        {keyObj.isUsed && keyObj.usedBy && (
                          <span className="ml-2 text-red-400">• Использован</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(keyObj.key)}
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        copiedKey === keyObj.key
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                      title="Копировать ключ"
                    >
                      {copiedKey === keyObj.key ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    
                    {!keyObj.isUsed && (
                      <button
                        onClick={() => deleteKey(keyObj.key)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Удалить ключ"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyGenerator;