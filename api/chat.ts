import type { IncomingMessage, ServerResponse } from 'http';
import { buildSystemPrompt } from '../src/chatbot/systemPrompt.js';

/**
 * Minimal local types matching the shape Vercel's Node.js runtime adds on top
 * of the standard Node request/response objects (request.body/query/cookies,
 * response.status().json()). Defined locally instead of depending on
 * `@vercel/node` purely for types — that package pulls in a large build
 * toolchain (esbuild, ts-morph, etc.) that isn't needed here and carries its
 * own transitive dependency churn. See: https://vercel.com/docs/functions/runtimes/node-js
 */
type VercelRequest = IncomingMessage & {
  body?: unknown;
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  send: (body: unknown) => VercelResponse;
};

/**
 * POST /api/chat
 *
 * Secure proxy between the PriSu AI chat widget (browser) and the Gemini API.
 * The Gemini API key NEVER reaches the browser — it is read from the
 * GOOGLE_AI_API_KEY environment variable on the server only.
 *
 * Request body:  { messages: { role: 'user' | 'model'; text: string }[] }
 * Response body: { reply: string } | { error: string }
 */

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_MESSAGES = 30; // cap conversation history sent per request
const MAX_MESSAGE_LENGTH = 4000; // characters, generous but bounded
const REQUEST_TIMEOUT_MS = 20_000;

const FRIENDLY_FALLBACK =
  "Sorry, I'm having trouble responding right now. Please try again in a moment, or reach PriSuMart support directly.";

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (v.role === 'user' || v.role === 'model') && typeof v.text === 'string';
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  if (input.length === 0 || input.length > MAX_MESSAGES) return null;

  const cleaned: ChatMessage[] = [];
  for (const item of input) {
    if (!isChatMessage(item)) return null;
    const text = item.text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text) return null;
    cleaned.push({ role: item.role, text });
  }
  return cleaned;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS / method guard — same-origin app, but keep this tight regardless.
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] Missing GOOGLE_AI_API_KEY environment variable.');
    return res.status(500).json({ error: FRIENDLY_FALLBACK });
  }

  const body = req.body as { messages?: unknown } | undefined;
  const messages = sanitizeMessages(body?.messages);
  if (!messages) {
    return res.status(400).json({ error: 'Invalid request. Please try sending your message again.' });
  }

  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (geminiResponse.status === 401 || geminiResponse.status === 403) {
      const body = await geminiResponse.text().catch(() => '');
      console.error('[api/chat] Gemini auth error:', geminiResponse.status, body);
      return res.status(502).json({ error: FRIENDLY_FALLBACK });
    }

    if (geminiResponse.status === 429) {
      const body = await geminiResponse.text().catch(() => '');
      console.error('[api/chat] Gemini rate limited:', body);
      return res.status(429).json({
        error: "I'm getting a lot of questions right now — please try again in a few seconds.",
      });
    }

    if (!geminiResponse.ok) {
      const body = await geminiResponse.text().catch(() => '');
      console.error('[api/chat] Gemini error:', geminiResponse.status, body);
      return res.status(502).json({ error: FRIENDLY_FALLBACK });
    }

    const data = (await geminiResponse.json()) as GeminiResponse;
    const candidate = data?.candidates?.[0];
    const finishReason = candidate?.finishReason;

    if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
      return res.status(200).json({
        reply:
          "I can't help with that request. I'm PriSu AI and I can only help with PriSuMart products, deliveries, payments, and customer support.",
      });
    }

    const text: string | undefined = candidate?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? '')
      .join('')
      .trim();

    if (!text) {
      console.error('[api/chat] Empty response from Gemini:', JSON.stringify(data).slice(0, 1000));
      return res.status(200).json({ reply: FRIENDLY_FALLBACK });
    }

    return res.status(200).json({ reply: text });
  } catch (err) {
    clearTimeout(timeout);

    if (controller.signal.aborted) {
      console.error('[api/chat] Gemini request timed out.');
      return res.status(504).json({
        error: "That took too long to answer. Please try again.",
      });
    }

    console.error('[api/chat] Unexpected error calling Gemini:', err);
    return res.status(500).json({ error: FRIENDLY_FALLBACK });
  }
}
