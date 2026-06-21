import { HiOutlineShoppingCart, HiOutlineHome } from 'react-icons/hi2';
import { TbScooter } from 'react-icons/tb';

interface DeliveryRibbonProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * The signature visual motif of the site: cart -> scooter -> home,
 * encoding PriSuMart's actual product promise (speed) rather than
 * a decorative flourish. Reused in Hero and How It Works.
 */
export function DeliveryRibbon({ variant = 'light', className = '' }: DeliveryRibbonProps) {
  const trackColor = variant === 'light' ? 'bg-ink-900/10 dark:bg-white/15' : 'bg-white/20';
  const dotColor = variant === 'light' ? 'bg-brand-500' : 'bg-sun-400';
  const iconColor = variant === 'light' ? 'text-brand-700 dark:text-brand-300' : 'text-white';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`} aria-hidden="true">
      <HiOutlineShoppingCart className={`text-lg shrink-0 ${iconColor}`} />
      <div className={`relative h-[3px] flex-1 rounded-full overflow-hidden ${trackColor}`}>
        <div className={`absolute inset-y-0 left-0 w-1/3 rounded-full ${dotColor} animate-marquee`} style={{ width: '40%' }} />
      </div>
      <TbScooter className={`text-xl shrink-0 ${iconColor}`} />
      <div className={`relative h-[3px] flex-1 rounded-full overflow-hidden ${trackColor}`}>
        <div className={`absolute inset-y-0 left-0 w-1/3 rounded-full ${dotColor} animate-marquee`} style={{ width: '40%', animationDelay: '0.6s' }} />
      </div>
      <HiOutlineHome className={`text-lg shrink-0 ${iconColor}`} />
    </div>
  );
}
