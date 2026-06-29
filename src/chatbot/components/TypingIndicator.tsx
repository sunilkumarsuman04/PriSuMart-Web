import logoIconWebp from '../../assets/images/logo-icon.webp';
import logoIconPng from '../../assets/images/logo-icon.png';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2" role="status" aria-label="PriSu AI is typing">
      <picture>
        <source srcSet={logoIconWebp} type="image/webp" />
        <img
          src={logoIconPng}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain opacity-90 animate-pulse"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-brand-50 dark:bg-white/10 w-fit">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-300 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
