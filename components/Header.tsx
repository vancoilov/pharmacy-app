'use client';

import { Search, ShoppingCart, Heart, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Здравје', count: 374 },
  { name: 'Витамини', count: 156 },
  { name: 'Козметика', count: 289 },
  { name: 'Мајка и Дете', count: 112 },
  { name: 'Хербали', count: 98 },
  { name: 'Орална хигиена', count: 45 },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-primary">
              Аптека
            </span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="flex items-center w-full bg-muted rounded-lg border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пребарај производи, брендови..."
                className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm"
              />
              <button className="bg-primary text-white px-4 py-2.5 rounded-r-lg hover:bg-primary/90 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Mobile */}
            <button className="md:hidden p-2 hover:bg-muted rounded-lg transition">
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* User - Desktop */}
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition"
            >
              <User className="w-5 h-5 text-foreground" />
              <span className="hidden lg:block text-sm font-medium">Профил</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 hover:bg-muted rounded-lg transition relative"
            >
              <Heart className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition relative"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 sm:static bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                0
              </span>
              <span className="hidden lg:block text-sm font-medium">0 ден</span>
            </Link>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden pb-3">
          <div className="flex items-center bg-muted rounded-lg border border-border">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пребарај производи..."
              className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm"
            />
            <button className="p-2.5">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={`/category/${cat.name.toLowerCase()}`}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-white transition rounded-t-lg"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-white transition rounded-t-lg"
              >
                Сите производи
              </Link>
            </li>
            <li className="ml-auto">
              <Link
                href="/promotions"
                className="block px-4 py-3 text-sm font-bold text-accent hover:bg-white transition rounded-t-lg"
              >
                Промоции
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/category/${cat.name.toLowerCase()}`}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {cat.count} производи
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border mt-2">
                <Link
                  href="/promotions"
                  className="flex items-center px-4 py-3 text-sm font-bold text-accent hover:bg-muted rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Промоции
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
