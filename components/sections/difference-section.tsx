"use client";

import { PulseTriangle } from "@/components/pulse-triangle";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export function DifferenceSection() {
  return (
    <section
      className={cn(
        // Sizing & Spacing
        "py-24 px-4",
        // Backgrounds & Borders
        "bg-muted border-t border-border"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto text-center",
          // Sizing & Spacing
          "max-w-4xl"
        )}
      >
        <ScrollReveal>
          <h2
            className={cn(
              // Typography
              "text-3xl md:text-4xl font-normal",
              // Sizing & Spacing
              "mb-4"
            )}
          >
            How Is It Different?
          </h2>
          <p
            className={cn(
              // Layout & Positioning
              "mx-auto",
              // Sizing & Spacing
              "max-w-2xl",
              // Typography
              "text-lg text-muted-foreground"
            )}
          >
            hexbuffer combines real-time traffic interception, manual request crafting, automated attacks, AI-driven reconnaissance (AI feature currently under development), and professional report building in a single desktop application. No web-based tool sprawl. No juggling five different windows. Just open hexbuffer and get to work.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
