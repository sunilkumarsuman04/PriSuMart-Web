import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { WHY_PRISUMART } from '../../data/whyChooseUs';

export function WhyChooseUs() {
  return (
    <section className="section bg-grad-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sun-500/10 blur-3xl pointer-events-none" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built to earn your trust, one order at a time"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WHY_PRISUMART.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <div className="glass rounded-2xl p-6 sm:p-7 h-full hover:bg-white/[0.12] transition-colors duration-300">
                  <div className="h-12 w-12 rounded-xl bg-sun-500/20 flex items-center justify-center text-sun-400 text-2xl mb-5">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[15px] text-cream-50/65 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
