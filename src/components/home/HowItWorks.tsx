import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { STEPS } from '../../data/steps';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-white dark:bg-ink-900 relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="The Process"
          title="From browsing to your doorstep, in four steps"
          description="A real, typed sequence — each step happens in order, and the last one is the one that matters most: speed."
        />

        <div className="relative">
          {/* connecting line - desktop horizontal, mobile vertical */}
          <div
            className="hidden lg:block absolute top-[42px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-brand-200 via-sun-300 to-brand-200 dark:from-brand-800 dark:via-sun-700 dark:to-brand-800"
            aria-hidden="true"
          />
          <div
            className="lg:hidden absolute top-0 bottom-0 left-[27px] w-[2px] bg-gradient-to-b from-brand-200 via-sun-300 to-brand-200 dark:from-brand-800 dark:via-sun-700 dark:to-brand-800"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.id} delay={i * 0.12}>
                  <div className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center">
                    <div className="relative shrink-0">
                      <div className="h-14 w-14 rounded-2xl bg-grad-brand text-white flex items-center justify-center text-2xl shadow-glow-green relative z-10">
                        <Icon />
                      </div>
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-sun-500 text-white text-[11px] font-bold flex items-center justify-center shadow-soft z-20">
                        {step.number}
                      </span>
                    </div>
                    <div className="lg:mt-5 lg:px-2">
                      <h3 className="text-lg font-bold text-ink-900 dark:text-cream-50 mb-1.5">{step.title}</h3>
                      <p className="text-[15px] text-ink-800/65 dark:text-cream-50/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
