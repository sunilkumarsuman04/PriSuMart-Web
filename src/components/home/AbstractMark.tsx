interface AbstractMarkProps {
  className?: string;
}

/**
 * Abstract geometric visual for the hero panel — deliberately not a
 * literal product illustration. Premium AI-startup sites (Linear,
 * Raycast, Arc) favor abstract gradient/UI fragments over literal
 * imagery; this keeps the brand's green/orange palette and the logo's
 * bag-and-leaf motif distilled into simple overlapping forms instead
 * of a cartoon basket of vegetables.
 */
export function AbstractMark({ className = '' }: AbstractMarkProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Abstract PriSuMart brand mark — overlapping gradient forms"
    >
      <defs>
        <linearGradient id="markGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7DD98E" />
          <stop offset="100%" stopColor="#2E8B3D" />
        </linearGradient>
        <linearGradient id="markOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFC458" />
          <stop offset="100%" stopColor="#E8890B" />
        </linearGradient>
        <radialGradient id="markGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FBE61" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4FBE61" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="200" cy="200" r="180" fill="url(#markGlow)" opacity="0.4" />

      {/* large rotated square — references the logo's bag silhouette, abstracted */}
      <rect x="110" y="110" width="180" height="180" rx="36" fill="url(#markGreen)" opacity="0.9" transform="rotate(-8 200 200)" />

      {/* overlapping circle — the orange accent, echoing the logo's "S" */}
      <circle cx="255" cy="160" r="70" fill="url(#markOrange)" opacity="0.85" />

      {/* thin ring outline — echoes the logo's circular badge */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="#7DD98E" strokeWidth="2" opacity="0.3" />

      {/* small leaf-like accent shape, distilled to a simple curve */}
      <path
        d="M280 280 Q320 260 330 300 Q300 320 280 280Z"
        fill="#7DD98E"
        opacity="0.7"
      />
    </svg>
  );
}
