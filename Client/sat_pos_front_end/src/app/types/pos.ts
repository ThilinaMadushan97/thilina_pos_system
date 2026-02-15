export interface Product {
  id: number;
  barcode: string;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface CartItem extends Product {
  cartQty: number;
}