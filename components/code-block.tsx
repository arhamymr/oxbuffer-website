"use client";

import { useState } from "react";
import { Check, Copy, Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
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

  // Simple syntax tokenizer for Rust, TOML, Bash, HTTP, etc.
  const formatCode = (rawCode: string, lang: string) => {
    const lines = rawCode.trim().split("\n");

    return lines.map((line, idx) => {
      let content = line;

      // Basic regex token replacement for visual pop
      if (lang === "rust") {
        content = line
          // Comments
          .replace(/(\/\/.*$)/g, '<span class="text-zinc-500 italic">$1</span>')
          // String literals
          .replace(/("[^"]*")/g, '<span class="text-emerald-400">$1</span>')
          // Keywords
          .replace(
            /\b(use|pub|fn|async|await|let|mut|struct|enum|trait|impl|match|if|else|return|ok|err|type|for|in|where)\b/g,
            '<span class="text-purple-400 font-semibold">$1</span>'
          )
          // Primitive & Standard Types
          .replace(
            /\b(Self|Option|Result|Some|None|Ok|Err|String|Vec|SocketAddr|Bytes|Arc|AtomicBool|PathBuf|usize|u64|u8|bool)\b/g,
            '<span class="text-amber-400 font-medium">$1</span>'
          )
          // Library symbols & Traits
          .replace(
            /\b(ProxyBuilder|Proxy|CertificationAuthority|HttpHandler|WebSocketHandler|NoopHandler|NoopWebSocketHandler|HttpContext|Body|RequestOrResponse|Direction|WebSocketMessage|ProxyError|DecodeHandler)\b/g,
            '<span class="text-cyan-300 font-medium">$1</span>'
          )
          // Attributes
          .replace(/(#\[[^\]]+\])/g, '<span class="text-amber-500/90">$1</span>');
      } else if (lang === "toml") {
        content = line
          .replace(/(#.*$)/g, '<span class="text-zinc-500 italic">$1</span>')
          .replace(/^(\[[^\]]+\])/g, '<span class="text-purple-400 font-bold">$1</span>')
          .replace(/^([a-zA-Z0-9_-]+)\s*=/g, '<span class="text-cyan-300">$1</span> =')
          .replace(/("[^"]*")/g, '<span class="text-emerald-400">$1</span>');
      } else if (lang === "bash" || lang === "cmd") {
        content = line
          .replace(/(#.*$)/g, '<span class="text-zinc-500 italic">$1</span>')
          .replace(
            /\b(sudo|certutil|cargo|npx|git|pnpm|npm|cd|mkdir|cp|update-ca-certificates|security)\b/g,
            '<span class="text-purple-400 font-bold">$1</span>'
          )
          .replace(/(add-trusted-cert|-d|-r|-k|-addstore|install|build|run)/g, '<span class="text-cyan-300">$1</span>')
          .replace(/("[^"]*"|'[^']*')/g, '<span class="text-emerald-400">$1</span>');
      }

      return (
        <div key={idx} className="table-row">
          {showLineNumbers && (
            <span className="table-cell select-none pr-4 text-right text-xs text-zinc-600 font-mono">
              {idx + 1}
            </span>
          )}
          <span
            className="table-cell whitespace-pre font-mono text-xs leading-relaxed text-zinc-200"
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
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            {language === "bash" || language === "cmd" ? (
              <Terminal className="size-3.5 text-emerald-400" />
            ) : (
              <FileCode className="size-3.5 text-cyan-400" />
            )}
            <span>{filename || language}</span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            className="h-6 gap-1 px-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
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
