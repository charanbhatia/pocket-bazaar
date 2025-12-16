import { supabase } from '../config/supabase';
import { Order, OrderItem, OrderWithItems, CartItem, CheckoutFormData } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDERS_STORAGE_KEY = '@pocket_bazaar_orders';

// Create a new order in Supabase
export const createOrder = async (
  formData: CheckoutFormData,
  cartItems: CartItem[],
  totalAmount: number
): Promise<string> => {
  try {
    // First, try to save to Supabase
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: formData.customerName,
          customer_address: formData.customerAddress,
          customer_phone: formData.customerPhone,
          total_amount: totalAmount,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Supabase order error:', orderError);
      // Fallback to AsyncStorage
      return await saveOrderToAsyncStorage(formData, cartItems, totalAmount);
    }

    // Insert order items
    const orderItems = cartItems.map((item) => ({
      order_id: orderData.id,
      product_id: item.product.id,
      product_title: item.product.title,
      product_price: item.product.price,
      product_image: item.product.image,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Supabase order items error:', itemsError);
    }

    // Also save to AsyncStorage as backup
    await saveOrderToAsyncStorage(formData, cartItems, totalAmount, orderData.id);

    return orderData.id;
  } catch (error) {
    console.error('Error creating order:', error);
    // Fallback to AsyncStorage
    return await saveOrderToAsyncStorage(formData, cartItems, totalAmount);
  }
};

// Save order to AsyncStorage (fallback or backup)
const saveOrderToAsyncStorage = async (
  formData: CheckoutFormData,
  cartItems: CartItem[],
  totalAmount: number,
  orderId?: string
): Promise<string> => {
  try {
    const newOrderId = orderId || `local_${Date.now()}`;
    const order: OrderWithItems = {
      id: newOrderId,
      customer_name: formData.customerName,
      customer_address: formData.customerAddress,
      customer_phone: formData.customerPhone,
      total_amount: totalAmount,
      order_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      items: cartItems.map((item, index) => ({
        id: `item_${index}`,
        order_id: newOrderId,
        product_id: item.product.id,
        product_title: item.product.title,
        product_price: item.product.price,
        product_image: item.product.image,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
        created_at: new Date().toISOString(),
      })),
    };

    const existingOrders = await getOrdersFromAsyncStorage();
    existingOrders.push(order);
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));

    return newOrderId;
  } catch (error) {
    console.error('Error saving order to AsyncStorage:', error);
    throw new Error('Failed to save order');
  }
};

// Get orders from AsyncStorage
const getOrdersFromAsyncStorage = async (): Promise<OrderWithItems[]> => {
  try {
    const ordersJson = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  } catch (error) {
    console.error('Error getting orders from AsyncStorage:', error);
    return [];
  }
};

// Fetch all orders (from Supabase or AsyncStorage)
export const fetchOrders = async (): Promise<OrderWithItems[]> => {
  try {
    // Try to fetch from Supabase first
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (ordersError) {
      console.error('Supabase fetch orders error:', ordersError);
      // Fallback to AsyncStorage
      return await getOrdersFromAsyncStorage();
    }

    // Fetch order items for each order
    const ordersWithItems: OrderWithItems[] = await Promise.all(
      orders.map(async (order) => {
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        if (itemsError) {
          console.error('Supabase fetch order items error:', itemsError);
          return { ...order, items: [] };
        }

        return { ...order, items: items || [] };
      })
    );

    // Merge with AsyncStorage orders
    const localOrders = await getOrdersFromAsyncStorage();
    const allOrders = [...ordersWithItems, ...localOrders];

    // Remove duplicates based on ID
    const uniqueOrders = allOrders.filter(
      (order, index, self) => index === self.findIndex((o) => o.id === order.id)
    );

    return uniqueOrders.sort(
      (a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Fallback to AsyncStorage
    return await getOrdersFromAsyncStorage();
  }
};

