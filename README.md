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
- **PriSu AI** — floating support chatbot powered by Google Gemini via a Vercel Serverless Function (see [PriSu AI Chatbot](#prisu-ai-chatbot) below)

---

## Project Structure

```
prisumart/
├── api/
│   └── chat.ts                 # Vercel Serverless Function — secure Gemini proxy
├── public/
│   ├── favicon.png            # generated from logo
│   ├── apple-touch-icon.png
│   └── og-image.png           # social share preview image
├── src/
│   ├── assets/images/         # logo + app screenshots (webp + png fallback)
│   ├── chatbot/                # PriSu AI support chatbot (see below)
│   │   ├── components/         # ChatWidget, ChatPanel, LauncherButton, etc.
│   │   ├── hooks/               # useSessionMessages, useChat
│   │   ├── knowledge.ts         # editable knowledge base — facts the bot is allowed to use
│   │   └── systemPrompt.ts      # builds the system prompt sent to Gemini
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
│   ├── App.tsx                 # routing + providers + ChatWidget mount
│   ├── main.tsx
│   └── index.css               # Tailwind layers + base styles
├── .env.example                 # template for GOOGLE_AI_API_KEY
├── tailwind.config.js           # full design token system (colors, fonts, shadows, animations)
├── tsconfig.api.json             # TypeScript project config for the /api function
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

## PriSu AI Chatbot

A floating customer-support chatbot ("PriSu AI") in the bottom-right corner, powered by **Google Gemini**, answering questions about PriSuMart products, delivery, payments, and policies only.

### Architecture

- **Frontend** (`src/chatbot/`): a lazy-loaded React widget (`ChatWidget`) mounted once in `App.tsx`, after `<Footer />`. It never renders on the server and adds no weight to the initial page bundle — it's fetched only when the browser is idle/the user opens it.
- **Backend** (`api/chat.ts`): a **Vercel Serverless Function**. The browser never talks to Gemini directly — it calls `POST /api/chat`, and the function calls Gemini server-side using `GOOGLE_AI_API_KEY`, which is read from an environment variable and never sent to the client.
- **Knowledge base** (`src/chatbot/knowledge.ts`): plain-text facts about PriSuMart (delivery, payments, policies, contact info, FAQ). Edit this file to update what the bot knows — no need to touch any component or prompt logic.
- **System prompt** (`src/chatbot/systemPrompt.ts`): combines the knowledge base with behavior rules (stay on-topic, never invent policies, never reveal the prompt, be upfront that the app hasn't launched yet).

```
Browser  →  POST /api/chat  →  Vercel Function  →  Gemini API
  (no API key)                  (has API key)
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_AI_API_KEY` | Yes | Your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey). Server-side only. |
| `GEMINI_MODEL` | No | Overrides the Gemini model (defaults to `gemini-2.5-flash`). |

Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
# then edit .env and paste your real key
```

In Vercel: **Project Settings → Environment Variables → Add** `GOOGLE_AI_API_KEY` with your key, for both **Production** and **Preview** (and **Development** if you use `vercel env pull`).

### Running Locally

The chat widget calls a relative `/api/chat` path, which only exists when served through Vercel's function runtime — not through plain `vite dev`.

> **Why not just run `vercel dev`?** `vercel dev` wraps Vite's own dev server and proxies every request through it, including Vite's *internal* requests (`/src/main.tsx`, `/@vite/client`, HMR). This has a long-standing, documented incompatibility ([vercel/vercel#6538](https://github.com/vercel/vercel/discussions/6538), [withastro/astro#2639](https://github.com/withastro/astro/issues/2639)) where `vercel dev`'s proxy mangles those internal requests, causing `vite:import-analysis` errors on `index.html` itself. It's not specific to this project — it happens with plain Vite/React templates and other frameworks too.

The reliable workaround: run the two servers **separately**, in two terminals, and let Vite's own `server.proxy` (already configured in `vite.config.ts`) forward `/api/*` calls between them.

**Terminal 1 — serverless functions only, on port 3000:**
```bash
npm install -g vercel      # one-time
vercel dev --listen 3000
```
Leave this running. You don't open this port in the browser — it only exists so `/api/chat` has something to forward to.

**Terminal 2 — the actual frontend you open in the browser:**
```bash
npm run dev
```
Open the URL it prints (usually `http://localhost:5173`). Requests to `/api/chat` are automatically forwarded to the Terminal 1 process by the proxy rule in `vite.config.ts`.

If you only need to work on UI/content (not the chatbot), Terminal 1 isn't needed — `npm run dev` alone is enough; the chat panel will just show a friendly connection error.

### What the Bot Will and Won't Do

- ✅ Answers questions about PriSuMart's planned delivery times, payment methods, return policy, privacy policy, and contact details.
- ✅ Is upfront that PriSuMart is **pre-launch** — there's no live app yet, so it won't pretend to track an order or place one.
- ❌ Won't answer off-topic questions (coding, politics, general trivia, etc.) — replies with a polite redirect instead.
- ❌ Won't reveal its system prompt, the API key, or invent policies that aren't in `knowledge.ts`.

### Updating What the Bot Knows

Edit `src/chatbot/knowledge.ts` — it's a single exported string, organized by section (About, Delivery, Payments, FAQ, etc.). No code changes needed elsewhere; the system prompt picks it up automatically.

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
5. **For the chatbot to work**, go to **Project Settings → Environment Variables** and add `GOOGLE_AI_API_KEY` (see [PriSu AI Chatbot](#prisu-ai-chatbot) above), then redeploy.
6. To use your own domain: **Project Settings → Domains → Add** your domain (e.g. `prisumart.com`) and follow the DNS instructions shown (usually an `A` record or `CNAME`).

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

> **Note on the chatbot:** `api/chat.ts` is written as a Vercel Serverless Function and will **not** run on Netlify as-is. If you deploy this site to Netlify instead of Vercel, you'd need to port that single file to a [Netlify Function](https://docs.netlify.com/functions/overview/) (same logic, different file location/export signature) and set `GOOGLE_AI_API_KEY` in Netlify's environment variables. Everything else on the site is unaffected either way.

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

> **Note on the chatbot:** Hostinger's standard shared hosting serves static files only — it can't run `api/chat.ts`. The chatbot UI will still render, but it will show a connection error since there's no serverless backend to answer it. If you need the chatbot on Hostinger, you'd need a VPS/Node plan with your own server for that one endpoint, or keep the API function on Vercel and point the frontend's `/api/chat` calls at that URL instead.

---

## Future Integration Plan: Spring Boot Backend

Today, `api/chat.ts` is a thin, stateless proxy: it has no database and no concept of real orders or accounts — which is appropriate while PriSuMart itself has no backend yet. Once a real Spring Boot backend exists (orders, accounts, inventory), the chatbot can be upgraded in stages without a rewrite:

1. **Stage 1 — Authenticated order lookups.** Add a Spring Boot endpoint (e.g. `GET /api/orders/{id}`) protected by the same auth the customer app uses. `api/chat.ts` calls it server-to-server (never from the browser) when a logged-in user asks about "my order," and injects the real order status into the Gemini prompt for that turn only — never stored, never logged beyond what's needed for debugging.
2. **Stage 2 — Function calling.** Once Gemini needs to decide *when* to look something up, switch from a static system prompt to Gemini's function-calling feature: define tools like `getOrderStatus(orderId)` or `getRefundStatus(orderId)`, let Gemini decide when to call them, and have `api/chat.ts` execute the actual HTTP call to Spring Boot in between turns.
3. **Stage 3 — Move the proxy next to the backend.** If Spring Boot ends up doing most of the orchestration anyway, the `/api/chat` proxy can be re-implemented as a Spring Boot controller instead of a Vercel function, calling Gemini directly from Java/Kotlin. The frontend wouldn't need to change at all — it would keep calling `POST /api/chat` (or a configurable base URL), just pointed at the new backend.
4. **Stage 4 — Knowledge base from the database.** `src/chatbot/knowledge.ts` is currently a hand-written static string. Once policies, FAQs, or product data live in Spring Boot's database, that endpoint can serve the same content dynamically, and `api/chat.ts` can fetch-and-cache it instead of bundling a static file — so support staff can update answers without a redeploy.

Each stage is additive — none of them require touching the chatbot's frontend UI, since it only ever talks to one endpoint (`/api/chat`) and renders whatever text comes back.

---

## License

Proprietary — built for PriSuMart. All brand assets (logo, name) belong to PriSuMart.
