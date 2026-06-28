import { buildSystemPrompt } from "../src/chatbot/systemPrompt.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 4000;
const REQUEST_TIMEOUT_MS = 20000;

const FRIENDLY_FALLBACK =
  "Sorry, I'm having trouble responding right now. Please try again in a moment.";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;

  return (
    (v.role === "user" || v.role === "model") &&
    typeof v.text === "string"
  );
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  if (input.length === 0 || input.length > MAX_MESSAGES) return null;

  const cleaned: ChatMessage[] = [];

  for (const item of input) {
    if (!isChatMessage(item)) return null;

    const text = item.text.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!text) return null;

    cleaned.push({
      role: item.role,
      text,
    });
  }

  return cleaned;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed." },
      {
        status: 405,
        headers: {
          Allow: "POST",
        },
      }
    );
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    console.error("Missing GOOGLE_AI_API_KEY");
    return Response.json(
      {
        error: FRIENDLY_FALLBACK,
      },
      {
        status: 500,
      }
    );
  }

  let body: { messages?: unknown };

  try {
    body = await req.json();
  } catch {
    return Response.json(
      {
        error: "Invalid JSON.",
      },
      {
        status: 400,
      }
    );
  }

  const messages = sanitizeMessages(body.messages);

  if (!messages) {
    return Response.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: controller.signal,
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

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();

      console.error(errorText);

      return Response.json(
        {
          error: FRIENDLY_FALLBACK,
        },
        {
          status: geminiResponse.status,
        }
      );
    }

    const data = (await geminiResponse.json()) as GeminiResponse;

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim() ?? "";

    return Response.json({
      reply: text || FRIENDLY_FALLBACK,
    });
  } catch (err) {
    clearTimeout(timeout);

    console.error(err);

    return Response.json(
      {
        error: FRIENDLY_FALLBACK,
      },
      {
        status: 500,
      }
    );
  }
}