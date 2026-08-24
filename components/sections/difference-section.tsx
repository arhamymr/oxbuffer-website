"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

export function DifferenceSection() {
  return (
    <section
      className={cn(
        // Sizing & Spacing
        "py-24 px-4 sm:px-6 lg:px-8",
        // Backgrounds & Borders
        "border-t border-border"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto text-center",
          // Sizing & Spacing
          "max-w-7xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Layout & Positioning
              "relative overflow-hidden mx-auto",
              // Sizing & Spacing
              "p-8 md:p-14",
              // Backgrounds & Borders
              "rounded-2xl border border-border border-t-neutral-800 bg-card shadow-xl backdrop-blur-xl"
            )}
          >
            <h2
              className={cn(
                // Typography
                "text-3xl md:text-4xl font-medium tracking-tight text-foreground",
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
                "max-w-3xl",
                // Typography
                "text-base md:text-lg text-muted-foreground leading-relaxed"
              )}
            >
              hexbuffer combines real-time HTTP interception, manual request crafting, targeted endpoint attacks, and session notes into a fast, standalone desktop application. No web-based tool sprawl. No juggling disconnected single-purpose utilities. Just open hexbuffer and get to work.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
