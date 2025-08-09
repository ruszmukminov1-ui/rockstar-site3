import React, { createContext, useContext, useState, ReactNode } from "react";

// Интерфейс для купленных продуктов
interface PurchasedProduct {
  title: string;
  accessKey?: string;
}

// Интерфейс для пользователя
interface User {
  email: string;
  purchasedProducts: PurchasedProduct[];
}

// Интерфейс контекста
interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  t: (key: string) => string;
}

// Создаем контекст
const AppContext = createContext<AppContextType | undefined>(undefined);

// Переводы
const translations: Record<string, Record<string, string>> = {
  ru: {
    "header.home": "Главная",
    "header.shop": "Магазин",
    "header.support": "Поддержка",
    "header.auth": "Авторизация",
    "footer.copyright": "© 2025 Rockstar 2.0. Все права защищены.",
    "profile.title": "Личный кабинет",
    "profile.noProducts": "У вас пока нет приобретённых продуктов",
    "profile.addProduct": "Добавить продукт",
    "profile.productSettings": "Настройки продукта"
  },
  en: {
    "header.home": "Home",
    "header.shop": "Shop",
    "header.support": "Support",
    "header.auth": "Auth",
    "footer.copyright": "© 2025 Rockstar 2.0. All rights reserved.",
    "profile.title": "Profile",
    "profile.noProducts": "You have no purchased products yet",
    "profile.addProduct": "Add product",
    "profile.productSettings": "Product settings"
  }
};

// Провайдер
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // По умолчанию пользователь с пустым списком продуктов, чтобы избежать ошибок .map
  const [currentUser, setCurrentUser] = useState<User>({
    email: "",
    purchasedProducts: []
  });

  // Текущий язык (можно сделать динамическим)
  const [lang] = useState<"ru" | "en">("ru");

  // Функция перевода
  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, t }}>
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
