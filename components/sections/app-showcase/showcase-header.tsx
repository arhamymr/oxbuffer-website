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
