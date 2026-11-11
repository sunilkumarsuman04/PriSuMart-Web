import { FaGooglePlay } from 'react-icons/fa';
import { APP_CONFIG } from '../../config/app.config';

interface StoreBadgeProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/** "Get it on Google Play" badge — live link to the Play Store listing. */
export function StoreBadge({ variant = 'dark', className = '' }: StoreBadgeProps) {
  const tone =
    variant === 'light'
      ? 'bg-white text-ink-900 border border-ink-900/10'
      : 'bg-ink-900 text-white border border-white/10';

  return (
    <a
      href={APP_CONFIG.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${APP_CONFIG.brand.name} on ${APP_CONFIG.brand.storeName} (opens in a new tab)`}
      className={`group inline-flex items-center gap-3 px-5 py-3 rounded-xl min-h-[52px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97] ${tone} ${className}`}
    >
      <FaGooglePlay aria-hidden="true" className="text-2xl shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-medium opacity-70">Get it on</span>
        <span className="text-base font-bold font-display">{APP_CONFIG.brand.storeName}</span>
      </span>
    </a>
  );
}
