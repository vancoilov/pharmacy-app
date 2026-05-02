'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutList, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { Filters, FilterState } from '@/components/Filters';
import { PRODUCTS, CATEGORIES, Product } from '@/lib/data';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Популарност' },
  { value: 'price-asc', label: 'Цена: ниска → висока' },
  { value: 'price-desc', label: 'Цена: висока → ниска' },
  { value: 'newest', label: 'Најново' },
];

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceMin: 0,
    priceMax: 5000,
    onlyDiscount: false,
  });
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    result = result.filter((p) => {
      const finalPrice = p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
      return finalPrice >= filters.priceMin && finalPrice <= filters.priceMax;
    });

    // Discount filter
    if (filters.onlyDiscount) {
      result = result.filter((p) => p.discount && p.discount > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
    }

    return result;
  }, [filters, sortBy]);

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceMin > 0 ? 1 : 0) +
    (filters.priceMax < 5000 ? 1 : 0) +
    (filters.onlyDiscount ? 1 : 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">Дома</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Сите производи</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <Filters filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Сите производи</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredProducts.length} производи
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">Филтри</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition bg-white"
                  >
                    <span className="text-sm font-medium">
                      {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {showSortDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowSortDropdown(false)}
                      />
                      <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20 min-w-[200px]">
                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition first:rounded-t-lg last:rounded-b-lg ${
                              sortBy === option.value
                                ? 'text-primary font-medium bg-primary/5'
                                : 'text-foreground'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Активни филтри:</span>
                {filters.categories.map((catId) => {
                  const cat = CATEGORIES.find((c) => c.id === catId);
                  return (
                    <button
                      key={catId}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter((c) => c !== catId),
                        })
                      }
                      className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition"
                    >
                      {cat?.name}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                {filters.brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        brands: filters.brands.filter((b) => b !== brand),
                      })
                    }
                    className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition"
                  >
                    {brand}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {filters.onlyDiscount && (
                  <button
                    onClick={() => setFilters({ ...filters, onlyDiscount: false })}
                    className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent/20 transition"
                  >
                    На попуст
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      brands: [],
                      priceMin: 0,
                      priceMax: 5000,
                      onlyDiscount: false,
                    })
                  }
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Исчисти се
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Нема пронајдени производи
                </h3>
                <p className="text-muted-foreground mb-4">
                  Обидете се да ги промените филтрите
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      brands: [],
                      priceMin: 0,
                      priceMax: 5000,
                      onlyDiscount: false,
                    })
                  }
                  className="text-primary font-medium hover:underline"
                >
                  Ресетирај филтри
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowMobileFilters(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  );
}
