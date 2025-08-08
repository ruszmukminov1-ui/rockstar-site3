// src/types/User.ts
export interface User {
  id: string;
  email: string;
  password: string;
  accessKey: string;
  isAdmin?: boolean;
  purchasedProducts: PurchasedProduct[];
  createdAt: string;
}

export interface PurchasedProduct {
  id: number;
  title: string;
  version: string;
  duration: string;
  ramSize: string;
  minecraftVersion?: string;
  accessKey?: string;
  purchaseDate: string;
  expiryDate?: string;
}

export interface AccessKey {
  key: string;
  isUsed: boolean;
  usedBy?: string;
  createdAt: string;
}