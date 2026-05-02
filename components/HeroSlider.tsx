'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Попусти до 50%',
    subtitle: 'На сите витамини и суплементи',
    bg: 'from-primary to-primary/80',
  },
  {
    id: 2,
    title: 'Нова колекција',
    subtitle: 'Козметика за лето 2026',
    bg: 'from-accent to-accent/80',
  },
  {
    id: 3,
    title: 'Бесплатна достава',
    subtitle: 'За нарачки над 1500 денари',
    bg: 'from-primary/90 to-accent/90',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full bg-gradient-to-r ${slide.bg} p-8 lg:p-16`}
          >
            <div className="max-w-xl">
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
                {slide.title}
              </h2>
              <p className="text-white/90 text-sm lg:text-lg mb-4 lg:mb-6">
                {slide.subtitle}
              </p>
              <button className="bg-white text-primary font-semibold px-6 py-2.5 lg:px-8 lg:py-3 rounded-lg hover:bg-white/90 transition text-sm lg:text-base">
                Дознај повеќе
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
