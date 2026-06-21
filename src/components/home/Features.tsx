import { SectionHeading } from '../ui/Primitives';
import { Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { FEATURES } from '../../data/features';

export function Features() {
  return (
    <section id="features" className="section bg-cream-50 dark:bg-ink-950">
      <Container>
        <SectionHeading
          eyebrow="Why PriSuMart"
          title="Everything you need, nothing you don't"
          description="Built for speed and reliability — from the moment you open the app to the moment groceries reach your door."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.id} delay={(i % 3) * 0.08}>
                <div className="group h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-1.5">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-300 text-2xl mb-5 group-hover:bg-grad-brand group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-cream-50 mb-2">{feature.title}</h3>
                  <p className="text-[15px] text-ink-800/65 dark:text-cream-50/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
