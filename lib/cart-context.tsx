'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, PRODUCTS } from './data';

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getShippingCost: () => number;
  getItemCount: () => number;
  getProduct: (productId: number) => Product | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_THRESHOLD = 1500;
const STANDARD_SHIPPING = 150;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pharmacy-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        setItems([]);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('pharmacy-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const getProduct = (productId: number) => {
    return PRODUCTS.find((p) => p.id === productId);
  };

  const addToCart = (productId: number, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartSubtotal = () => {
    return items.reduce((total, item) => {
      const product = getProduct(item.productId);
      if (!product) return total;
      const price = product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    if (subtotal >= SHIPPING_THRESHOLD || subtotal === 0) return 0;
    return STANDARD_SHIPPING;
  };

  const getCartTotal = () => {
    return getCartSubtotal() + getShippingCost();
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        getShippingCost,
        getItemCount,
        getProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
