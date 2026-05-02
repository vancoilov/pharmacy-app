'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Truck,
  Zap,
  CreditCard,
  Banknote,
  Check,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { useCart } from '@/lib/cart-context';
import { CATEGORIES } from '@/lib/data';

const MACEDONIAN_CITIES = [
  'Скопје',
  'Битола',
  'Куманово',
  'Прилеп',
  'Тетово',
  'Велес',
  'Охрид',
  'Гостивар',
  'Штип',
  'Струмица',
  'Кавадарци',
  'Кочани',
  'Кичево',
  'Струга',
  'Радовиш',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'cod' | 'card';
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartSubtotal, getProduct, clearCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'cod',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = getCartSubtotal();
  const shippingCost = formData.shippingMethod === 'express' ? 250 : subtotal >= 1500 ? 0 : 150;
  const total = subtotal + shippingCost;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Името е задолжително';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Презимето е задолжително';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Емаилот е задолжителен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Невалидна емаил адреса';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефонот е задолжителен';
    } else if (!/^(\+389|0)[0-9]{8,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Невалиден телефонски број';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Адресата е задолжителна';
    }
    if (!formData.city) {
      newErrors.city = 'Градот е задолжителен';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Поштенскиот код е задолжителен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrderNumber = `APT-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setIsOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Order Complete Screen
  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Нарачката е успешна!
            </h1>
            <p className="text-muted-foreground mb-6">
              Ви благодариме за вашата нарачка. Ќе добиете потврда на емаил.
            </p>
            <div className="bg-white rounded-xl border border-border p-6 mb-6">
              <div className="text-sm text-muted-foreground mb-2">Број на нарачка</div>
              <div className="text-xl font-bold text-foreground">{orderNumber}</div>
            </div>
            <div className="space-y-3">
              <Link
                href="/shop"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Продолжи со купување</span>
              </Link>
              <Link
                href="/"
                className="w-full flex items-center justify-center py-3 rounded-lg font-medium border border-border hover:bg-muted transition"
              >
                Назад на почетна
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Кошничката е празна</h1>
            <p className="text-muted-foreground mb-6">
              Додадете производи во кошничката за да продолжите со нарачката.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <span>Продавница</span>
            </Link>
          </div>
        </main>

        <Footer />
        <BottomNav />
      </div>
    );
  }

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
            <Link href="/cart" className="hover:text-primary">
              Кошничка
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Нарачка</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/cart"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Назад кон кошничка</span>
          </Link>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Комплетирај нарачка</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Информации за достава
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Име <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.firstName ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="Вашето име"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Презиме <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.lastName ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="Вашето презиме"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Емаил <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="vashiot@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="070 123 456"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Адреса <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.address ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="ул. Македонија бр. 1"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Град <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.city ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white`}
                    >
                      <option value="">Изберете град</option>
                      {MACEDONIAN_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Поштенски код <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.postalCode ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition`}
                      placeholder="1000"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Начин на достава</h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                      formData.shippingMethod === 'standard'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.shippingMethod === 'standard'
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.shippingMethod === 'standard' && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">Стандардна достава</div>
                        <div className="text-sm text-muted-foreground">5-7 работни денови</div>
                      </div>
                    </div>
                    <div className="ml-auto font-semibold text-foreground">
                      {subtotal >= 1500 ? (
                        <span className="text-green-600">Бесплатна</span>
                      ) : (
                        '150 ден'
                      )}
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                      formData.shippingMethod === 'express'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.shippingMethod === 'express'
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.shippingMethod === 'express' && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-medium text-foreground">Експресна достава</div>
                        <div className="text-sm text-muted-foreground">1-2 работни денови</div>
                      </div>
                    </div>
                    <div className="ml-auto font-semibold text-foreground">250 ден</div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Начин на плаќање</h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                      formData.paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'cod'
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.paymentMethod === 'cod' && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">Плаќање при достава</div>
                        <div className="text-sm text-muted-foreground">
                          Платете во готово при примање
                        </div>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                      formData.paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'card'
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">Онлајн плаќање</div>
                        <div className="text-sm text-muted-foreground">
                          Дебитна или кредитна картичка
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Дополнителни забелешки
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                  placeholder="Напишете забелешки за нарачката (опционално)"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Ваша нарачка</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;

                    const category = CATEGORIES.find((c) => c.id === product.category);
                    const price = product.discount
                      ? Math.round(product.price * (1 - product.discount / 100))
                      : product.price;

                    return (
                      <div key={item.productId} className="flex gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-lg text-muted-foreground/50">
                            {category?.icon || '💊'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {price} ден x {item.quantity}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {price * item.quantity} ден
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Производи</span>
                    <span className="text-foreground">{subtotal} ден</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Достава</span>
                    <span
                      className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-foreground'}
                    >
                      {shippingCost === 0 ? 'Бесплатна' : `${shippingCost} ден`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Вкупно</span>
                    <span className="font-bold text-xl text-primary">{total} ден</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Се обработува...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Потврди нарачка</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Со потврдување на нарачката се согласувате со нашите услови за користење.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
