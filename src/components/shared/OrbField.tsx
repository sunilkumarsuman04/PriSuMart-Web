import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

interface OrbFieldProps {
  className?: string;
  intensity?: number;
}

/**
 * The site's signature ambient visual: a handful of large, soft gradient
 * orbs that drift slowly on their own and shift subtly with the cursor.
 * This is the "raising millions" hero backdrop — restrained, slow,
 * never distracting from the headline above it.
 */
export function OrbField({ className = '', intensity = 14 }: OrbFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(containerRef);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-dot-grid opacity-50" />

      <motion.div
        animate={{ x: parallax.x * intensity, y: parallax.y * intensity }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute -top-1/4 -left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand-500/30 dark:bg-brand-500/25 blur-[120px] animate-drift"
      />
      <motion.div
        animate={{ x: parallax.x * -intensity * 1.4, y: parallax.y * -intensity * 1.4 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute top-0 -right-1/4 h-[30rem] w-[30rem] rounded-full bg-sun-500/20 dark:bg-sun-500/15 blur-[130px] animate-drift-slow"
      />
      <motion.div
        animate={{ x: parallax.x * intensity * 0.8, y: parallax.y * -intensity * 0.8 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-brand-400/20 dark:bg-brand-400/15 blur-[120px] animate-drift-slower"
      />
    </div>
  );
}
