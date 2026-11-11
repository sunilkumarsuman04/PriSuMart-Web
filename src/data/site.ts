import { APP_CONFIG } from '../config/app.config';

export const SITE = {
  name: APP_CONFIG.brand.name,
  tagline: APP_CONFIG.brand.tagline,
  legalName: 'PriSuMart',
  domain: 'https://www.prisumart.com',
  description:
    'PriSuMart delivers fresh fruits, vegetables, dairy, snacks and household essentials to your doorstep in 10–20 minutes.',
  email: 'prisumart26@gmail.com',
  phone: '+91 62055 26823',
  address: 'Btm Layout, Bangalore, India',
  deliveryWindow: '10–20 min',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/prisu_mart?igsh=eWp4NXkwMmRheWwy', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
};

// Store links live in src/config/app.config.ts — edit them there.
export const APP_LINKS = {
  playStore: {
    url: APP_CONFIG.playStoreUrl,
    label: APP_CONFIG.brand.storeName,
  },
};
