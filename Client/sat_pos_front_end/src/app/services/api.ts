import { Product } from "../types/pos";

const BASE_URL = 'https://localhost:7098/api/Pos';

export const posService = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async checkout(cartItems: any[]) {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    });
    return res;
  }
};