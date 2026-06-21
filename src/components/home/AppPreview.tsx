import { motion } from 'framer-motion';
import { Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { StoreBadge } from '../shared/StoreBadge';
import splashWebp from '../../assets/images/app-screenshot-splash.webp';
import splashPng from '../../assets/images/app-screenshot-splash.png';
import homeWebp from '../../assets/images/app-screenshot-home.webp';
import homePng from '../../assets/images/app-screenshot-home.png';

function PhoneFrame({
  webp,
  png,
  alt,
  rotateClass,
  delay,
}: {
  webp: string;
  png: string;
  alt: string;
  rotateClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${rotateClass}`}
    >
      <div className="relative w-[130px] xs:w-[150px] sm:w-[190px] lg:w-[230px] rounded-[1.5rem] sm:rounded-[2rem] border-[4px] sm:border-[6px] border-ink-900 dark:border-white/20 bg-ink-900 shadow-lift overflow-hidden aspect-[9/19.5]">
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img
            src={png}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-ink-900 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}

export function AppPreview() {
  return (
    <section id="app-preview" className="section bg-cream-50 dark:bg-ink-950 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 h-72 w-72 rounded-full bg-brand-200/30 dark:bg-brand-700/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phones */}
          <div className="flex justify-center items-center gap-2 xs:gap-3 sm:gap-6 order-2 lg:order-1">
            <PhoneFrame
              webp={splashWebp}
              png={splashPng}
              alt="PriSuMart app splash screen showing the logo and tagline"
              rotateClass="rotate-[-6deg] -mr-1 xs:-mr-2 sm:-mr-6 z-0"
              delay={0.1}
            />
            <PhoneFrame
              webp={homeWebp}
              png={homePng}
              alt="PriSuMart app home screen showing categories, best sellers and flash deals"
              rotateClass="rotate-[4deg] z-10"
              delay={0.25}
            />
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sun-100 dark:bg-sun-900/30 text-sun-700 dark:text-sun-400 text-sm font-semibold mb-5">
                📱 Launching soon
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-ink-900 dark:text-cream-50 mb-4 max-w-md">
                The PriSuMart app is almost ready
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg text-ink-800/70 dark:text-cream-50/65 mb-8 max-w-md leading-relaxed">
                Browse categories, track flash deals, and get fresh groceries delivered in{' '}
                {' '}30–40 minutes — all from one app. We're polishing the final details before launch.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-3">
                <StoreBadge store="playStore" />
                <StoreBadge store="appStore" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
