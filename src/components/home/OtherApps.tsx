import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { OTHER_APPS } from '../../data/otherApps';

export function OtherApps() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <Container>
        <SectionHeading
          eyebrow="From Our Team"
          title="More apps, coming from PriSuMart"
          description="We're building a small family of useful apps. This space will grow as new ones launch."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {OTHER_APPS.map((app, i) => {
            const accentBg = app.accent === 'brand' ? 'bg-grad-brand' : 'bg-grad-sun';
            return (
              <Reveal key={app.id} delay={i * 0.08}>
                <div className="h-full p-6 rounded-2xl border border-ink-900/5 dark:border-white/10 bg-cream-50 dark:bg-ink-950 hover:shadow-lift transition-all duration-300 flex flex-col">
                  <div className={`h-12 w-12 rounded-xl ${accentBg} text-white font-display font-bold text-xl flex items-center justify-center mb-4 shadow-soft`}>
                    {app.iconLetter}
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-cream-50 mb-1.5">{app.name}</h3>
                  <p className="text-[15px] text-ink-800/65 dark:text-cream-50/60 leading-relaxed mb-5 flex-1">
                    {app.description}
                  </p>
                  <a
                    href={app.url}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300 hover:gap-2.5 transition-all w-fit"
                  >
                    Visit
                    <HiOutlineArrowUpRight />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
