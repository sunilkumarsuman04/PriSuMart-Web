import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative flex items-center justify-center h-10 w-10 rounded-full text-ink-800 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
    >
      {theme === 'light' ? <HiOutlineMoon className="text-xl" /> : <HiOutlineSun className="text-xl" />}
    </button>
  );
}
