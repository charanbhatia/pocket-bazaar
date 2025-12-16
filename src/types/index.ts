// Product types from FakeStore API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Checkout form data
export interface CheckoutFormData {
  customerName: string;
  customerAddress: string;
  customerPhone: string;
}

// Order type for database
export interface Order {
  id: string;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  total_amount: number;
  order_date: string;
  created_at: string;
}

// Order item type for database
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  product_title: string;
  product_price: number;
  product_image: string;
  quantity: number;
  subtotal: number;
  created_at: string;
}

// Complete order with items
export interface OrderWithItems extends Order {
  items: OrderItem[];
}

// Navigation types
export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
  Checkout: undefined;
  OrderHistory: undefined;
};

