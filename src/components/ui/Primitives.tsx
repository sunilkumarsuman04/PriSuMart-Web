import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container max-w-7xl ${className}`}>{children}</div>;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', light }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignClass} max-w-2xl ${align === 'center' ? 'mx-auto' : ''} mb-12 lg:mb-16`}>
      {eyebrow && (
        <span
          className={`text-xs font-display font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full ${
            light ? 'bg-white/10 text-sun-300' : 'bg-sun-100 text-sun-700 dark:bg-sun-900/30 dark:text-sun-400'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight ${
          light ? 'text-white' : 'text-ink-900 dark:text-cream-50'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-cream-50/75' : 'text-ink-800/70 dark:text-cream-50/65'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
