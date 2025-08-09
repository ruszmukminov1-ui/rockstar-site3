import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from '../types/User';
import { storageUtils } from '../utils/storage';
import { X } from 'lucide-react';
import { generateAccessKey } from '../utils/keyGenerator';
import { useApp } from '../context/AppContext';

const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuthModal, setCurrentUser, t, showLoginSuccess, showRegisterSuccess, showError } = useApp();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('rockstar_saved_email');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeAuthModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors([]);
  };

  const validateForm = (): string[] => {
    const newErrors: string[] = [];
    
    if (!formData.email) {
      newErrors.push(t('error.required'));
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push(t('error.emailFormat'));
    }
    
    if (!formData.password) {
      newErrors.push(t('error.required'));
    } else if (formData.password.length < 6) {
      newErrors.push(t('error.passwordLength'));
    }
    
    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.push(t('error.passwordMismatch'));
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      if (activeTab === 'login') {
        // Login logic
        const existingUser = storageUtils.getUserByEmail(formData.email);
        
        if (!existingUser) {
          showError('Ошибка входа', t('error.userNotFound'));
          setIsLoading(false);
          return;
        }
        
        if (existingUser.password !== formData.password) {
          showError('Ошибка входа', t('error.wrongPassword'));
          setIsLoading(false);
          return;
        }
        
        // Save email for future logins
        localStorage.setItem('rockstar_saved_email', formData.email);
        
        storageUtils.setCurrentUser(existingUser);
        setCurrentUser(existingUser);
        showLoginSuccess();
        
      } else {
        // Registration logic
        const existingUser = storageUtils.getUserByEmail(formData.email);
        
        if (existingUser) {
          showError('Ошибка регистрации', t('error.userExists'));
          setIsLoading(false);
          return;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email: formData.email,
          password: formData.password,
          accessKey: generateAccessKey(),
          purchasedProducts: [],
          createdAt: new Date().toISOString(),
        };
        
        // Save email for future logins
        localStorage.setItem('rockstar_saved_email', formData.email);
        
        storageUtils.saveUser(newUser);
        storageUtils.setCurrentUser(newUser);
        setCurrentUser(newUser);
        showRegisterSuccess();
      }
      
      closeAuthModal();
    } catch (error) {
      showError('Ошибка', t('error.generic'));
    }
    
    setIsLoading(false);
  };

  if (!isAuthOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={closeAuthModal}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm md:max-w-md p-6 md:p-8 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {activeTab === 'login' ? t('auth.login') : t('auth.register')}
          </h2>
        </div>

        <div className="flex mb-4 md:mb-6 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => {
              setActiveTab("login");
              setErrors([]);
              setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            }}
            className={`flex-1 py-2 px-3 md:px-4 rounded-md text-sm font-semibold transition-all ${
              activeTab === "login"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t('auth.login')}
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setErrors([]);
              setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            }}
            className={`flex-1 py-2 px-3 md:px-4 rounded-md text-sm font-semibold transition-all ${
              activeTab === "register"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t('auth.register')}
          </button>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg"
          >
            {errors.map((error, index) => (
              <p key={index} className="text-red-300 text-sm">{error}</p>
            ))}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder={t('auth.email')}
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm md:text-base"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder={t('auth.password')}
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm md:text-base"
              required
            />
          </div>
          
          {activeTab === "register" && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('auth.confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm md:text-base"
                required
              />
            </div>
          )}
          
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? t('auth.loading') : (activeTab === "login" ? t('auth.loginButton') : t('auth.registerButton'))}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;