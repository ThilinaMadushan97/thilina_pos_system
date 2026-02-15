import { Package } from 'lucide-react';
import { Product } from '@/src/app/types/pos';

interface Props {
  product: Product;
  onAdd: (p: Product) => void;
}

export const ProductCard = ({ product, onAdd }: Props) => (
  <div 
    onClick={() => onAdd(product)}
    className="bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-blue-400 hover:shadow-md cursor-pointer transition-all active:scale-95 group"
  >
    <div className="aspect-square bg-slate-50 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-50">
       <Package className="text-slate-300 group-hover:text-blue-200 w-12 h-12" />
    </div>
    <h3 className="font-bold text-slate-700 leading-snug h-10 overflow-hidden">{product.name}</h3>
    <div className="flex justify-between items-center mt-4">
      <span className="text-blue-600 font-black text-lg">Rs.{product.price.toFixed(2)}</span>
      <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${product.stockQuantity > 5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        Stock: {product.stockQuantity}
      </span>
    </div>
  </div>
);