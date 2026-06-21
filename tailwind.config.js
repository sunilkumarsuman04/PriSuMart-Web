/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#EEFBF0',
          100: '#D6F4DB',
          200: '#ACE8B7',
          300: '#7DD98E',
          400: '#4FBE61',
          500: '#3FA34D',
          600: '#2E8B3D',
          700: '#246E31',
          800: '#1C5526',
          900: '#0F3D1F',
          950: '#0A2814',
        },
        sun: {
          50: '#FFF8EB',
          100: '#FFEDC7',
          200: '#FFDA8F',
          300: '#FFC458',
          400: '#FAB52E',
          500: '#F5A623',
          600: '#E8890B',
          700: '#C16C09',
          800: '#99540F',
          900: '#7C460F',
        },
        cream: {
          50: '#F7FAF5',
          100: '#EFF6EC',
        },
        ink: {
          800: '#1C2A20',
          900: '#15231A',
          950: '#0E1712',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        xl2: '1.25rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(15, 61, 31, 0.08)',
        card: '0 4px 24px -4px rgba(15, 61, 31, 0.12)',
        lift: '0 12px 32px -8px rgba(15, 61, 31, 0.22)',
        'glow-orange': '0 8px 28px -6px rgba(245, 166, 35, 0.45)',
        'glow-green': '0 8px 28px -6px rgba(46, 139, 61, 0.35)',
      },
      backgroundImage: {
        'grad-hero': 'linear-gradient(135deg, #EEFBF0 0%, #F7FAF5 45%, #FFF8EB 100%)',
        'grad-brand': 'linear-gradient(135deg, #2E8B3D 0%, #3FA34D 100%)',
        'grad-sun': 'linear-gradient(135deg, #F5A623 0%, #E8890B 100%)',
        'grad-dark': 'linear-gradient(135deg, #0E1712 0%, #15231A 60%, #1C2A20 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 18s linear infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(245, 166, 35, 0.5)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(245, 166, 35, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(245, 166, 35, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },
      screens: {
        xs: '425px',
      },
    },
  },
  plugins: [],
}
