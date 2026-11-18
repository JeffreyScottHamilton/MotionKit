"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface SourceFile {
  path: string;
  code: string;
}

/** Copies text via the Clipboard API, falling back to a hidden textarea + execCommand. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea fallback
  }
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        aria-label={label}
        className="h-7 gap-1.5 px-2 text-xs focus-visible:ring-brand focus-visible:ring-2"
      >
        {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}

/** A single mono, scrollable code block with a copy button. */
export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-border bg-muted", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
        <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">{label ?? ""}</span>
        <CopyButton text={code} label={label ? `Copy ${label}` : "Copy code"} />
      </div>
      <pre className="max-h-96 overflow-auto p-3 text-sm leading-relaxed">
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

/** Shows one file directly, or several files as tabs keyed by path. */
export function CodeFiles({ files }: { files: SourceFile[] }) {
  if (files.length === 0) return null;
  if (files.length === 1) {
    return <CodeBlock code={files[0].code} label={files[0].path} />;
  }
  return (
    <Tabs defaultValue={files[0].path} className="gap-2">
      <TabsList className="h-auto w-full flex-wrap justify-start overflow-x-auto">
        {files.map((file) => (
          <TabsTrigger key={file.path} value={file.path} className="font-mono text-xs">
            {file.path}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((file) => (
        <TabsContent key={file.path} value={file.path}>
          <CodeBlock code={file.code} label={file.path} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
