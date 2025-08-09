import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';
import { User } from '../types/User';
import { storageUtils } from '../utils/storage';
import { useNotifications } from '../hooks/useNotifications';

export type Language = 'ru' | 'en';

interface AppContextType {
  // Language
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
  
  // Notifications
  notifications: any[];
  removeNotification: (id: string) => void;
  showLoginSuccess: () => void;
  showRegisterSuccess: () => void;
  showPurchaseSuccess: (productTitle: string) => string;
  showLogoutSuccess: () => void;
  showError: (title: string, message: string) => void;
}

const translations = {
  ru: {
    // Header
    'header.support': 'Поддержка',
    'header.auth': 'Авторизация',
    'header.logout': 'Выйти',
    'header.dashboard': 'Личный кабинет',
    
    // Hero
    'hero.title': 'ROCKSTAR 2.0',
    'hero.subtitle': 'Лучший чит от создателя Conetin.',
    'hero.buyButton': 'Купить Rockstar 2.0',
    
    // Features
    'features.title': 'Почему выбирают нас?',
    'features.instant.title': 'Мгновенная активация',
    'features.instant.desc': 'Получите доступ сразу после покупки — без задержек.',
    'features.support.title': 'Поддержка 24/7',
    'features.support.desc': 'Мы всегда на связи, чтобы помочь вам.',
    'features.security.title': 'Безопасность',
    'features.security.desc': 'Обход всех современных систем защиты.',
    'features.ease.title': 'Простота использования',
    'features.ease.desc': 'Интуитивно понятный интерфейс и настройка.',
    
    // Shop
    'shop.title': 'Магазин',
    'shop.subtitle': 'Выберите подходящий тариф и получите мгновенный доступ к Rockstar 2.0',
    'shop.popular': 'Популярный',
    'shop.buyNow': 'Купить сейчас',
    'shop.forever': 'Навсегда',
    'shop.months': 'месяца',
    'shop.features.beta': 'Все функции Beta',
    'shop.features.recode': 'Все функции Recode',
    'shop.features.lifetime': 'Пожизненная лицензия',
    'shop.features.priority': 'Приоритетная поддержка',
    'shop.features.exclusive': 'Эксклюзивные обновления',
    'shop.features.tech': 'Техническая поддержка',
    'shop.features.regular': 'Регулярные обновления',
    'shop.features.basic': 'Базовая поддержка',
    'shop.features.standard': 'Стандартные обновления',
    
    // Auth
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.confirmPassword': 'Повторите пароль',
    'auth.loginButton': 'Войти',
    'auth.registerButton': 'Зарегистрироваться',
    'auth.loading': 'Загрузка...',
    
    // Support
    'support.title': 'Поддержка',
    'support.subtitle': 'Свяжитесь с нами для получения помощи',
    'support.name': 'Ваше имя',
    'support.email': 'Ваш Email',
    'support.message': 'Ваше сообщение',
    'support.send': 'Отправить сообщение',
    'support.sending': 'Отправка...',
    'support.contacts': 'Наши контакты',
    
    // Order
    'order.title': 'Оформление заказа',
    'order.product': 'Товар:',
    'order.duration': 'Срок:',
    'order.total': 'Итого:',
    'order.free': 'БЕСПЛАТНО',
    'order.specialOffer': '🎉 Специальное предложение: получите чит бесплатно!',
    'order.getFree': 'Получить бесплатно',
    'order.processing': 'Получение чита...',
    
    // Dashboard
    'dashboard.title': 'Личный кабинет',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.back': 'Назад',
    'dashboard.accountInfo': 'Информация об аккаунте',
    'dashboard.email': 'Email:',
    'dashboard.registered': 'Дата регистрации:',
    'dashboard.myProducts': 'Мои продукты',
    'dashboard.noProducts': 'У вас пока нет приобретенных продуктов',
    'dashboard.goToShop': 'Перейдите в магазин, чтобы купить Rockstar Client',
    'dashboard.download': 'Скачать',
    'dashboard.version': 'Версия:',
    'dashboard.ram': 'ОЗУ:',
    'dashboard.minecraft': 'Minecraft:',
    'dashboard.purchased': 'Куплено:',
    'dashboard.expires': 'Истекает:',
    
    // Videos
    'videos.title': 'Обзоры на чит',
    'videos.subtitle': 'Посмотрите подробные обзоры и демонстрации возможностей Rockstar 2.0',
    'videos.autoOn': 'Автосмена включена',
    'videos.autoOff': 'Автосмена выключена',
    
    // Footer
    'footer.copyright': '© 2025 Rockstar Client',
    'footer.terms': 'Условия пользования',
    
    // Terms
    'terms.title': 'Условия пользования',
    'terms.updated': 'Последнее обновление: 07 августа 2025',
    
    // Notifications
    'notification.loginSuccess': 'Вы успешно вошли!',
    'notification.registerSuccess': 'Вы успешно зарегистрированы!',
    'notification.logoutSuccess': 'Вы успешно вышли из аккаунта',
    'notification.purchaseSuccess': 'Покупка успешна! Ваш ключ:',
    'notification.messageSent': 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
    
    // Errors
    'error.required': 'Это поле обязательно',
    'error.emailFormat': 'Неверный формат email',
    'error.passwordLength': 'Пароль должен содержать минимум 6 символов',
    'error.passwordMismatch': 'Пароли не совпадают',
    'error.userNotFound': 'Пользователь не найден',
    'error.wrongPassword': 'Неверный пароль',
    'error.userExists': 'Пользователь с таким email уже существует',
    'error.generic': 'Произошла ошибка. Попробуйте снова.',
  },
  en: {
    // Header
    'header.support': 'Support',
    'header.auth': 'Login',
    'header.logout': 'Logout',
    'header.dashboard': 'Dashboard',
    
    // Hero
    'hero.title': 'ROCKSTAR 2.0',
    'hero.subtitle': 'The best cheat from the creator of Conetin.',
    'hero.buyButton': 'Buy Rockstar 2.0',
    
    // Features
    'features.title': 'Why choose us?',
    'features.instant.title': 'Instant Activation',
    'features.instant.desc': 'Get access immediately after purchase — no delays.',
    'features.support.title': '24/7 Support',
    'features.support.desc': 'We are always available to help you.',
    'features.security.title': 'Security',
    'features.security.desc': 'Bypass all modern protection systems.',
    'features.ease.title': 'Ease of Use',
    'features.ease.desc': 'Intuitive interface and setup.',
    
    // Shop
    'shop.title': 'Shop',
    'shop.subtitle': 'Choose the right plan and get instant access to Rockstar 2.0',
    'shop.popular': 'Popular',
    'shop.buyNow': 'Buy Now',
    'shop.forever': 'Forever',
    'shop.months': 'months',
    'shop.features.beta': 'All Beta features',
    'shop.features.recode': 'All Recode features',
    'shop.features.lifetime': 'Lifetime license',
    'shop.features.priority': 'Priority support',
    'shop.features.exclusive': 'Exclusive updates',
    'shop.features.tech': 'Technical support',
    'shop.features.regular': 'Regular updates',
    'shop.features.basic': 'Basic support',
    'shop.features.standard': 'Standard updates',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.loginButton': 'Sign In',
    'auth.registerButton': 'Create Account',
    'auth.loading': 'Loading...',
    
    // Support
    'support.title': 'Support',
    'support.subtitle': 'Contact us for assistance',
    'support.name': 'Your Name',
    'support.email': 'Your Email',
    'support.message': 'Your Message',
    'support.send': 'Send Message',
    'support.sending': 'Sending...',
    'support.contacts': 'Our Contacts',
    
    // Order
    'order.title': 'Order Checkout',
    'order.product': 'Product:',
    'order.duration': 'Duration:',
    'order.total': 'Total:',
    'order.free': 'FREE',
    'order.specialOffer': '🎉 Special offer: get the cheat for free!',
    'order.getFree': 'Get for Free',
    'order.processing': 'Getting cheat...',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.back': 'Back',
    'dashboard.accountInfo': 'Account Information',
    'dashboard.email': 'Email:',
    'dashboard.registered': 'Registration date:',
    'dashboard.myProducts': 'My Products',
    'dashboard.noProducts': 'You have no purchased products yet',
    'dashboard.goToShop': 'Go to the shop to buy Rockstar Client',
    'dashboard.download': 'Download',
    'dashboard.version': 'Version:',
    'dashboard.ram': 'RAM:',
    'dashboard.minecraft': 'Minecraft:',
    'dashboard.purchased': 'Purchased:',
    'dashboard.expires': 'Expires:',
    
    // Videos
    'videos.title': 'Cheat Reviews',
    'videos.subtitle': 'Watch detailed reviews and demonstrations of Rockstar 2.0 capabilities',
    'videos.autoOn': 'Auto-switch enabled',
    'videos.autoOff': 'Auto-switch disabled',
    
    // Footer
    'footer.copyright': '© 2025 Rockstar Client',
    'footer.terms': 'Terms of Service',
    
    // Terms
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last updated: August 07, 2025',
    
    // Notifications
    'notification.loginSuccess': 'Successfully logged in!',
    'notification.registerSuccess': 'Successfully registered!',
    'notification.logoutSuccess': 'Successfully logged out',
    'notification.purchaseSuccess': 'Purchase successful! Your key:',
    'notification.messageSent': 'Message sent! We will contact you soon.',
    
    // Errors
    'error.required': 'This field is required',
    'error.emailFormat': 'Invalid email format',
    'error.passwordLength': 'Password must contain at least 6 characters',
    'error.passwordMismatch': 'Passwords do not match',
    'error.userNotFound': 'User not found',
    'error.wrongPassword': 'Wrong password',
    'error.userExists': 'User with this email already exists',
    'error.generic': 'An error occurred. Please try again.',
  }
};

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
  
  const {
    notifications,
    removeNotification,
    showLoginSuccess,
    showRegisterSuccess,
    showPurchaseSuccess,
    showLogoutSuccess,
    showError,
  } = useNotifications();

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('rockstar_language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Load user from localStorage on mount
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

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isAuthOpen || isSupportOpen || isOrderOpen || isProfileOpen) {
      setMobileMenuOpen(false);
    }
  }, [isAuthOpen, isSupportOpen, isOrderOpen, isProfileOpen]);

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