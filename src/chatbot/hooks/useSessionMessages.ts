import { useEffect, useState } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  /** Present only on the latest model message; lets "Regenerate" find the prior user turn. */
  error?: boolean;
}

const STORAGE_KEY = 'prisumart-chat-session';

function readStoredMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Chat history scoped to the browser session (sessionStorage), per the
 * "session memory (browser only)" requirement. Clears automatically when
 * the tab is closed — never sent anywhere except back to /api/chat as
 * conversation context, and never persisted server-side.
 */
export function useSessionMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => readStoredMessages());

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage can fail (private browsing, quota). Non-fatal — chat still works in-memory.
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { messages, setMessages, clearMessages };
}
