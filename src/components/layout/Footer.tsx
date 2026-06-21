import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { Logo } from '../shared/Logo';
import { Container } from '../ui/Primitives';
import { SITE, FOOTER_LINKS, SOCIAL_LINKS } from '../../data/site';

const ICON_MAP = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

export function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-ink-950 text-cream-50 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Logo size="sm" variant="light" />
            <p className="text-sm text-cream-50/60 leading-relaxed max-w-xs">
              {SITE.description} Fresh items, happy homes.
            </p>
            <div className="flex gap-3 mt-1">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_MAP[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center text-cream-50/70 hover:bg-grad-brand hover:text-white transition-colors duration-200"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-cream-50/90 mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-cream-50/60 hover:text-brand-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-cream-50/90 mb-4">Legal</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream-50/60 hover:text-brand-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-cream-50/90 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-cream-50/60 hover:text-brand-300 transition-colors">
                  <HiOutlineEnvelope className="text-base shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-cream-50/60 hover:text-brand-300 transition-colors">
                  <HiOutlinePhone className="text-base shrink-0" />
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-cream-50/45">
            &copy; {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-cream-50/45">Made with 🌿 in Bangalore, India</p>
        </div>
      </Container>
    </footer>
  );
}
