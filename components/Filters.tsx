'use client';

import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES, BRANDS } from '@/lib/data';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  onlyDiscount: boolean;
}

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Filters({ filters, onFiltersChange, onClose, isMobile }: FiltersProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    discount: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceMin: 0,
      priceMax: 5000,
      onlyDiscount: false,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 5000 ||
    filters.onlyDiscount;

  return (
    <div className={`bg-white ${isMobile ? 'h-full flex flex-col' : 'rounded-xl border border-border'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-bold text-lg">Филтри</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Ресетирај
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Content */}
      <div className={`${isMobile ? 'flex-1 overflow-y-auto' : ''} divide-y divide-border`}>
        {/* Categories */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="font-semibold">Категорија</span>
            {openSections.categories ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {openSections.categories && (
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm group-hover:text-primary transition">
                    {cat.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    ({cat.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="font-semibold">Цена</span>
            {openSections.price ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {openSections.price && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.priceMin || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceMin: Number(e.target.value) || 0,
                    })
                  }
                  placeholder="Од"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  value={filters.priceMax === 5000 ? '' : filters.priceMax}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceMax: Number(e.target.value) || 5000,
                    })
                  }
                  placeholder="До"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Цена во денари
              </div>
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('brands')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="font-semibold">Бренд</span>
            {openSections.brands ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {openSections.brands && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm group-hover:text-primary transition">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Discount Only */}
        <div className="p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyDiscount}
              onChange={(e) =>
                onFiltersChange({ ...filters, onlyDiscount: e.target.checked })
              }
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-semibold">Само на попуст</span>
          </label>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Примени филтри
          </button>
        </div>
      )}
    </div>
  );
}
