import { useEffect, useState } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Logo } from '../shared/Logo';
import { ThemeToggle } from '../shared/ThemeToggle';
import { Button } from '../ui/Button';
import { Container } from '../ui/Primitives';
import { MobileDrawer } from './MobileDrawer';
import { NAV_LINKS } from '../../data/site';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-ink-950/85 backdrop-blur-lg shadow-soft py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between" aria-label="Primary">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="PriSuMart home">
              <Logo size="sm" />
            </a>

            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2 rounded-full text-[15px] font-medium text-ink-800 dark:text-cream-50/90 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50 dark:hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <div className="hidden sm:block">
                <Button size="sm" onClick={() => document.querySelector('#app-preview')?.scrollIntoView({ behavior: 'smooth' })}>
                  Download App
                </Button>
              </div>
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full text-ink-900 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
              >
                <HiOutlineBars3 className="text-2xl" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
