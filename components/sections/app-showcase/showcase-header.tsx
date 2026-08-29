import { BrowsersIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function ShowcaseHeader() {
  return (
    <div
      className={cn(
        // Layout & Positioning
        "flex flex-col items-start text-start",
        // Sizing & Spacing
        "mb-12 max-w-2xl"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "inline-flex items-center gap-1.5",
          // Sizing & Spacing
          "px-2.5 py-1 mb-4 rounded-full",
          // Backgrounds & Borders
          "border border-border bg-card",
          // Typography
          "text-xs font-mono text-emerald-400"
        )}
      >
        <BrowsersIcon className="size-3.5" />
        <span>APPLICATION SUITE</span>
      </div>
      <h2
        className={cn(
          // Typography
          "text-2xl sm:text-4xl font-semibold tracking-tight text-foreground",
          // Sizing & Spacing
          "mb-3"
        )}
      >
        Built-in modules for every phase of testing.
      </h2>
      <p
        className={cn(
          // Typography
          "text-base text-muted-foreground leading-relaxed"
        )}
      >
        Seven dedicated desktop tools engineered for web application reconnaissance, traffic analysis, and vulnerability discovery.
      </p>
    </div>
  );
}
