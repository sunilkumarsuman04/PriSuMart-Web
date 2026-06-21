import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Brief, branded loading moment shown once per session on first load.
 * Exists purely for the premium "product launch" feel the redesign calls
 * for — short enough (under a second of visible hold) not to annoy
 * returning visitors, and skipped entirely for prefers-reduced-motion.
 */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-975"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 450);
        }}
        className="flex flex-col items-center gap-5"
      >
        <Logo size="md" variant="light" />
        <div className="h-[3px] w-32 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-grad-brand rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
