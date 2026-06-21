# PriSuMart — Marketing Website

A modern, responsive, production-ready marketing website for **PriSuMart** — a grocery delivery platform. This is a **frontend-only public website** (not the admin panel, not the customer app) built to promote the brand and host Play Store / App Store links once the app launches.

**Tagline:** Fresh Groceries Delivered Fast
**Brand colors:** Green (`#2E8B3D`) primary, Orange (`#F5A623`) for CTAs and accents — derived from the PriSuMart logo.

---

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** (v3, class-based dark mode)
- **Framer Motion** (scroll reveals, page-load animation, micro-interactions)
- **React Icons** (`hi2`, `gi`, `lu`, `pi`, `tb`, `fa` icon sets)
- **React Router** (for `/privacy-policy` and `/terms-and-conditions`)
- **React Helmet Async** (per-page `<title>` management)

---

## Project Structure

```
prisumart/
├── public/
│   ├── favicon.png            # generated from logo
│   ├── apple-touch-icon.png
│   └── og-image.png           # social share preview image
├── src/
│   ├── assets/images/         # logo + app screenshots (webp + png fallback)
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, MobileDrawer
│   │   ├── home/               # All homepage sections (Hero, Features, etc.)
│   │   ├── shared/             # Logo, ThemeToggle, Reveal, DeliveryRibbon, StoreBadge
│   │   └── ui/                 # Button, Container, SectionHeading primitives
│   ├── context/
│   │   └── ThemeContext.tsx    # dark/light mode provider
│   ├── data/                   # Site content — edit here, not in components
│   │   ├── site.ts             # nav links, contact info, APP_LINKS (store URLs)
│   │   ├── features.ts
│   │   ├── steps.ts
│   │   ├── categories.ts
│   │   ├── whyChooseUs.ts
│   │   └── otherApps.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   └── TermsPage.tsx
│   ├── App.tsx                 # routing + providers
│   ├── main.tsx
│   └── index.css               # Tailwind layers + base styles
├── tailwind.config.js           # full design token system (colors, fonts, shadows, animations)
├── vite.config.ts               # manual chunk splitting for performance
└── index.html                   # SEO meta, Open Graph, structured data, fonts
```

---

## Getting Started

```bash
npm install
npm run dev       # starts dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## Adding Real Store Links

Open `src/data/site.ts` and update:

```ts
export const APP_LINKS = {
  playStore: {
    url: 'https://play.google.com/store/apps/details?id=com.prisumart.app',
    comingSoon: false, // flip this to false once the URL is live
  },
  appStore: {
    url: 'https://apps.apple.com/app/prisumart/id0000000000',
    comingSoon: false,
  },
};
```

The `StoreBadge` component automatically switches from a disabled "Coming Soon" button to a real clickable link — no other code changes needed.

To add more cards to the **Other Apps** section, edit `src/data/otherApps.ts`.

---

## Theme System

Dark/light mode uses Tailwind's `class` strategy. The toggle lives in `src/context/ThemeContext.tsx` and persists the user's choice to `localStorage`, falling back to the OS preference (`prefers-color-scheme`) on first visit.

All brand colors are defined as Tailwind tokens in `tailwind.config.js` under `brand` (green), `sun` (orange), `cream`, and `ink` — use these utility classes (`bg-brand-600`, `text-sun-500`, etc.) rather than hardcoding hex values.

---

## SEO

- Full meta tags, Open Graph, and Twitter Card tags in `index.html`
- JSON-LD structured data for `Organization` and `MobileApplication`
- Semantic HTML (`<header>`, `<main>`, `<footer>`, proper heading hierarchy)
- `react-helmet-async` wired up for per-route title changes

Before going live, update `https://www.prisumart.com` references in `index.html` and `src/data/site.ts` to your real domain, and replace `public/og-image.png` with a proper 1200×630 social preview image.

---

## Performance Notes

- Images are served as WebP with PNG fallback via `<picture>`
- Legal pages (`/privacy-policy`, `/terms-and-conditions`) are lazy-loaded via `React.lazy`
- Vendor code is split into separate chunks (`react-vendor`, `motion`, `icons`) for better caching
- `prefers-reduced-motion` is respected globally

Run a Lighthouse audit after deployment (Chrome DevTools → Lighthouse) to verify scores in your hosting environment, since CDN/server config affects the final score.

---

## Deployment Guides

### Deploy to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repository.
3. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Vercel will give you a live URL (`yourproject.vercel.app`).
5. To use your own domain: **Project Settings → Domains → Add** your domain (e.g. `prisumart.com`) and follow the DNS instructions shown (usually an `A` record or `CNAME`).

---

### Deploy to Netlify

1. Push the project to a Git repository.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Connect your Git provider and select the repo.
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.
6. Because this app uses client-side routing (`/privacy-policy`, `/terms-and-conditions`), add a redirect rule so refreshing those routes doesn't 404. Create a file `public/_redirects` with:
   ```
   /*    /index.html   200
   ```
7. For a custom domain: **Site settings → Domain management → Add a domain**, then update your DNS as instructed.

---

### Deploy to Hostinger

Hostinger hosting typically serves static files directly, so you'll upload the built `dist/` folder.

1. Build the project locally:
   ```bash
   npm run build
   ```
2. Log in to **Hostinger hPanel** → go to **File Manager** (or use FTP/SFTP credentials from hPanel → **Files → FTP Accounts**).
3. Navigate to `public_html` (or your domain's root folder).
4. Delete any default placeholder files (like `index.html` from Hostinger's starter page).
5. Upload **everything inside** the `dist/` folder (not the `dist` folder itself) into `public_html`.
6. Since this is a single-page app with client-side routes, add a `.htaccess` file in `public_html` (if it doesn't already exist) with:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
   This ensures `/privacy-policy` and `/terms-and-conditions` load correctly instead of showing a 404.
7. Point your domain to Hostinger (if not already) via **hPanel → Domains**, and your site will be live at your domain.

---

## License

Proprietary — built for PriSuMart. All brand assets (logo, name) belong to PriSuMart.
