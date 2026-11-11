import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scrolling on route changes:
 *  - `/#section` links scroll smoothly to that section (works from any page,
 *    including the legal pages, and waits for lazy routes to mount);
 *  - navigating to a new page without a hash returns to the top.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const first = isFirstRender.current;
    isFirstRender.current = false;

    if (!hash) {
      if (!first) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer: number | undefined;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts++ < 20) {
        timer = window.setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
