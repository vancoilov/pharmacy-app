'use client';

import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  discount?: number;
  badge?: string;
}

export function ProductCard({
  id,
  image,
  name,
  price,
  discount,
  badge,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const discountedPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  const handleAddToCart = () => {
    addToCart(id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-border group">
      {/* Image Container */}
      <Link href={`/product/${id}`} className="block relative aspect-square bg-muted overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <span className="text-5xl lg:text-6xl text-muted-foreground/30">💊</span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
            {badge}
          </div>
        )}

        {/* Discount */}
        {discount && discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}

        {/* Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`w-4 h-4 lg:w-5 lg:h-5 ${
              liked
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-3 lg:p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-sm lg:text-base line-clamp-2 mb-2 text-foreground hover:text-primary transition min-h-[2.5rem] lg:min-h-[3rem]">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg lg:text-xl font-bold text-primary">
            {discountedPrice} ден
          </span>
          {discount && discount > 0 && (
            <span className="text-xs lg:text-sm text-muted-foreground line-through">
              {price} ден
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button 
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2 lg:py-2.5 rounded-lg font-medium text-sm transition ${
            addedToCart 
              ? 'bg-green-600 text-white' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Додадено</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Додади</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
