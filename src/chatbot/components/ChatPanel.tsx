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

  // Auto-scroll to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  // Focus the input when the panel mounts; close on Escape.
  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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

  return (
    <motion.div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-label="PriSu AI customer support chat"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-3 left-3 sm:left-auto sm:right-6 z-[90] w-auto sm:w-[380px] h-[min(640px,75dvh)] flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-ink-900 shadow-2xl border border-ink-900/5 dark:border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-grad-brand shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <picture>
            <source srcSet={logoIconWebp} type="image/webp" />
            <img
              src={logoIconPng}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover shrink-0 bg-white/15"
              loading="eager"
              decoding="async"
            />
          </picture>

          <div className="w-px h-7 bg-white/25 shrink-0" aria-hidden="true" />

          <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <LuBot className="text-xl text-white" aria-hidden="true" />
          </div>

          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-display font-bold text-white text-sm truncate">PriSu AI</span>
            <span className="text-[11px] text-white/75 truncate">PriSuMart customer support</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={clearMessages}
            disabled={messages.length === 0}
            aria-label="Clear chat"
            title="Clear chat"
            className="flex items-center justify-center h-9 w-9 rounded-full text-white/85 hover:bg-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineTrash className="text-lg" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex items-center justify-center h-9 w-9 rounded-full text-white/85 hover:bg-white/15 transition-colors"
          >
            <HiOutlineXMark className="text-xl" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-cream-50 dark:bg-ink-950"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="flex flex-col items-start gap-1">
          <div className="max-w-[85%] px-4 py-2.5 text-[14px] sm:text-[15px] rounded-2xl rounded-bl-md bg-brand-50 dark:bg-white/8 text-ink-900 dark:text-cream-50">
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

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 p-3 border-t border-ink-900/5 dark:border-white/10 shrink-0"
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
          className="flex-1 resize-none max-h-28 px-4 py-2.5 text-[14px] rounded-2xl bg-cream-50 dark:bg-white/5 text-ink-900 dark:text-cream-50 placeholder:text-ink-900/40 dark:placeholder:text-cream-50/35 outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label="Send message"
          className="flex items-center justify-center h-11 w-11 rounded-full bg-grad-brand text-white shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:brightness-95 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <HiOutlinePaperAirplane className="text-lg" />
        </button>
      </form>
    </motion.div>
  );
}
