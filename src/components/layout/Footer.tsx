import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { StoreBadge } from '../shared/StoreBadge';
import { Container } from '../ui/Primitives';
import { SITE, FOOTER_LINKS, SOCIAL_LINKS } from '../../data/site';
import { APP_CONFIG } from '../../config/app.config';

const ICON_MAP = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-cream-50 pt-16 pb-[calc(2rem+var(--banner-h,0px))] transition-[padding] duration-300">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Logo size="sm" variant="light" />
            <p className="text-sm text-cream-50/60 leading-relaxed max-w-xs">
              {SITE.description} Fresh items, happy homes.
            </p>
            <div>
              <p className="text-sm font-semibold text-cream-50/90 mb-2.5">{APP_CONFIG.live.subline}</p>
              <StoreBadge />
            </div>
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
            <h3 className="font-display font-bold text-base text-cream-50 mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={{ pathname: '/', hash: link.href }}
                    className="text-sm text-cream-50/60 hover:text-brand-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-base text-cream-50 mb-4">Legal</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-cream-50/60 hover:text-brand-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-base text-cream-50 mb-4">
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

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-sm text-cream-50/50">
          <p>
            &copy; {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            {APP_CONFIG.poweredBy.prefix}{' '}
            <a
              href={APP_CONFIG.poweredBy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cream-50/80 underline decoration-cream-50/25 underline-offset-4 transition-colors hover:text-sun-300 hover:decoration-sun-300"
            >
              {APP_CONFIG.poweredBy.name}
            </a>
          </p>
          <p>Made with 🌿 in Bangalore, India</p>
        </div>
      </Container>
    </footer>
  );
}
