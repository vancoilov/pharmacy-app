'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: { productId: number; quantity: number; price: number }[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  orders: Order[];
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  email: 'demo@apteka.mk',
  firstName: 'Марко',
  lastName: 'Петровски',
  phone: '070 123 456',
  address: 'ул. Македонија бр. 10',
  city: 'Скопје',
  postalCode: '1000',
};

// Demo orders
const DEMO_ORDERS: Order[] = [
  {
    id: 'APT-12345678',
    date: '2024-01-15',
    status: 'delivered',
    total: 1250,
    items: [
      { productId: 1, quantity: 2, price: 360 },
      { productId: 5, quantity: 1, price: 550 },
    ],
  },
  {
    id: 'APT-12345679',
    date: '2024-01-20',
    status: 'shipped',
    total: 890,
    items: [
      { productId: 9, quantity: 1, price: 756 },
      { productId: 3, quantity: 1, price: 280 },
    ],
  },
  {
    id: 'APT-12345680',
    date: '2024-01-25',
    status: 'processing',
    total: 620,
    items: [
      { productId: 6, quantity: 1, price: 527 },
    ],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pharmacy-user');
    const savedWishlist = localStorage.getItem('pharmacy-wishlist');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setOrders(DEMO_ORDERS);
      } catch {
        setUser(null);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        setWishlist([]);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('pharmacy-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo: accept demo@apteka.mk with any password, or any email with password "demo123"
    if (email === 'demo@apteka.mk' || password === 'demo123') {
      const loggedInUser = { ...DEMO_USER, email };
      setUser(loggedInUser);
      setOrders(DEMO_ORDERS);
      localStorage.setItem('pharmacy-user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    setUser(newUser);
    setOrders([]);
    localStorage.setItem('pharmacy-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('pharmacy-user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('pharmacy-user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const addToWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        orders,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
