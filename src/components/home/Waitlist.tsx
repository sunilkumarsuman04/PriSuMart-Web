import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlinePaperAirplane } from 'react-icons/hi2';
import { Container } from '../ui/Primitives';
import { OrbField } from '../shared/OrbField';
import { Reveal } from '../shared/Reveal';

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // Frontend-only placeholder — wire this to an email service later.
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-28 sm:py-36 bg-cream-50 dark:bg-ink-975">
      <OrbField intensity={8} />

      <Container className="relative">
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-ink-900 dark:text-cream-50 mb-10">
              PriSuMart, <span className="text-gradient-premium">coming soon</span>
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full glass shadow-glass text-ink-900 dark:text-cream-50 font-semibold"
                role="status"
              >
                <HiOutlineCheckCircle className="text-xl text-brand-500" />
                You're on the list
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-label="Join the PriSuMart waitlist"
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-3.5 rounded-full glass text-ink-900 dark:text-cream-50 placeholder:text-ink-900/35 dark:placeholder:text-cream-50/35 outline-none focus-visible:ring-2 focus-visible:ring-brand-400 min-h-[44px]"
                />
                <motion.button
                  type="submit"
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-grad-brand text-white font-display font-semibold shadow-glow-green min-h-[44px]"
                >
                  Join Waitlist
                  <HiOutlinePaperAirplane className="text-base -rotate-45 -mt-0.5" />
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
