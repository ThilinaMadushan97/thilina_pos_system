"use client";

import { useState, useEffect, useMemo } from 'react';
import { Package, Search, RefreshCw } from 'lucide-react';
import { CartItem, Product } from './types/pos';
import { posService } from './services/api';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';


export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await posService.getProducts();
      setProducts(data);
    } catch (err) { console.error(err); }
    finally { setFetching(false); }
  };

  useEffect(() => { loadProducts(); }, []);

  const filteredProducts = useMemo(() => 
    products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm)),
    [searchTerm, products]
  );

  const addToCart = (product: Product) => {
    if (product.stockQuantity <= 0) return alert("Out of Stock!");
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item);
      return [...prev, { ...product, cartQty: 1 }];
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    const saleData = cart.map(i => ({ productId: i.id, quantity: i.cartQty, unitPrice: i.price }));
    try {
      const res = await posService.checkout(saleData);
      if (res.ok) {
        alert("Transaction Completed Successfully!");
        setCart([]);
        loadProducts();
      }
    } catch { alert("Error in Checkout"); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased text-slate-800">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Package className="text-blue-600 w-8 h-8" /> Thilina Grocery
            </h1>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input 
              type="text" placeholder="Search by name or barcode..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {fetching ? (
          <div className="flex-1 flex items-center justify-center"><RefreshCw className="animate-spin text-blue-500 w-10 h-10" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 overflow-y-auto pr-2 pb-10">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
          </div>
        )}
      </div>

      <CartSidebar 
        cart={cart} 
        loading={loading} 
        onUpdateQty={(id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, cartQty: Math.max(1, item.cartQty + delta) } : item))}
        onRemove={(id) => setCart(prev => prev.filter(item => item.id !== id))}
        onCheckout={handleCheckout}
      />
    </div>
  );
}