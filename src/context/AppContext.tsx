// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Типы
interface PurchasedProduct {
  title: string;
  accessKey?: string;
}

interface User {
  email: string;
  purchasedProducts: PurchasedProduct[];
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  t: (key: string) => string;
}

// Переводы
const translations = {
  ru: {
    "header.home": "Главная",
    "header.shop": "Магазин",
    "header.support": "Поддержка",
    "header.auth": "Авторизация",
    "header.profile": "Личный кабинет",

    "footer.about": "О нас",
    "footer.terms": "Условия пользования",
    "footer.privacy": "Политика конфиденциальности",
    "footer.contact": "Контакты",
    "footer.copyright": "© 2025 Rockstar Client. Все права защищены",

    "auth.login": "Войти",
    "auth.register": "Регистрация",
    "auth.email": "Эл. почта",
    "auth.password": "Пароль",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.logout": "Выйти",
    "auth.successLogin": "Вы успешно вошли!",
    "auth.successRegister": "Вы успешно зарегистрированы!",

    "shop.buyNow": "Купить сейчас",
    "shop.popular": "ПОПУЛЯРНЫЙ",
    "shop.price": "Цена",
    "shop.term": "Срок",
    "shop.features": "Возможности",

    "order.title": "Оформление заказа",
    "order.product": "Продукт",
    "order.email": "Эл. почта",
    "order.pay": "Оплатить",
    "order.success": "Вы успешно купили чит!",
    "order.keyIssued": "Вот ваш ключ:",

    "profile.title": "Личный кабинет",
    "profile.noProducts": "У вас пока нет приобретённых продуктов",
    "profile.addProduct": "Добавить продукт по ключу",
    "profile.productSettings": "Настройки продукта",
    "profile.logout": "Выйти",

    "support.title": "Поддержка",
    "support.description": "Отправьте нам сообщение, и мы свяжемся с вами.",
    "support.send": "Отправить"
  },
  en: {
    "header.home": "Home",
    "header.shop": "Shop",
    "header.support": "Support",
    "header.auth": "Authorization",
    "header.profile": "Profile",

    "footer.about": "About Us",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact",
    "footer.copyright": "© 2025 Rockstar Client. All rights reserved",

    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.logout": "Logout",
    "auth.successLogin": "You have successfully logged in!",
    "auth.successRegister": "You have successfully registered!",

    "shop.buyNow": "Buy Now",
    "shop.popular": "POPULAR",
    "shop.price": "Price",
    "shop.term": "Term",
    "shop.features": "Features",

    "order.title": "Place Order",
    "order.product": "Product",
    "order.email": "Email",
    "order.pay": "Pay",
    "order.success": "You have successfully purchased the cheat!",
    "order.keyIssued": "Here is your key:",

    "profile.title": "Profile",
    "profile.noProducts": "You have no purchased products yet",
    "profile.addProduct": "Add product by key",
    "profile.productSettings": "Product Settings",
    "profile.logout": "Logout",

    "support.title": "Support",
    "support.description": "Send us a message and we will contact you.",
    "support.send": "Send"
  }
};

// Контекст
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<"ru" | "en">("ru");

  useEffect(() => {
    const savedLang = localStorage.getItem("rockstar_lang") as "ru" | "en" | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, t }}>
      {children}
    </AppContext.Provider>
  );
};

// Хук
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
