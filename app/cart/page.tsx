'use client';

import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { useCart } from '@/lib/cart-context';
import { CATEGORIES } from '@/lib/data';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getShippingCost,
    getCartTotal,
    getProduct,
  } = useCart();

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const total = getCartTotal();
  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

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
            <span className="text-foreground font-medium">Кошничка</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Кошничка</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Кошничката е празна
            </h2>
            <p className="text-muted-foreground mb-6">
              Додадете производи во кошничката за да продолжите со нарачката.
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Уште {remainingForFreeShipping} ден до бесплатна достава!
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {remainingForFreeShipping <= 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Честитки! Имате бесплатна достава.
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="bg-white rounded-xl border border-border divide-y divide-border">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  const category = CATEGORIES.find((c) => c.id === product.category);
                  const price = product.discount
                    ? Math.round(product.price * (1 - product.discount / 100))
                    : product.price;
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={item.productId} className="p-4 flex gap-4">
                      {/* Image */}
                      <Link
                        href={`/product/${product.id}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg flex items-center justify-center shrink-0"
                      >
                        <span className="text-3xl text-muted-foreground/50">
                          {category?.icon || '💊'}
                        </span>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium text-foreground hover:text-primary transition line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">
                          {product.brand}
                        </div>

                        {/* Mobile Price */}
                        <div className="sm:hidden mt-2">
                          <span className="font-semibold text-primary">{price} ден</span>
                          {product.discount && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              {product.price} ден
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-border">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-muted-foreground hover:text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="hidden sm:block text-right">
                        <div className="font-semibold text-foreground">{itemTotal} ден</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {price} ден x {item.quantity}
                        </div>
                        {product.discount && (
                          <div className="text-xs text-red-500 mt-1">-{product.discount}%</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <div className="flex justify-between items-center">
                <Link
                  href="/shop"
                  className="text-primary font-medium hover:underline"
                >
                  Продолжи со купување
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Преглед на нарачка
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Вкупно производи</span>
                    <span className="text-foreground">{subtotal} ден</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Достава</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-foreground'}>
                      {shipping === 0 ? 'Бесплатна' : `${shipping} ден`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Вкупно</span>
                    <span className="font-bold text-lg text-primary">{total} ден</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition"
                >
                  <span>Продолжи кон нарачка</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Payment Info */}
                <div className="mt-4 text-center text-xs text-muted-foreground">
                  Сигурно плаќање со SSL енкрипција
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
