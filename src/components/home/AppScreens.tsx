import { Logo } from '../shared/Logo';

/**
 * Two abstracted, dark-native "screens" standing in for app screenshots.
 * The real uploaded screenshots are bright, dense quick-commerce UI —
 * exactly the visual language this redesign moves away from. These are
 * built as actual markup (not images) so they inherit the site's glass/
 * gradient system natively and stay crisp at any size.
 */

export function AppScreenSplash() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-grad-dark px-6 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sun-500/10 blur-3xl" />
      <div className="relative scale-90">
        <Logo size="md" variant="light" />
      </div>
      <p className="relative text-cream-50/40 text-[11px] mt-6 tracking-wide">Fresh Items, Happy Homes</p>
      <div className="absolute bottom-10 h-1 w-24 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-2/3 bg-grad-brand rounded-full" />
      </div>
    </div>
  );
}

export function AppScreenHome() {
  return (
    <div className="h-full w-full bg-grad-dark px-4 py-6 flex flex-col gap-4 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-cream-50/40">Delivering to</span>
          <span className="text-[11px] text-cream-50 font-semibold">Jhajha</span>
        </div>
        <div className="h-7 w-7 rounded-full bg-grad-brand" />
      </div>

      {/* Search bar */}
      <div className="h-8 rounded-full glass flex items-center px-3">
        <span className="text-[10px] text-cream-50/35">Search groceries…</span>
      </div>

      {/* Hero banner */}
      <div className="rounded-xl glass-strong p-3 flex flex-col gap-1">
        <span className="text-[10px] text-sun-300 font-semibold">100% Fresh</span>
        <span className="text-[12px] text-cream-50 font-bold leading-snug">Delivered in 30–40 min</span>
        <div className="h-1.5 w-12 rounded-full bg-grad-brand mt-1" />
      </div>

      {/* Category chips */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 aspect-square rounded-lg glass flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-brand-400/40" />
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg glass p-2 flex flex-col gap-1.5">
            <div className="h-10 w-full rounded-md bg-white/5" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="h-1.5 w-1/2 rounded-full bg-brand-400/30" />
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around pt-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-brand-400' : 'bg-white/15'}`} />
        ))}
      </div>
    </div>
  );
}
