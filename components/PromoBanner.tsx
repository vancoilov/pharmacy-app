'use client';

import { Truck } from 'lucide-react';

export function PromoBanner() {
  return (
    <div className="bg-accent text-accent-foreground py-2 text-center text-sm font-medium">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" />
        <span>Бесплатна достава за нарачки над 1500 денари низ цела Македонија!</span>
      </div>
    </div>
  );
}
