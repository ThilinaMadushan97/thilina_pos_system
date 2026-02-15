import { ShoppingCart, Trash2, Minus, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { CartItem } from '@/src/app/types/pos';

interface Props {
  cart: CartItem[];
  loading: boolean;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export const CartSidebar = ({ cart, loading, onUpdateQty, onRemove, onCheckout }: Props) => {
  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.cartQty), 0);
  const tax = subTotal * 0.02;
  const grandTotal = subTotal + tax;

  return (
    <div className="w-[400px] bg-white shadow-2xl flex flex-col border-l border-slate-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-black flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-blue-600" /> Current Order
        </h2>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{cart.length} Items</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50 text-center">
            <ShoppingCart className="w-20 h-20 mb-4" />
            <p className="font-medium text-lg">Cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between mb-3">
                <p className="font-bold text-slate-800 text-sm leading-tight">{item.name}</p>
                <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-1">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-slate-100 rounded text-blue-600"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold w-6 text-center text-sm">{item.cartQty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-slate-100 rounded text-blue-600"><Plus className="w-4 h-4" /></button>
                </div>
                <p className="font-black text-slate-700">Rs. {(item.cartQty * item.price).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-8 bg-slate-900 text-white rounded-t-[2.5rem]">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-400 text-sm"><span>Subtotal</span><span>Rs. {subTotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-400 text-sm"><span>Tax (2%)</span><span>Rs. {tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-2xl font-black pt-3 border-t border-slate-800 mt-2">
            <span>Total</span><span className="text-blue-400">Rs. {grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={onCheckout}
          disabled={loading || cart.length === 0}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800"
        >
          {loading ? <RefreshCw className="animate-spin w-6 h-6" /> : <><CheckCircle className="w-6 h-6" /> Complete Checkout</>}
        </button>
      </div>
    </div>
  );
};