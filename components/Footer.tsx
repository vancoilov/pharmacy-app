'use client';

import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-white pb-20 lg:pb-0">
      {/* Newsletter */}
      <div className="bg-primary py-8 lg:py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
            Добивајте ги промоциите
          </h3>
          <p className="text-white/80 mb-4 text-sm lg:text-base">
            Пријавете се за најнови понуди и попусти
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Вашата е-пошта"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground outline-none text-sm"
            />
            <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition text-sm">
              Претплати се
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">Аптека</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Вашата доверлива онлајн аптека за витамини, козметика и здравствени производи.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Брзи линкови</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition">За нас</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Контакт</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Најчести прашања</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Достава</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/category/vitamini" className="hover:text-white transition">Витамини</Link></li>
              <li><Link href="/category/kozmetika" className="hover:text-white transition">Козметика</Link></li>
              <li><Link href="/category/zdravje" className="hover:text-white transition">Здравје</Link></li>
              <li><Link href="/category/herbali" className="hover:text-white transition">Хербали</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакт</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +389 71 123 456
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@apteka.mk
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>ул. Македонија бр. 1, Скопје</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-white/50">
          &copy; 2026 Аптека. Сите права задржани.
        </div>
      </div>
    </footer>
  );
}
