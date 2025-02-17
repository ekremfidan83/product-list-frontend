import { Product } from '../types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

export const productApi = {
  // Tüm ürünleri getir
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Ürünler yüklenirken hata oluştu');
    }
    return response.json();
  },

  // Yeni ürün ekle
  createProduct: async (product: Omit<Product, 'id'>) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Ürün eklenirken hata oluştu');
    }
    return response.json();
  },

  // Ürün sil
  deleteProduct: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ürün silinirken hata oluştu');
    }
  },

  getProductById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Ürün detayı yüklenirken hata oluştu');
    }
    return response.json();
  },
}; 