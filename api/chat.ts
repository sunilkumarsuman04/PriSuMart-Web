import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildSystemPrompt } from "../src/chatbot/systemPrompt.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 4000;
const REQUEST_TIMEOUT_MS = 20000;

const FRIENDLY_FALLBACK =
  "Sorry, I couldn't reach PriSuMart support right now. Please try again in a moment.";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  if (input.length === 0 || input.length > MAX_MESSAGES) return null;

  const cleaned: ChatMessage[] = [];

  for (const item of input) {
    if (
      !item ||
      typeof item !== "object" ||
      !("role" in item) ||
      !("text" in item)
    ) {
      return null;
    }

    const msg = item as ChatMessage;

    if (
      (msg.role !== "user" && msg.role !== "model") ||
      typeof msg.text !== "string"
    ) {
      return null;
    }

    cleaned.push({
      role: msg.role,
      text: msg.text.trim().slice(0, MAX_MESSAGE_LENGTH),
    });
  }

  return cleaned;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("=== PriSu AI Request Started ===");

  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;

  console.log("API Key Exists:", !!apiKey);

  if (!apiKey) {
    return res.status(500).json({
      error: "GOOGLE_AI_API_KEY is missing.",
    });
  }

  const messages = sanitizeMessages(req.body?.messages);

  if (!messages) {
    return res.status(400).json({
      error: "Invalid request body.",
    });
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    console.log("Calling Gemini...");

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: buildSystemPrompt(),
            },
          ],
        },
        contents: messages.map((m) => ({
          role: m.role,
          parts: [
            {
              text: m.text,
            },
          ],
        })),
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        },
      }),
    });

    clearTimeout(timeout);

    console.log("Gemini Status:", response.status);

    if (!response.ok) {
      const text = await response.text();

      console.error(text);

      return res.status(response.status).json({
        error: FRIENDLY_FALLBACK,
      });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text ?? "")
        .join("")
        .trim() || FRIENDLY_FALLBACK;

    console.log("Reply Generated");

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    clearTimeout(timeout);

    console.error("Gemini Error:", err);

    return res.status(500).json({
      error: FRIENDLY_FALLBACK,
    });
  }
}