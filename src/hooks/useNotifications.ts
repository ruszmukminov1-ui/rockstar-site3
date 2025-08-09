import { useState, useCallback } from 'react';
import { Notification } from '../components/NotificationSystem';
import { generateAccessKey } from '../utils/keyGenerator';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    type: 'success' | 'error' | 'info',
    title: string,
    message: string,
    options?: {
      accessKey?: string;
      duration?: number;
    }
  ) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      accessKey: options?.accessKey,
      duration: options?.duration || 4000,
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showLoginSuccess = useCallback(() => {
    addNotification('success', 'Успешный вход!', 'Вы успешно вошли в систему');
  }, [addNotification]);

  const showRegisterSuccess = useCallback(() => {
    addNotification('success', 'Регистрация завершена!', 'Вы успешно зарегистрировались');
  }, [addNotification]);

  const showPurchaseSuccess = useCallback((productTitle: string) => {
    const accessKey = generateAccessKey();
    addNotification(
      'success',
      'Покупка успешна!',
      `Вы успешно приобрели ${productTitle}`,
      { accessKey, duration: 8000 }
    );
    return accessKey;
  }, [addNotification]);

  const showLogoutSuccess = useCallback(() => {
    addNotification('success', 'Выход выполнен', 'Вы успешно вышли из аккаунта');
  }, [addNotification]);

  const showError = useCallback((title: string, message: string) => {
    addNotification('error', title, message);
  }, [addNotification]);

  return {
    notifications,
    removeNotification,
    showLoginSuccess,
    showRegisterSuccess,
    showPurchaseSuccess,
    showLogoutSuccess,
    showError,
  };
};