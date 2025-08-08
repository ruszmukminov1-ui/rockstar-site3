// src/utils/storage.ts
import { User, PurchasedProduct } from '../types/User';

const STORAGE_KEYS = {
  USERS: 'rockstar_users',
  CURRENT_USER: 'rockstar_current_user',
};

export const storageUtils = {
  // Users
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User): void => {
    const users = storageUtils.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getUserByEmail: (email: string): User | null => {
    const users = storageUtils.getUsers();
    return users.find(u => u.email === email) || null;
  },

  // Current User Session
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearCurrentUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Add purchased product to user
  addPurchasedProduct: (userId: string, product: PurchasedProduct): void => {
    const users = storageUtils.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      users[userIndex].purchasedProducts.push(product);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      // Update current user session
      const currentUser = storageUtils.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.purchasedProducts.push(product);
        storageUtils.setCurrentUser(currentUser);
      }
    }
  },
};