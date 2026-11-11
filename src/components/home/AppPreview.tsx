import { motion } from 'framer-motion';
import { Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { HiOutlineBolt, HiOutlineMapPin, HiOutlineShieldCheck } from 'react-icons/hi2';
import { DownloadButton } from '../shared/DownloadButton';
import { StoreBadge } from '../shared/StoreBadge';
import { APP_CONFIG } from '../../config/app.config';
import splashWebp from '../../assets/images/app-screenshot-splash.webp';
import splashPng from '../../assets/images/app-screenshot-splash.png';
import homeWebp from '../../assets/images/app-screenshot-home.webp';
import homePng from '../../assets/images/app-screenshot-home.png';

const HIGHLIGHTS = [
  { icon: HiOutlineBolt, label: '30–40 min delivery' },
  { icon: HiOutlineMapPin, label: 'Live order tracking' },
  { icon: HiOutlineShieldCheck, label: 'UPI, cards & COD' },
];

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
          <div className="relative flex justify-center items-center gap-2 xs:gap-3 sm:gap-6 order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute inset-x-6 sm:inset-x-12 inset-y-4 rounded-[2.5rem] bg-grad-brand opacity-[0.12] dark:opacity-[0.18] blur-2xl"
            />
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200/70 dark:border-brand-700/40 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 motion-safe:animate-ping opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
                </span>
                {APP_CONFIG.live.subline}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-ink-900 dark:text-cream-50 mb-4 max-w-md text-balance">
                {APP_CONFIG.live.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg text-ink-800/70 dark:text-cream-50/65 mb-6 max-w-md leading-relaxed">
                Browse categories, grab flash deals, and get fresh groceries delivered in 30–40 minutes — all from one
                app. Your first basket is just a few taps away.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 max-w-md">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 px-3 py-1.5 text-sm font-medium text-ink-900 dark:text-cream-50 shadow-soft"
                  >
                    <Icon className="text-brand-600 dark:text-brand-300" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <DownloadButton size="lg" label={APP_CONFIG.live.cta} pulse />
                <StoreBadge className="hidden sm:inline-flex" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
