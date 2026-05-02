'use client';

import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
  href: string;
}

export function CategoryCard({ name, icon, count, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition group"
    >
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/10 transition">
        <span className="text-3xl lg:text-4xl">{icon}</span>
      </div>
      <h3 className="font-semibold text-sm lg:text-base text-foreground text-center mb-1">
        {name}
      </h3>
      <span className="text-xs text-muted-foreground">{count} производи</span>
    </Link>
  );
}
