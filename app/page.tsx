'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: 'Витамин Ц 1000mg',
    price: 450,
    discount: 20,
    badge: 'На попуст',
  },
  {
    id: 2,
    name: 'Магнезиум + Б6',
    price: 320,
    discount: 0,
    badge: 'Ново',
  },
  {
    id: 3,
    name: 'Крем за лице SPF 50',
    price: 890,
    discount: 15,
    badge: undefined,
  },
  {
    id: 4,
    name: 'Витамин D3 2000IU',
    price: 280,
    discount: 0,
    badge: undefined,
  },
  {
    id: 5,
    name: 'Калциум + Витамин D',
    price: 380,
    discount: 25,
    badge: 'На попуст',
  },
  {
    id: 6,
    name: 'Пробиотици 50 млрд',
    price: 550,
    discount: 0,
    badge: 'Ново',
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="max-w-md mx-auto px-4 pt-4 pb-20">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white mb-6 shadow-md">
          <h1 className="text-2xl font-bold mb-2">🏥 Добредојде!</h1>
          <p className="text-sm opacity-90">Најдобрите производи за здравје</p>
        </div>

        {/* Categories Shortcut */}
        <div className="mb-6 overflow-x-auto -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {['Витамини', 'Масло', 'Козметика', 'За деца', 'Хербали'].map(
              (cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium whitespace-nowrap hover:bg-muted transition"
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Sections */}
        <SectionProducts title="На попуст" products={PRODUCTS.filter((p) => p.discount)} />
        <SectionProducts title="Ново" products={PRODUCTS.filter((p) => p.badge === 'Ново')} />
        <SectionProducts title="Сите производи" products={PRODUCTS} />
      </main>

      <BottomNav />
    </div>
  );
}

function SectionProducts({ title, products }: { title: string; products: typeof PRODUCTS }) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <a href="#" className="text-primary text-sm font-medium hover:underline">
          Повеќе
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image=""
            name={product.name}
            price={product.price}
            discount={product.discount}
            badge={product.badge}
          />
        ))}
      </div>
    </section>
  );
}
