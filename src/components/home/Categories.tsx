import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { DownloadButton } from '../shared/DownloadButton';
import { CATEGORIES } from '../../data/categories';

export function Categories() {
  return (
    <section className="section bg-cream-100/60 dark:bg-ink-950">
      <Container>
        <SectionHeading
          eyebrow="Shop By Category"
          title="Everything on your list, sorted"
          description="From morning produce runs to late-night snack cravings — find it in seconds."
        />

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id} delay={(i % 8) * 0.05}>
                <div
                  className="group w-full flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
>
                  <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl ${category.bgClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                  </div>
                  <span className="text-sm font-semibold text-ink-900 dark:text-cream-50 text-center leading-tight">
                    {category.name}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-base text-ink-800/70 dark:text-cream-50/65">
              Every category, one tap away in the app.
            </p>
            <DownloadButton label="Shop in the App" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
