import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
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
                <button
                  className="group w-full flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
                  aria-label={`Browse ${category.name}`}
                >
                  <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl ${category.bgClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                  </div>
                  <span className="text-sm font-semibold text-ink-900 dark:text-cream-50 text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
