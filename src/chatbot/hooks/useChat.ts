import { useCallback, useRef, useState } from 'react';
import type { ChatMessage } from './useSessionMessages';

const FRIENDLY_NETWORK_ERROR =
  "I couldn't reach PriSuMart support right now. Please check your connection and try again.";

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface UseChatOptions {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export function useChat({ messages, setMessages }: UseChatOptions) {
  const [isSending, setIsSending] = useState(false);
  // Tracks the user message text that produced the most recent model reply,
  // so "Regenerate" can resend it without the caller needing to pass it back in.
  const lastUserTextRef = useRef<string | null>(null);

  const callApi = useCallback(async (history: ChatMessage[]): Promise<string> => {
    const payloadMessages = history.map((m) => ({ role: m.role, text: m.text }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: payloadMessages }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = (data && typeof data.error === 'string' && data.error) || FRIENDLY_NETWORK_ERROR;
      throw new Error(message);
    }

    if (!data || typeof data.reply !== 'string' || !data.reply.trim()) {
      throw new Error(FRIENDLY_NETWORK_ERROR);
    }

    return data.reply;
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMessage: ChatMessage = { id: makeId(), role: 'user', text: trimmed };
      lastUserTextRef.current = trimmed;

      const nextHistory = [...messages, userMessage];
      setMessages(nextHistory);
      setIsSending(true);

      try {
        const reply = await callApi(nextHistory);
        setMessages((prev) => [...prev, { id: makeId(), role: 'model', text: reply }]);
      } catch (err) {
        const text = err instanceof Error ? err.message : FRIENDLY_NETWORK_ERROR;
        setMessages((prev) => [...prev, { id: makeId(), role: 'model', text, error: true }]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending, callApi, setMessages]
  );

  const regenerate = useCallback(async () => {
    if (isSending) return;

    // Drop the last model message (success or error) and resend the history up to
    // and including the last user message.
    let trimmedHistory = messages;
    if (trimmedHistory.length > 0 && trimmedHistory[trimmedHistory.length - 1].role === 'model') {
      trimmedHistory = trimmedHistory.slice(0, -1);
    }

    if (trimmedHistory.length === 0) return;

    setMessages(trimmedHistory);
    setIsSending(true);

    try {
      const reply = await callApi(trimmedHistory);
      setMessages((prev) => [...prev, { id: makeId(), role: 'model', text: reply }]);
    } catch (err) {
      const text = err instanceof Error ? err.message : FRIENDLY_NETWORK_ERROR;
      setMessages((prev) => [...prev, { id: makeId(), role: 'model', text, error: true }]);
    } finally {
      setIsSending(false);
    }
  }, [messages, isSending, callApi, setMessages]);

  return { sendMessage, regenerate, isSending };
}
