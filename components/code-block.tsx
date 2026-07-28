"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, TerminalWindowIcon, FileCodeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightLine(line: string, lang: string): string {
  if (lang === "rust") {
    const tokenRegex = /(\/\/.*$)|("[^"]*")|(#\[[^\]]+\])|\b(use|pub|fn|async|await|let|mut|struct|enum|trait|impl|match|if|else|return|ok|err|type|for|in|where)\b|\b(Self|Option|Result|Some|None|Ok|Err|String|Vec|SocketAddr|Bytes|Arc|AtomicBool|PathBuf|usize|u64|u8|bool)\b|\b(ProxyBuilder|Proxy|CertificationAuthority|HttpHandler|WebSocketHandler|NoopHandler|NoopWebSocketHandler|HttpContext|Body|RequestOrResponse|Direction|WebSocketMessage|ProxyError|DecodeHandler)\b/g;

    let result = "";
    let lastIndex = 0;

    for (const match of line.matchAll(tokenRegex)) {
      const matchStr = match[0];
      const index = match.index!;

      if (index > lastIndex) {
        result += escapeHtml(line.slice(lastIndex, index));
      }

      const escaped = escapeHtml(matchStr);

      if (match[1]) {
        result += `<span class="text-zinc-500 italic">${escaped}</span>`;
      } else if (match[2]) {
        result += `<span class="text-emerald-400">${escaped}</span>`;
      } else if (match[3]) {
        result += `<span class="text-amber-500/90">${escaped}</span>`;
      } else if (match[4]) {
        result += `<span class="text-purple-400 font-semibold">${escaped}</span>`;
      } else if (match[5]) {
        result += `<span class="text-amber-400 font-medium">${escaped}</span>`;
      } else if (match[6]) {
        result += `<span class="text-cyan-300 font-medium">${escaped}</span>`;
      } else {
        result += escaped;
      }

      lastIndex = index + matchStr.length;
    }

    if (lastIndex < line.length) {
      result += escapeHtml(line.slice(lastIndex));
    }

    return result;
  } else if (lang === "toml") {
    const tokenRegex = /(#.*$)|(^\[[^\]]+\])|^([a-zA-Z0-9_-]+)(?=\s*=)|("[^"]*")/g;

    let result = "";
    let lastIndex = 0;

    for (const match of line.matchAll(tokenRegex)) {
      const matchStr = match[0];
      const index = match.index!;

      if (index > lastIndex) {
        result += escapeHtml(line.slice(lastIndex, index));
      }

      const escaped = escapeHtml(matchStr);

      if (match[1]) {
        result += `<span class="text-zinc-500 italic">${escaped}</span>`;
      } else if (match[2]) {
        result += `<span class="text-purple-400 font-bold">${escaped}</span>`;
      } else if (match[3]) {
        result += `<span class="text-cyan-300">${escaped}</span>`;
      } else if (match[4]) {
        result += `<span class="text-emerald-400">${escaped}</span>`;
      } else {
        result += escaped;
      }

      lastIndex = index + matchStr.length;
    }

    if (lastIndex < line.length) {
      result += escapeHtml(line.slice(lastIndex));
    }

    return result;
  } else if (lang === "bash" || lang === "cmd") {
    const tokenRegex = /(#.*$)|("[^"]*"|'[^']*')|\b(sudo|certutil|cargo|npx|git|pnpm|npm|cd|mkdir|cp|update-ca-certificates|security)\b|\b(add-trusted-cert|-d|-r|-k|-addstore|install|build|run)\b/g;

    let result = "";
    let lastIndex = 0;

    for (const match of line.matchAll(tokenRegex)) {
      const matchStr = match[0];
      const index = match.index!;

      if (index > lastIndex) {
        result += escapeHtml(line.slice(lastIndex, index));
      }

      const escaped = escapeHtml(matchStr);

      if (match[1]) {
        result += `<span class="text-zinc-500 italic">${escaped}</span>`;
      } else if (match[2]) {
        result += `<span class="text-emerald-400">${escaped}</span>`;
      } else if (match[3]) {
        result += `<span class="text-purple-400 font-bold">${escaped}</span>`;
      } else if (match[4]) {
        result += `<span class="text-cyan-300">${escaped}</span>`;
      } else {
        result += escaped;
      }

      lastIndex = index + matchStr.length;
    }

    if (lastIndex < line.length) {
      result += escapeHtml(line.slice(lastIndex));
    }

    return result;
  }

  return escapeHtml(line);
}

export function CodeBlock({
  code,
  language = "rust",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const formatCode = (rawCode: string, lang: string) => {
    const lines = rawCode.trim().split("\n");

    return lines.map((line, idx) => {
      const content = highlightLine(line, lang);

      return (
        <div key={idx} className="table-row">
          {showLineNumbers && (
            <span className="table-cell select-none pr-4 text-right text-sm text-zinc-500 font-mono">
              {idx + 1}
            </span>
          )}
          <span
            className="table-cell whitespace-pre font-mono text-sm leading-relaxed text-zinc-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "group relative my-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            {language === "bash" || language === "cmd" ? (
              <TerminalWindowIcon className="size-3.5 text-primary" />
            ) : (
              <FileCodeIcon className="size-3.5 text-primary" />
            )}
            <span>{filename || language}</span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            className="h-6 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <CheckIcon className="size-3 text-primary" />
                <span className="text-primary">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="size-3" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      )}

      <div className="overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="table w-full">{formatCode(code, language)}</div>
      </div>
    </div>
  );
}
