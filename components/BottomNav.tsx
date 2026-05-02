'use client';

import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function BottomNav() {
  const [active, setActive] = useState('home');

  const items = [
    { id: 'home', label: 'Дома', icon: Home, href: '/' },
    { id: 'category', label: 'Категории', icon: Grid, href: '/categories' },
    { id: 'cart', label: 'Кошничка', icon: ShoppingCart, href: '/cart' },
    { id: 'profile', label: 'Профил', icon: User, href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition relative"
            >
              <Icon
                className={`w-5 h-5 ${
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
              {item.id === 'cart' && (
                <span className="absolute top-2 right-1/4 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
