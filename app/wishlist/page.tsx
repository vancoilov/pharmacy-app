'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/lib/auth-context';
import { PRODUCTS } from '@/lib/data';

export default function WishlistPage() {
  const { wishlist, user } = useAuth();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Дома
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Омилени</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
          Омилени производи
        </h1>

        {!user ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Најавете се за омилени
            </h2>
            <p className="text-muted-foreground mb-6">
              За да зачувате омилени производи, потребно е да се најавите.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <span>Најава</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Нема омилени производи
            </h2>
            <p className="text-muted-foreground mb-6">
              Додадете производи во омилени за да ги зачувате за подоцна.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <span>Продолжи со купување</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {wishlistProducts.length}{' '}
              {wishlistProducts.length === 1 ? 'производ' : 'производи'} во омилени
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image || ''}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  badge={product.badge}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
