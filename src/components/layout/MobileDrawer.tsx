import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import { Logo } from '../shared/Logo';
import { DownloadButton } from '../shared/DownloadButton';
import { NAV_LINKS } from '../../data/site';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[70] h-full w-[82%] max-w-sm bg-white dark:bg-ink-900 shadow-2xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-between px-5 py-5 border-b border-ink-900/5 dark:border-white/10">
              <Logo size="sm" />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-ink-900/5 dark:hover:bg-white/10 text-ink-900 dark:text-cream-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-5 py-6 flex-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={{ pathname: '/', hash: link.href }}
                  onClick={onClose}
                  className="text-left text-lg font-display font-semibold text-ink-900 dark:text-cream-50 py-3.5 px-3 rounded-xl hover:bg-brand-50 dark:hover:bg-white/5 active:bg-brand-100 transition-colors min-h-[44px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-5 py-6 border-t border-ink-900/5 dark:border-white/10">
              <DownloadButton fullWidth size="lg" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
