import type { ReactNode } from "react";

type Block =
  | { kind: "h1" | "h2" | "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "pre"; text: string };

/** Splits markdown into headings, paragraphs, bullet lists and fenced code blocks. Only the subset used by THIRD_PARTY_NOTICES.md. */
function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ kind: "pre", text: code.join("\n") });
    } else if (line.startsWith("# ")) {
      blocks.push({ kind: "h1", text: line.slice(2).trim() });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ kind: "ul", items });
    } else if (line.trim() === "") {
      i++;
    } else {
      const paragraph: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !lines[i].startsWith("```") &&
        !lines[i].startsWith("# ") &&
        !lines[i].startsWith("## ") &&
        !lines[i].startsWith("- ")
      ) {
        paragraph.push(lines[i].trim());
        i++;
      }
      blocks.push({ kind: "p", text: paragraph.join(" ") });
    }
  }

  return blocks;
}

/** Renders `inline code` spans; all other text is plain. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
      <code key={index} className="rounded-md bg-muted px-1 py-0.5 text-xs">
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function NoticesMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseBlocks(markdown);

  return (
    <div className="flex flex-col gap-4 text-sm leading-6">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "h1":
            return (
              <h2 key={index} className="text-xl font-semibold tracking-tight">
                {block.text}
              </h2>
            );
          case "h2":
            return (
              <h3 key={index} className="mt-4 text-lg font-semibold tracking-tight">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="text-muted-foreground">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="list-disc space-y-1 pl-5 text-muted-foreground">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "pre":
            return (
              <pre
                key={index}
                className="whitespace-pre-wrap break-words rounded-md border border-border bg-muted p-3 text-xs leading-5"
              >
                {block.text}
              </pre>
            );
        }
      })}
    </div>
  );
}
