'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'discount' | 'new' | 'sale';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-foreground',
    discount: 'bg-red-500 text-white',
    new: 'bg-accent text-accent-foreground',
    sale: 'bg-green-500 text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
        variants[variant]
      }`}
    >
      {children}
    </span>
  );
}
