import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LauncherButton } from './LauncherButton';
import { ChatPanel } from './ChatPanel';

const PANEL_ID = 'prisu-ai-panel';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel panelId={PANEL_ID} onClose={() => setIsOpen(false)} />}</AnimatePresence>
      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 sm:right-6 z-[90]">
        <LauncherButton isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
      </div>
    </>
  );
}

export default ChatWidget;
