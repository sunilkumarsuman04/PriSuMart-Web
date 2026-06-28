import { motion } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';

interface LauncherButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function LauncherButton({ isOpen, onToggle }: LauncherButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? 'Close PriSu AI chat' : 'Open PriSu AI chat'}
      aria-expanded={isOpen}
      aria-controls="prisu-ai-panel"
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-grad-brand text-white shadow-glow-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      {!isOpen && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-pulse-ring"
        />
      )}
      <motion.span
        key={isOpen ? 'close' : 'chat'}
        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="text-2xl sm:text-[28px]"
      >
        {isOpen ? <HiXMark /> : <HiOutlineChatBubbleLeftRight />}
      </motion.span>
    </motion.button>
  );
}
