'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  discount?: number;
  badge?: string;
}

export function ProductCard({
  image,
  name,
  price,
  discount,
  badge,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const discountedPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-border">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <span className="text-4xl text-muted-foreground/30">💊</span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
            {badge}
          </div>
        )}

        {/* Discount */}
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}

        {/* Heart Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
        >
          <Heart
            className={`w-5 h-5 ${
              liked
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-foreground">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            {discountedPrice}ден
          </span>
          {discount && (
            <span className="text-xs text-muted-foreground line-through">
              {price}ден
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button className="w-full mt-2 bg-primary text-primary-foreground py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition">
          Додади во кошничка
        </button>
      </div>
    </div>
  );
}
