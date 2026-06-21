import { useEffect, useRef, useState } from 'react';

interface ParallaxValue {
  x: number; // -1 to 1, position relative to tracked element center
  y: number;
}

/**
 * Tracks pointer position relative to the center of a container element,
 * normalized to -1..1. Used to drive subtle parallax drift on ambient
 * orbs and floating panels. Returns {x: 0, y: 0} on touch devices or
 * when the user prefers reduced motion, so nothing janky happens there.
 */
export function useMouseParallax(ref: React.RefObject<HTMLElement | null>) {
  const [value, setValue] = useState<ParallaxValue>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (prefersReduced || isTouch) return;

    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setValue({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
      });
    };

    const handleLeave = () => setValue({ x: 0, y: 0 });

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return value;
}
