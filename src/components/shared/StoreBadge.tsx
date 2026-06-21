import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { APP_LINKS } from '../../data/site';

interface StoreBadgeProps {
  store: 'playStore' | 'appStore';
  variant?: 'light' | 'dark';
}

export function StoreBadge({ store, variant = 'dark' }: StoreBadgeProps) {
  const config = APP_LINKS[store];
  const isDisabled = config.comingSoon || !config.url;
  const Icon = store === 'playStore' ? FaGooglePlay : FaApple;
  const label = store === 'playStore' ? 'Google Play' : 'App Store';
  const sublabel = isDisabled ? 'Coming soon' : 'GET IT ON';

  const baseClasses = `flex items-center gap-3 px-5 py-3 rounded-xl min-h-[52px] transition-all duration-200 ${
    variant === 'light' ? 'bg-white text-ink-900 border border-ink-900/10' : 'bg-ink-900 text-white border border-white/10'
  }`;

  const content = (
    <>
      <Icon className="text-2xl shrink-0" />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-medium opacity-60 uppercase tracking-wide">{sublabel}</span>
        <span className="text-base font-bold font-display">{label}</span>
      </div>
    </>
  );

  if (isDisabled) {
    return (
      <button
        disabled
        aria-disabled="true"
        aria-label={`${label} — coming soon`}
        className={`${baseClasses} opacity-60 cursor-not-allowed`}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={config.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download PriSuMart on ${label}`}
      className={`${baseClasses} hover:-translate-y-0.5 hover:shadow-lift`}
    >
      {content}
    </a>
  );
}
