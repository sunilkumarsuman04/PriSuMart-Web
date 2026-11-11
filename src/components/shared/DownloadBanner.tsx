import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import logoIconWebp from '../../assets/images/logo-icon.webp';
import logoIconPng from '../../assets/images/logo-icon.png';
import { DownloadButton } from './DownloadButton';
import { APP_CONFIG } from '../../config/app.config';

const DISMISS_KEY = 'prisumart:download-banner-dismissed';
const SHOW_DELAY_MS = 1200;

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Floating bottom "Download App" banner, shown on every route.
 *
 * It publishes its own height as the CSS variable --banner-h on <html>, which
 * the footer and the chat launcher use as extra bottom space so the banner
 * never covers content. Dismissal lasts for the browser session.
 */
export function DownloadBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(readDismissed);
  const ref = useRef<HTMLDivElement>(null);

  // Appear shortly after load so it doesn't compete with the hero.
  useEffect(() => {
    if (dismissed) return;
    const t = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [dismissed]);

  // Keep --banner-h in sync with the banner's real size (responsive text wrapping, rotation…).
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!visible || !el) {
      root.style.setProperty('--banner-h', '0px');
      return;
    }
    const update = () => {
      const gap = parseFloat(getComputedStyle(el).bottom) || 0;
      root.style.setProperty('--banner-h', `${Math.ceil(el.offsetHeight + gap)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty('--banner-h', '0px');
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* storage unavailable (private mode) — banner simply returns next visit */
    }
  };

  const { heading, subtitle, dismissLabel } = APP_CONFIG.banner;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          role="region"
          aria-label="Download the PriSuMart app"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0, transition: { duration: 0.25 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed inset-x-3 sm:inset-x-6 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[45] mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-ink-900/95 dark:bg-ink-800/95 backdrop-blur-xl border border-white/10 shadow-lift">
            {/* quiet brand glow — decorative */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-brand-500/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -bottom-16 h-36 w-36 rounded-full bg-sun-500/20 blur-3xl"
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-5 p-3 pr-11 sm:p-4 sm:pr-16">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-soft">
                  <picture>
                    <source srcSet={logoIconWebp} type="image/webp" />
                    <img src={logoIconPng} alt="PriSuMart" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8 object-contain" decoding="async" />
                  </picture>
                </span>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base leading-tight text-white">{heading}</p>
                  <p className="text-xs sm:text-sm text-cream-50/70 leading-snug mt-0.5 line-clamp-2">{subtitle}</p>
                </div>
              </div>

              <DownloadButton variant="secondary" size="sm" pulse className="w-full sm:w-auto sm:px-5 sm:py-3 sm:text-[15px] shrink-0" />
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label={dismissLabel}
              className="absolute top-1 right-1 sm:top-3 sm:right-3 flex h-10 w-10 items-center justify-center rounded-full text-cream-50/70 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90 focus-visible:outline-sun-400"
            >
              <HiXMark className="text-xl" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
