"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon, HexagonIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { icon: HexagonIcon, label: "Always improving" },
  { icon: HeartIcon, label: "Open to feedback" },
];

export function CtaSection() {
  return (
    <section
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "py-24 px-4",
        // Backgrounds & Borders
        "border-t border-border"
      )}
    >
      {/* subtle radial glow */}
      <div
        className={cn(
          // Layout & Positioning
          "absolute inset-0 pointer-events-none"
        )}
      >
      </div>

      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto relative",
          // Sizing & Spacing
          "max-w-4xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Sizing & Spacing
              "p-10 md:p-14",
              // Backgrounds & Borders
              "rounded-xl border border-border bg-card"
            )}
          >
            <div
              className={cn(
                // Layout & Positioning
                "grid md:grid-cols-[1fr_auto] items-center",
                // Sizing & Spacing
                "gap-10"
              )}
            >
              {/* Left: copy */}
              <div>
                <h2
                  className={cn(
                    // Typography
                    "text-2xl md:text-3xl font-normal tracking-tight",
                    // Sizing & Spacing
                    "mb-3"
                  )}
                >
                  Try hexbuffer on your next target.
                </h2>
                <p
                  className={cn(
                    // Sizing & Spacing
                    "max-w-md",
                    // Typography
                    "text-muted-foreground"
                  )}
                >
                  A desktop app for web app recon, traffic inspection, and application testing — all in one place.
                </p>

                <div
                  className={cn(
                    // Layout & Positioning
                    "flex flex-wrap items-center",
                    // Sizing & Spacing
                    "gap-x-5 gap-y-2 mt-6",
                    // Typography
                    "text-xs text-muted-foreground"
                  )}
                >
                  {HIGHLIGHTS.map((item) => (
                    <span
                      key={item.label}
                      className={cn(
                        // Layout & Positioning
                        "flex items-center",
                        // Sizing & Spacing
                        "gap-1.5"
                      )}
                    >
                      <item.icon
                        className={cn(
                          // Sizing & Spacing
                          "size-3.5"
                        )}
                      />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: actions */}
              <div
                className={cn(
                  // Layout & Positioning
                  "flex flex-col items-stretch",
                  // Sizing & Spacing
                  "gap-3 min-w-[220px]"
                )}
              >
                <Button size="lg" className="gap-2 w-full" asChild>
                  <a href="/downloads">
                    Download for macOS
                    <ArrowRightIcon className="size-4" />
                  </a>
                </Button>

                <Button size="lg" variant="outline" className="gap-2 w-full" disabled>
                  Windows — Coming Soon
                </Button>

                <p
                  className={cn(
                    // Layout & Positioning
                    "text-center",
                    // Sizing & Spacing
                    "mt-1",
                    // Typography
                    "text-[11px] text-muted-foreground"
                  )}
                >
                  macOS available now — Windows coming soon
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
