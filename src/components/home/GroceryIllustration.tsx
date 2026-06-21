interface GroceryIllustrationProps {
  className?: string;
}

/**
 * Original SVG illustration of a grocery basket with produce, drawn in the
 * brand's green/orange palette. Used as the hero's visual centerpiece in
 * place of stock photography (avoids licensing issues, stays on-brand,
 * and loads instantly as inline SVG).
 */
export function GroceryIllustration({ className = '' }: GroceryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 520 480"
      className={className}
      role="img"
      aria-label="Illustration of a basket filled with fresh vegetables and fruits"
    >
      <defs>
        <linearGradient id="basketGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3FA34D" />
          <stop offset="100%" stopColor="#246E31" />
        </linearGradient>
        <linearGradient id="tomatoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B4A" />
          <stop offset="100%" stopColor="#E8472A" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFC458" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
        <linearGradient id="lemonGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8F26B" />
          <stop offset="100%" stopColor="#C9DB3D" />
        </linearGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="260" cy="430" rx="170" ry="22" fill="#0F3D1F" opacity="0.08" />

      {/* broccoli back left */}
      <g transform="translate(70,150)">
        <circle cx="30" cy="30" r="38" fill="#2E8B3D" />
        <circle cx="0" cy="50" r="30" fill="#246E31" />
        <circle cx="60" cy="55" r="28" fill="#2E8B3D" />
        <rect x="20" y="60" width="20" height="35" rx="6" fill="#8FBF6E" />
      </g>

      {/* lettuce leaf back right */}
      <g transform="translate(360,140)">
        <path d="M0 60 C -10 20, 30 -10, 70 10 C 50 30, 60 60, 30 80 C 15 70, 5 70, 0 60Z" fill="#4FBE61" />
        <path d="M50 70 C 45 30, 80 5, 110 25 C 95 45, 100 70, 75 85 C 65 78, 55 78, 50 70Z" fill="#3FA34D" />
      </g>

      {/* basket */}
      <g transform="translate(110,210)">
        {/* handle */}
        <path
          d="M70 0 C 70 -55 230 -55 230 0"
          fill="none"
          stroke="#1C5526"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* basket body */}
        <path
          d="M10 20 L290 20 L268 190 C266 206 252 218 236 218 L64 218 C48 218 34 206 32 190 Z"
          fill="url(#basketGrad)"
        />
        {/* basket weave lines */}
        {[50, 90, 130, 170, 210, 250].map((x) => (
          <line key={x} x1={x} y1="32" x2={x - 10} y2="206" stroke="#1C5526" strokeWidth="3" opacity="0.35" />
        ))}
        <rect x="6" y="14" width="288" height="18" rx="9" fill="#1C5526" />
      </g>

      {/* tomatoes */}
      <g transform="translate(150,190)">
        <circle cx="0" cy="20" r="26" fill="url(#tomatoGrad)" />
        <circle cx="40" cy="5" r="22" fill="url(#tomatoGrad)" />
        <path d="M-6 -2 L0 -14 L6 -2 Z" fill="#3FA34D" />
        <path d="M34 -14 L40 -26 L46 -14 Z" fill="#3FA34D" />
      </g>

      {/* bell pepper */}
      <g transform="translate(225,175)">
        <path
          d="M20 0 C 0 0 -10 25 -5 45 C 0 65 40 65 45 45 C 50 25 40 0 20 0Z"
          fill="url(#orangeGrad)"
        />
        <rect x="15" y="-10" width="8" height="14" rx="3" fill="#246E31" />
      </g>

      {/* banana bunch */}
      <g transform="translate(60,235)">
        <path
          d="M0 60 C -10 30 10 0 45 -5 C 50 5 45 12 38 15 C 15 22 8 45 18 62 Z"
          fill="#FFD659"
        />
        <path
          d="M20 65 C 8 38 25 6 58 -2 C 62 8 56 15 50 18 C 28 26 22 48 32 65 Z"
          fill="#FAB52E"
        />
      </g>

      {/* lemon */}
      <g transform="translate(280,225)">
        <ellipse cx="0" cy="0" rx="22" ry="19" fill="url(#lemonGrad)" />
      </g>

      {/* cucumber */}
      <g transform="translate(195,250)">
        <rect x="-50" y="-9" width="100" height="18" rx="9" fill="#4FBE61" transform="rotate(-8)" />
      </g>

      {/* milk carton */}
      <g transform="translate(248,150)">
        <path d="M0 50 L0 10 L15 -8 L45 -8 L60 10 L60 50 Z" fill="#FFFFFF" stroke="#E0E8DC" strokeWidth="2" />
        <rect x="0" y="20" width="60" height="14" fill="#2E8B3D" />
        <text x="30" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1C5526" fontFamily="sans-serif">
          MILK
        </text>
      </g>

      {/* floating leaf accents */}
      <g opacity="0.5">
        <path d="M40 80 q20 -20 40 0 q-20 20 -40 0Z" fill="#7DD98E" />
        <path d="M440 90 q20 -18 38 0 q-18 18 -38 0Z" fill="#7DD98E" />
        <path d="M420 320 q18 -16 34 0 q-16 16 -34 0Z" fill="#FFC458" />
      </g>
    </svg>
  );
}
