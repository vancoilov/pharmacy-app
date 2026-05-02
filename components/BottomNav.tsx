'use client';

import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

export function BottomNav() {
  const [active, setActive] = useState('home');

  const items = [
    { id: 'home', label: 'Дома', icon: Home },
    { id: 'category', label: 'Категории', icon: Grid },
    { id: 'cart', label: 'Кошничка', icon: ShoppingCart },
    { id: 'profile', label: 'Профил', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
