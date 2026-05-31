"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const installCommand = "curl -fsSL https://dist.0xbuffer.com/install.sh | bash";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copyInstallCommand() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(installCommand);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = installCommand;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">
        {installCommand}
      </code>
      <Button
        type="button"
        variant={copied ? "secondary" : "outline"}
        onClick={copyInstallCommand}
        aria-label={copied ? "Install command copied" : "Copy install command"}
        className="sm:w-28"
      >
        {copied ? (
          <>
            <Check className="size-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
