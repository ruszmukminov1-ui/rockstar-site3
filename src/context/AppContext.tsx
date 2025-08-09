import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';
import { User, PurchasedProduct } from '../types/User';
import { storageUtils } from '../utils/storage';
import { useNotifications } from '../hooks/useNotifications';

export type Language = 'ru' | 'en';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Modals
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isSupportOpen: boolean;
  openSupportModal: () => void;
  closeSupportModal: () => void;
  isOrderOpen: boolean;
  openOrderModal: (product: Product) => void;
  closeOrderModal: () => void;
  selectedProductForOrder: Product | null;
  
  // User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Profile modal
  isProfileOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  // Product details modal
  isProductDetailsOpen: boolean;
  openProductDetailsModal: (product: PurchasedProduct, clickPosition?: { x: number; y: number }) => void;
  closeProductDetailsModal: () => void;
  selectedProductForDetails: PurchasedProduct | null;
  productDetailsClickPosition: { x: number; y: number } | undefined;

  // Notifications
  notifications: any[];
  removeNotification: (id: string) => void;
  showLoginSuccess: () => void;
  showRegisterSuccess: () => void;
  showPurchaseSuccess: (productTitle: string) => string;
  showLogoutSuccess: () => void;
  showError: (title: string, message: string) => void;
}

const translations = { /* ... твой объект переводов без изменений ... */ };

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ru');
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSupportOpen, setSupportOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<PurchasedProduct | null>(null);
  const [productDetailsClickPosition, setProductDetailsClickPosition] = useState<{ x: number; y: number } | undefined>(undefined);
  
  const {
    notifications,
    removeNotification,
    showLoginSuccess,
    showRegisterSuccess,
    showPurchaseSuccess,
    showLogoutSuccess,
    showError,
  } = useNotifications();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('rockstar_language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const existingUser = storageUtils.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rockstar_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const openAuthModal = () => {
    setAuthOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeAuthModal = () => {
    setAuthOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openSupportModal = () => {
    setSupportOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeSupportModal = () => {
    setSupportOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openOrderModal = (product: Product) => {
    setSelectedProductForOrder(product);
    setOrderOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeOrderModal = () => {
    setSelectedProductForOrder(null);
    setOrderOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openProfileModal = () => {
    setProfileOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeProfileModal = () => {
    setProfileOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openProductDetailsModal = (product: PurchasedProduct, clickPosition?: { x: number; y: number }) => {
    setSelectedProductForDetails(product);
    setProductDetailsClickPosition(clickPosition);
    setProductDetailsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeProductDetailsModal = () => {
    setSelectedProductForDetails(null);
    setProductDetailsClickPosition(undefined);
    setProductDetailsOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (isAuthOpen || isSupportOpen || isOrderOpen || isProfileOpen || isProductDetailsOpen) {
      setMobileMenuOpen(false);
    }
  }, [isAuthOpen, isSupportOpen, isOrderOpen, isProfileOpen, isProductDetailsOpen]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAuthOpen,
        openAuthModal,
        closeAuthModal,
        isSupportOpen,
        openSupportModal,
        closeSupportModal,
        isOrderOpen,
        openOrderModal,
        closeOrderModal,
        selectedProductForOrder,
        currentUser,
        setCurrentUser,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isProfileOpen,
        openProfileModal,
        closeProfileModal,
        isProductDetailsOpen,
        openProductDetailsModal,
        closeProductDetailsModal,
        selectedProductForDetails,
        productDetailsClickPosition,
        notifications,
        removeNotification,
        showLoginSuccess,
        showRegisterSuccess,
        showPurchaseSuccess,
        showLogoutSuccess,
        showError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
};
