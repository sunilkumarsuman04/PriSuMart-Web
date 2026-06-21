import logoWebp from '../../assets/images/logo.webp';
import logoPng from '../../assets/images/logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'default' | 'light';
}

const sizeMap = {
  sm: { img: 'h-9 w-9', text: 'text-lg', tagline: 'text-[10px]' },
  md: { img: 'h-11 w-11', text: 'text-xl', tagline: 'text-[11px]' },
  lg: { img: 'h-16 w-16 sm:h-20 sm:w-20', text: 'text-2xl sm:text-3xl', tagline: 'text-xs sm:text-sm' },
};

export function Logo({ size = 'md', showTagline = false, variant = 'default' }: LogoProps) {
  const s = sizeMap[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900 dark:text-cream-50';
  const taglineColor = variant === 'light' ? 'text-cream-50/70' : 'text-ink-800/60 dark:text-cream-50/55';

  return (
    <div className="flex items-center gap-2.5">
      <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <img
          src={logoPng}
          alt="PriSuMart logo"
          width={64}
          height={64}
          className={`${s.img} object-contain shrink-0`}
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="flex flex-col leading-tight">
        <span className={`font-display font-extrabold ${s.text} ${textColor}`}>
          Pri<span className="text-sun-500">Su</span> Mart
        </span>
        {showTagline && <span className={`font-medium ${s.tagline} ${taglineColor}`}>Fresh Items, Happy Homes</span>}
      </div>
    </div>
  );
}
