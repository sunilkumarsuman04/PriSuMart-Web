import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { SectionHeading, Container } from '../ui/Primitives';
import { Reveal } from '../shared/Reveal';
import { ContactForm } from './ContactForm';
import { SITE, SOCIAL_LINKS } from '../../data/site';

const ICON_MAP = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

const CONTACT_INFO = [
  { icon: HiOutlineEnvelope, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: HiOutlinePhone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { icon: HiOutlineMapPin, label: 'Address', value: SITE.address, href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="section bg-cream-50 dark:bg-ink-950">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Questions, feedback, partnerships? We're listening"
          description="Reach out and our team will respond within one business day."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12">
          {/* Contact info */}
          <Reveal>
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft hover:shadow-card transition-shadow">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-300 text-xl">
                      <Icon />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink-800/50 dark:text-cream-50/45 mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-[15px] font-medium text-ink-900 dark:text-cream-50">{item.value}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}

              <div className="p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-800/50 dark:text-cream-50/45 mb-3">
                  Follow us
                </div>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = ICON_MAP[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="h-10 w-10 rounded-full bg-brand-50 dark:bg-white/5 flex items-center justify-center text-brand-700 dark:text-cream-50/80 hover:bg-grad-brand hover:text-white transition-colors duration-200 min-h-[44px] min-w-[44px]"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-ink-900 border border-ink-900/5 dark:border-white/10 shadow-card">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
