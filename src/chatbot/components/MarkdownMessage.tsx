import { Fragment, type ReactNode } from 'react';

/**
 * Minimal, dependency-free Markdown renderer for chat messages.
 *
 * Intentionally small: covers what a support bot actually produces
 * (paragraphs, bold/italic, inline code, links, bullet & numbered lists)
 * without pulling in a remark/rehype pipeline. Never uses
 * dangerouslySetInnerHTML — everything renders through React elements.
 */

let keyCounter = 0;
function nextKey(): string {
  keyCounter += 1;
  return `md-${keyCounter}`;
}

function renderInline(text: string): ReactNode[] {
  // Order matters: links, then bold, then italic, then code.
  const tokens: ReactNode[] = [];
  // Combined regex: [text](url) | **bold** | *italic* | `code`
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    const [, linkText, linkUrl, bold, italic, code] = match;

    if (linkText && linkUrl) {
      tokens.push(
        <a
          key={nextKey()}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 text-brand-700 dark:text-brand-300 hover:text-brand-600"
        >
          {linkText}
        </a>
      );
    } else if (bold) {
      tokens.push(<strong key={nextKey()}>{bold}</strong>);
    } else if (italic) {
      tokens.push(<em key={nextKey()}>{italic}</em>);
    } else if (code) {
      tokens.push(
        <code
          key={nextKey()}
          className="px-1.5 py-0.5 rounded-md bg-ink-900/10 dark:bg-cream-50/10 font-mono text-[0.85em]"
        >
          {code}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length ? tokens : [text];
}

interface Block {
  type: 'p' | 'ul' | 'ol';
  lines: string[];
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let current: Block | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      current = null;
      continue;
    }

    const bulletMatch = /^[-*]\s+(.*)$/.exec(line);
    const numberedMatch = /^\d+\.\s+(.*)$/.exec(line);

    if (bulletMatch) {
      if (current?.type !== 'ul') {
        current = { type: 'ul', lines: [] };
        blocks.push(current);
      }
      current.lines.push(bulletMatch[1]);
    } else if (numberedMatch) {
      if (current?.type !== 'ol') {
        current = { type: 'ol', lines: [] };
        blocks.push(current);
      }
      current.lines.push(numberedMatch[1]);
    } else {
      if (current?.type !== 'p') {
        current = { type: 'p', lines: [] };
        blocks.push(current);
      }
      current.lines.push(line);
    }
  }

  return blocks;
}

export function MarkdownMessage({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <Fragment>
      {blocks.map((block) => {
        if (block.type === 'ul') {
          return (
            <ul key={nextKey()} className="list-disc pl-5 space-y-1 my-2">
              {block.lines.map((line) => (
                <li key={nextKey()}>{renderInline(line)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol key={nextKey()} className="list-decimal pl-5 space-y-1 my-2">
              {block.lines.map((line) => (
                <li key={nextKey()}>{renderInline(line)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={nextKey()} className="leading-relaxed">
            {block.lines.map((line, i) => (
              <Fragment key={nextKey()}>
                {i > 0 && <br />}
                {renderInline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </Fragment>
  );
}
