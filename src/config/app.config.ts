/**
 * PriSuMart — central app configuration
 * ---------------------------------------------------------------------------
 * Single source of truth for store links, branding and download-banner copy.
 * Change a value here and it updates everywhere: navbar, hero, banner, footer,
 * chatbot knowledge base and the <head> metadata (index.html is filled from
 * this file at build time by the plugin in vite.config.ts).
 *
 * Keep this file free of imports and browser APIs so it can be used from the
 * frontend, the Vite config and the serverless chatbot function alike.
 */

export const APP_CONFIG = {
  /** Live Google Play listing. Every "Download App" button reads this. */
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.prisumart.customer.app',

  /** Android package name of the customer app (informational). */
  androidPackage: 'com.prisumart.customer.app',

  /** Brand information used by the banner, metadata and structured data. */
  brand: {
    name: 'PriSuMart',
    tagline: 'Fresh Groceries Delivered Fast',
    motto: 'Fresh Items, Happy Homes',
    platform: 'Android',
    storeName: 'Google Play',
  },

  /** Floating bottom banner copy. */
  banner: {
    heading: 'Your Daily Groceries, Just a Tap Away!',
    subtitle: 'Download PriSuMart and enjoy convenient grocery shopping.',
    cta: 'Download App',
    dismissLabel: 'Dismiss download banner',
  },

  /** "Now live" messaging reused by the hero and app section. */
  live: {
    badge: 'Now live on Google Play',
    headline: 'PriSuMart is Now Live!',
    subline: 'Available Now on Google Play',
    cta: 'Download the App Today',
  },

  /**
   * Footer credit. `url` is a PLACEHOLDER — replace it with the real
   * AshPro InfoTech website when you have it. It is used nowhere else.
   */
  poweredBy: {
    prefix: 'Powered by',
    name: 'AshPro InfoTech',
    url: 'ashpro.prisumart.in',
  },
} as const;
