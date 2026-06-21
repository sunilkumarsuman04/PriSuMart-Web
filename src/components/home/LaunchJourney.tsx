import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { JOURNEY_PHASES } from '../../data/journey';

export function LaunchJourney() {
  return (
    <section className="section bg-ink-975 dark:bg-cream-50 relative overflow-hidden">
      {/* This section deliberately inverts: dark when the rest is light, and
          vice versa, to punctuate the page rhythm — a common premium-SaaS
          pacing trick (Linear/Stripe alternate section weight this way).
          Because of the inversion, text colors here are the mirror image
          of the shared SectionHeading component, so we build it inline. */}
      <div className="absolute inset-0 bg-grad-mesh opacity-60" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-[11px] font-display font-bold uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full glass text-sun-400 dark:text-sun-700 mb-4">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-cream-50 dark:text-ink-900 mb-4">
            Not local. Not small. Not temporary.
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-cream-50/65 dark:text-ink-800/65">
            Building the future of grocery delivery, one city at a time.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-brand-500/40 via-sun-400/40 to-brand-500/10"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {JOURNEY_PHASES.map((phase, i) => (
              <Reveal key={phase.id} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`relative z-10 h-12 w-12 rounded-full flex items-center justify-center mb-5 ${
                      phase.status === 'active'
                        ? 'bg-grad-brand shadow-glow-green'
                        : 'glass'
                    }`}
                  >
                    {phase.status === 'active' ? (
                      <HiOutlineCheckCircle className="text-2xl text-white" />
                    ) : (
                      <span className="text-sm font-bold text-cream-50/60 dark:text-ink-900/50">{i + 1}</span>
                    )}
                  </motion.div>
                  <span className="text-xs font-display font-bold uppercase tracking-[0.18em] text-sun-400 dark:text-sun-600 mb-2">
                    {phase.phase}
                  </span>
                  <h3 className="text-xl font-bold text-cream-50 dark:text-ink-900 mb-2">{phase.title}</h3>
                  <p className="text-[15px] text-cream-50/55 dark:text-ink-800/60 leading-relaxed max-w-xs">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
