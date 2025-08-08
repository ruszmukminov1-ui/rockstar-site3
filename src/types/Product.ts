// src/types/Product.ts
export interface Product {
  id: number;
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
}