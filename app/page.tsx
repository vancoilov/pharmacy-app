'use client';

import { TopBar } from '@/components/TopBar';
import { PromoBanner } from '@/components/PromoBanner';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { HeroSlider } from '@/components/HeroSlider';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';

const CATEGORIES = [
  { name: 'Здравје', icon: '💊', count: 374, href: '/category/zdravje' },
  { name: 'Витамини', icon: '🍊', count: 156, href: '/category/vitamini' },
  { name: 'Козметика', icon: '✨', count: 289, href: '/category/kozmetika' },
  { name: 'Мајка и Дете', icon: '👶', count: 112, href: '/category/majka-dete' },
  { name: 'Хербали', icon: '🌿', count: 98, href: '/category/herbali' },
  { name: 'Орална хигиена', icon: '🦷', count: 45, href: '/category/oralna-higiena' },
];

const PRODUCTS = [
  { id: 1, name: 'Витамин Ц 1000mg - Имунитет и енергија', price: 450, discount: 20, badge: 'На попуст', image: '' },
  { id: 2, name: 'Магнезиум + Б6 комплекс', price: 320, discount: 0, badge: 'Ново', image: '' },
  { id: 3, name: 'Крем за лице SPF 50 - Заштита од сонце', price: 890, discount: 15, badge: undefined, image: '' },
  { id: 4, name: 'Витамин D3 2000IU капсули', price: 280, discount: 0, badge: undefined, image: '' },
  { id: 5, name: 'Калциум + Витамин D за коски', price: 380, discount: 25, badge: 'На попуст', image: '' },
  { id: 6, name: 'Пробиотици 50 милијарди CFU', price: 550, discount: 0, badge: 'Ново', image: '' },
  { id: 7, name: 'Омега 3 рибино масло 1000mg', price: 420, discount: 10, badge: undefined, image: '' },
  { id: 8, name: 'Цинк + Витамин Ц таблети', price: 290, discount: 0, badge: undefined, image: '' },
];

export default function Home() {
  const discountedProducts = PRODUCTS.filter((p) => p.discount && p.discount > 0);
  const newProducts = PRODUCTS.filter((p) => p.badge === 'Ново');

  return (
    <div className="bg-background min-h-screen">
      <TopBar />
      <PromoBanner />
      <Header />

      <main className="pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-4 lg:py-8">
          <HeroSlider />
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-foreground">Понуди</h2>
            <a href="/categories" className="text-primary text-sm lg:text-base font-medium hover:underline">
              Сите категории
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.name} {...cat} />
            ))}
          </div>
        </section>

        {/* Discounted Products */}
        <section className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-foreground">Само оваа седмица!</h2>
              <p className="text-sm text-muted-foreground hidden sm:block">Искористете ги најдобрите попусти</p>
            </div>
            <a href="/promotions" className="text-primary text-sm lg:text-base font-medium hover:underline">
              Сите понуди
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* New Products */}
        <section className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-foreground">Ново во понудата</h2>
              <p className="text-sm text-muted-foreground hidden sm:block">Најновите производи во нашата аптека</p>
            </div>
            <a href="/new" className="text-primary text-sm lg:text-base font-medium hover:underline">
              Види повеќе
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-foreground">Сите производи</h2>
            <a href="/products" className="text-primary text-sm lg:text-base font-medium hover:underline">
              Види сите
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl lg:text-3xl">🚚</span>
                </div>
                <h4 className="font-semibold text-sm lg:text-base mb-1">Бесплатна достава</h4>
                <p className="text-xs lg:text-sm text-muted-foreground">За нарачки над 1500 ден</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl lg:text-3xl">✅</span>
                </div>
                <h4 className="font-semibold text-sm lg:text-base mb-1">Оригинални производи</h4>
                <p className="text-xs lg:text-sm text-muted-foreground">100% гаранција</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl lg:text-3xl">💳</span>
                </div>
                <h4 className="font-semibold text-sm lg:text-base mb-1">Сигурно плаќање</h4>
                <p className="text-xs lg:text-sm text-muted-foreground">Картичка или готовина</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl lg:text-3xl">📞</span>
                </div>
                <h4 className="font-semibold text-sm lg:text-base mb-1">Брза поддршка</h4>
                <p className="text-xs lg:text-sm text-muted-foreground">Секој ден 08-21ч</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <BottomNav />
    </div>
  );
}
