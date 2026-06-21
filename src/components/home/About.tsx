import { HiOutlineRocketLaunch, HiOutlineEye, HiOutlineFlag, HiOutlineMap } from 'react-icons/hi2';
import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';

const PILLARS = [
  {
    icon: HiOutlineFlag,
    title: 'Our Story',
    body: 'PriSuMart started with a simple frustration: grocery runs that ate up evenings. We built a delivery network that puts fresh produce, dairy and daily essentials a few taps away, starting right here in Patna.',
  },
  {
    icon: HiOutlineRocketLaunch,
    title: 'Our Mission',
    body: 'Make fresh groceries accessible to every household in under an hour, while supporting the local stores that supply them.',
  },
  {
    icon: HiOutlineEye,
    title: 'Our Vision',
    body: 'A city where no one has to choose between freshness and convenience — where the nearest store is always just a few minutes away.',
  },
  {
    icon: HiOutlineMap,
    title: 'What\u2019s Next',
    body: 'We\u2019re expanding to new neighbourhoods, adding more local partner stores, and building features that make repeat ordering effortless.',
  },
];

export function About() {
  return (
    <section id="about" className="section bg-cream-100/60 dark:bg-ink-950">
      <Container>
        <SectionHeading
          eyebrow="About PriSuMart"
          title="Fresh items, happy homes — that's the whole idea"
          description="We're a grocery delivery platform built for speed, freshness and trust, growing one neighbourhood at a time."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={(i % 2) * 0.1}>
                <div className="h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-300 text-2xl mb-5">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2.5">{pillar.title}</h3>
                  <p className="text-[15px] text-ink-800/70 dark:text-cream-50/65 leading-relaxed">{pillar.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
