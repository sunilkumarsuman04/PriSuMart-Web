import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineClock, HiOutlineCheckBadge } from 'react-icons/hi2';
import { Container } from '../ui/Primitives';
import { Button } from '../ui/Button';
import { DeliveryRibbon } from '../shared/DeliveryRibbon';
import { GroceryIllustration } from './GroceryIllustration';
import { SITE } from '../../data/site';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-grad-hero dark:bg-grad-dark pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
    >
      {/* ambient blobs */}
      <div className="absolute -top-24 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-brand-200/40 dark:bg-brand-700/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-sun-200/40 dark:bg-sun-700/10 blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
          {/* Left: copy */}
          <motion.div initial="hidden" animate="visible" className="flex flex-col gap-6 lg:gap-7 text-center lg:text-left items-center lg:items-start">
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-brand-200/60 dark:border-white/15 text-brand-700 dark:text-brand-300 text-sm font-semibold shadow-soft"
            >
              <HiOutlineCheckBadge className="text-base" />
              📍 Launching First in Jhajha, Bihar
Growing City by City Across India
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-ink-900 dark:text-cream-50 max-w-xl"
            >
              Fresh Groceries Delivered To Your{' '}
              <span className="text-gradient-brand">Doorstep</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-ink-800/75 dark:text-cream-50/70 max-w-md leading-relaxed"
            >
              {SITE.tagline} — order fruits, vegetables, dairy and daily essentials from{' '}
              {SITE.name}, and get them delivered in {SITE.deliveryWindow}.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                icon={<HiOutlineArrowRight />}
                onClick={() => document.querySelector('#app-preview')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Download App
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-ink-900/10 dark:border-white/15"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Delivery ribbon signature element */}
            <motion.div custom={4} variants={fadeUp} className="w-full max-w-sm pt-2">
              <DeliveryRibbon />
              <p className="text-xs font-medium text-ink-800/55 dark:text-cream-50/50 mt-2 text-center lg:text-left">
                Store to doorstep, tracked live, every order
              </p>
            </motion.div>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="animate-float">
                <GroceryIllustration className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* floating delivery-time badge - part of the signature motif */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute top-4 right-2 sm:right-4 glass dark:glass rounded-2xl px-4 py-3 shadow-lift flex items-center gap-2.5"
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sun-400 animate-pulse-ring" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sun-500" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] font-medium text-ink-900/60 dark:text-cream-50/70">Delivery in</span>
                  <span className="text-sm font-bold text-ink-900 dark:text-white flex items-center gap-1">
                    <HiOutlineClock className="text-brand-600 dark:text-brand-300" />
                    {SITE.deliveryWindow}
                  </span>
                </div>
              </motion.div>

              {/* fresh badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="absolute bottom-6 -left-2 sm:left-2 bg-white dark:bg-ink-800 rounded-2xl px-4 py-2.5 shadow-lift flex items-center gap-2 border border-brand-100 dark:border-white/10"
              >
                <span className="text-xl">🌿</span>
                <span className="text-sm font-bold text-ink-900 dark:text-cream-50">100% Fresh</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
