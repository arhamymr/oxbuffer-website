"use client";

import { WifiSlashIcon, ShieldIcon, LaptopIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

const PERKS = [
  { icon: WifiSlashIcon, label: "Entirely local — runs on your machine, not on our servers" },
  { icon: ShieldIcon, label: "No accounts — install and start working immediately" },
  { icon: LaptopIcon, label: "Zero cloud — everything stays on your machine" },
];

export function OfflineSection() {
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
          "container mx-auto",
          // Sizing & Spacing
          "max-w-7xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Layout & Positioning
              "text-center",
              // Sizing & Spacing
              "mb-10"
            )}
          >
            <h2
              className={cn(
                // Typography
                "text-2xl md:text-3xl font-normal tracking-tight",
                // Sizing & Spacing
                "mb-3"
              )}
            >
              A local-first desktop app
            </h2>
            <p
              className={cn(
                // Layout & Positioning
                "mx-auto",
                // Sizing & Spacing
                "max-w-xl",
                // Typography
                "text-muted-foreground"
              )}
            >
              hexbuffer runs entirely on your machine. No cloud, no accounts.
            </p>
          </div>

          <div
            className={cn(
              // Layout & Positioning
              "grid md:grid-cols-3",
              // Sizing & Spacing
              "gap-6"
            )}
          >
            {PERKS.map((perk, i) => (
              <ScrollReveal key={perk.label} delay={i * 0.1}>
                <div
                  className={cn(
                    // Layout & Positioning
                    "flex flex-col items-center text-center",
                    // Sizing & Spacing
                    "p-6 gap-3",
                    // Backgrounds & Borders
                    "rounded-lg border border-border bg-card"
                  )}
                >
                  <div
                    className={cn(
                      // Layout & Positioning
                      "flex items-center justify-center",
                      // Sizing & Spacing
                      "w-10 h-10",
                      // Backgrounds & Borders
                      "rounded-full bg-muted"
                    )}
                  >
                    <perk.icon
                      className={cn(
                        // Sizing & Spacing
                        "size-5",
                        // Typography
                        "text-muted-foreground"
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      // Typography
                      "text-sm text-muted-foreground"
                    )}
                  >
                    {perk.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
