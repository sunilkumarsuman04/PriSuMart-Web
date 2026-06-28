import { useState } from 'react';
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineArrowPath } from 'react-icons/hi2';
import { MarkdownMessage } from './MarkdownMessage';
import type { ChatMessage } from '../hooks/useSessionMessages';

interface MessageBubbleProps {
  message: ChatMessage;
  isLastModelMessage: boolean;
  onRegenerate: () => void;
  regenerateDisabled: boolean;
}

export function MessageBubble({ message, isLastModelMessage, onRegenerate, regenerateDisabled }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — silently ignore, not critical.
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-[14px] sm:text-[15px] ${
          isUser
            ? 'bg-grad-brand text-white rounded-2xl rounded-br-md'
            : message.error
              ? 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 rounded-2xl rounded-bl-md'
              : 'bg-brand-50 dark:bg-white/8 text-ink-900 dark:text-cream-50 rounded-2xl rounded-bl-md'
        }`}
      >
        {isUser ? (
          <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        ) : (
          <MarkdownMessage content={message.text} />
        )}
      </div>

      {!isUser && (
        <div className="flex items-center gap-1 px-1">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy message"
            className="flex items-center justify-center h-8 w-8 rounded-full text-ink-800/50 dark:text-cream-50/50 hover:bg-ink-900/5 dark:hover:bg-white/10 hover:text-ink-800 dark:hover:text-cream-50 transition-colors"
          >
            {copied ? <HiOutlineCheck className="text-base text-brand-600" /> : <HiOutlineClipboard className="text-base" />}
          </button>

          {isLastModelMessage && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={regenerateDisabled}
              aria-label="Regenerate response"
              className="flex items-center justify-center h-8 w-8 rounded-full text-ink-800/50 dark:text-cream-50/50 hover:bg-ink-900/5 dark:hover:bg-white/10 hover:text-ink-800 dark:hover:text-cream-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <HiOutlineArrowPath className="text-base" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
