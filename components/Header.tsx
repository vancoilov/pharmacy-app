'use client';

import { Search, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
      <div className="px-4 py-3">
        {/* Top info bar */}
        <div className="text-xs text-muted-foreground mb-2 flex justify-between">
          <span>☎️ 070 123 456</span>
          <span>🚚 Бесплатна достава за нарачки над 500ден</span>
        </div>

        {/* Search and icons */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Пребарај производи..."
                className="bg-transparent outline-none text-sm w-full placeholder-muted-foreground"
              />
            </div>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition relative">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
