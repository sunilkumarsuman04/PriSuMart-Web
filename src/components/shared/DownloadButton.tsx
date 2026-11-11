import { FaGooglePlay } from 'react-icons/fa';
import { buttonClasses } from '../ui/buttonStyles';
import type { Variant, Size } from '../ui/buttonStyles';
import { APP_CONFIG } from '../../config/app.config';

interface DownloadButtonProps {
  label?: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Adds the soft attention pulse (disabled automatically for reduced-motion users). */
  pulse?: boolean;
  className?: string;
}

/**
 * The one "Download App" link used across the site. It always points at the
 * Play Store URL from app.config.ts and opens in a new tab.
 */
export function DownloadButton({
  label = APP_CONFIG.banner.cta,
  variant = 'primary',
  size = 'md',
  fullWidth,
  pulse,
  className = '',
}: DownloadButtonProps) {
  return (
    <a
      href={APP_CONFIG.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses({
        variant,
        size,
        fullWidth,
        className: `${pulse ? 'motion-safe:animate-cta-pulse' : ''} ${className}`,
      })}
    >
      <FaGooglePlay aria-hidden="true" className="text-[1em] shrink-0" />
      <span>{label}</span>
      <span className="sr-only"> (opens Google Play in a new tab)</span>
    </a>
  );
}
