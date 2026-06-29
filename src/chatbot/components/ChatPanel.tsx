import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePaperAirplane, HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2';
import { LuBot } from 'react-icons/lu';
import logoIconWebp from '../../assets/images/logo-icon.webp';
import logoIconPng from '../../assets/images/logo-icon.png';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedQuestions } from './SuggestedQuestions';
import { useSessionMessages } from '../hooks/useSessionMessages';
import { useChat } from '../hooks/useChat';

interface ChatPanelProps {
  onClose: () => void;
  panelId: string;
}

export function ChatPanel({ onClose, panelId }: ChatPanelProps) {
  const { messages, setMessages, clearMessages } = useSessionMessages();
  const { sendMessage, regenerate, isSending } = useChat({ messages, setMessages });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [viewportStyle, setViewportStyle] = useState<React.CSSProperties>({});

  // Detect mobile width dynamically (< 768px matches Tailwind's md breakpoint)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Sync visual viewport on mobile to handle dynamic keyboards without pushing elements offscreen
  useEffect(() => {
    if (!isMobile) {
      setViewportStyle({});
      return;
    }

    const updateViewport = () => {
      const vv = window.visualViewport;
      if (vv) {
        setViewportStyle({
          height: `${vv.height}px`,
          top: `${vv.offsetTop}px`,
        });
      } else {
        setViewportStyle({
          height: '100dvh',
          top: '0px',
        });
      }
    };

    updateViewport();
    window.visualViewport?.addEventListener('resize', updateViewport);
    window.visualViewport?.addEventListener('scroll', updateViewport);

    return () => {
      window.visualViewport?.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('scroll', updateViewport);
    };
  }, [isMobile]);

  // Lock document body scroll on mobile while the chat is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleScrollLock = (isMobileView: boolean) => {
      if (isMobileView) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };

    handleScrollLock(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      handleScrollLock(e.matches);
    };
    mediaQuery.addEventListener('change', listener);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // Auto-scroll on new messages or typing indicator activity
  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isSending]);

  // Automatically scroll down when the virtual keyboard opens or closes
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        scrollToBottom('auto');
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [viewportStyle.height, isMobile]);

  // Focus the input when the panel mounts (Desktop only); close on Escape
  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isMobile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    void sendMessage(text);
  };

  const handleSuggested = (question: string) => {
    void sendMessage(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const lastModelIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'model') return i;
    }
    return -1;
  })();

  // Use clean dynamic classes separating desktop design and mobile layout safely
  const panelClass = isMobile
    ? "fixed left-0 right-0 z-[100] w-full flex flex-col rounded-none overflow-hidden bg-white dark:bg-ink-900 border-none shadow-none transition-colors duration-300"
    : "fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-3 left-3 sm:left-auto sm:right-6 z-[90] w-auto sm:w-[380px] lg:w-[400px] h-[min(640px,75dvh)] max-h-[calc(100dvh-7rem-env(safe-area-inset-bottom))] flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-ink-900 shadow-2xl border border-ink-900/5 dark:border-white/10 transition-colors duration-300";

  return (
    <motion.div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-label="PriSu AI customer support chat"
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
      animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={isMobile ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={panelClass}
      style={isMobile ? viewportStyle : undefined}
    >
      {/* Header with mobile safe area top padding */}
      <div className="flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-2 lg:gap-3 px-3 xs:px-3.5 sm:px-3.5 lg:px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 md:py-3.5 bg-grad-brand shrink-0">
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2 lg:gap-2.5 min-w-0">
          {/* Logo in white circular container */}
          <div className="flex items-center justify-center h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-full bg-white shrink-0 p-[4px] xs:p-[5px] sm:p-[6px]">
            <picture>
              <source srcSet={logoIconWebp} type="image/webp" />
              <img
                src={logoIconPng}
                alt="PriSuMart"
                width={80}
                height={80}
                className="h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>

          {/* Divider */}
          <div className="hidden xs:block w-px h-6 sm:h-7 bg-white/30 shrink-0" aria-hidden="true" />

          {/* AI bot badge */}
          <div className="hidden xs:flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/15 shrink-0">
            <LuBot className="text-lg sm:text-xl text-white" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center gap-[3px] min-w-0">
            <span className="font-display font-bold text-white text-[13px] xs:text-sm sm:text-[15px] leading-tight truncate">
              PriSu AI
            </span>
            <span className="text-[10.5px] xs:text-[11px] sm:text-[11px] lg:text-[11.5px] text-white/75 leading-tight truncate">
              PriSuMart customer support
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={clearMessages}
            disabled={messages.length === 0}
            aria-label="Clear chat"
            title="Clear chat"
            className="flex items-center justify-center h-8 w-8 xs:h-9 xs:w-9 rounded-full text-white/85 hover:bg-white/15 active:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineTrash className="text-base xs:text-lg" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex items-center justify-center h-8 w-8 xs:h-9 xs:w-9 rounded-full text-white/85 hover:bg-white/15 active:bg-white/20 transition-colors"
          >
            <HiOutlineXMark className="text-lg xs:text-xl" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain px-3.5 sm:px-4 py-4 flex flex-col gap-4 bg-cream-50 dark:bg-ink-950 transition-colors duration-300"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="flex flex-col items-start gap-1">
          <div className="max-w-[88%] sm:max-w-[85%] px-4 py-2.5 text-[14px] sm:text-[15px] rounded-2xl rounded-bl-md bg-brand-50 dark:bg-white/10 text-ink-900 dark:text-cream-50">
            <p className="leading-relaxed">
              Hi! I&apos;m <strong>PriSu AI</strong> 👋 — ask me about PriSuMart&apos;s products, delivery, payments,
              or policies.
            </p>
          </div>
        </div>

        {messages.length === 0 && <SuggestedQuestions onSelect={handleSuggested} disabled={isSending} />}

        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLastModelMessage={message.role === 'model' && index === lastModelIndex}
            onRegenerate={() => void regenerate()}
            regenerateDisabled={isSending}
          />
        ))}

        {isSending && <TypingIndicator />}
      </div>

      {/* Input Form with safe area bottom padding */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-[5px] sm:gap-2 p-[9px] max-[330px]:p-2 sm:p-2.5 lg:p-3 pb-[calc(0.5625rem+env(safe-area-inset-bottom))] sm:pb-2.5 lg:pb-3 border-t border-ink-900/5 dark:border-white/10 shrink-0 bg-white dark:bg-ink-900 transition-colors duration-300"
      >
        <label htmlFor="prisu-ai-input" className="sr-only">
          Message PriSu AI
        </label>
        <textarea
          id="prisu-ai-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about delivery, payments, returns…"
          rows={1}
          style={input ? undefined : { whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          className="flex-1 min-w-0 resize-none max-h-28 px-2.5 max-[330px]:px-[7px] sm:px-3.5 lg:px-4 py-2.5 text-[11.5px] min-[360px]:text-[12.5px] xs:text-[13.5px] sm:text-[14.5px] lg:text-[15px] rounded-xl sm:rounded-2xl bg-cream-50 dark:bg-white/5 text-ink-900 dark:text-cream-50 placeholder:text-ink-900/40 dark:placeholder:text-cream-50/35 overflow-x-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label="Send message"
          className="flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-grad-brand text-white shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:brightness-95 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <HiOutlinePaperAirplane className="text-lg" />
        </button>
      </form>
    </motion.div>
  );
}