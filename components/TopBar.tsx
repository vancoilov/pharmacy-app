'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 hidden md:block">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            +389 71 123 456
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            info@apteka.mk
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Скопје, Македонија
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Пон-Саб: 08:00 - 21:00, Нед: 09:00 - 15:00
        </div>
      </div>
    </div>
  );
}
