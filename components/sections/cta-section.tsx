"use client";

import Link from "next/link";
import { Button } from "@celestia-project/ui";
import { ArrowRightIcon, HeartIcon, HexagonIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { icon: HexagonIcon, label: "Always improving" },
  { icon: HeartIcon, label: "Open to feedback" },
] as const;

export function CtaSection() {
  return (
    <section
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "py-20 md:py-28 px-4 sm:px-6 lg:px-8",
        // Backgrounds & Borders
        "border-t border-border"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto",
          // Sizing & Spacing
          "max-w-5xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Sizing & Spacing
              "p-8 sm:p-10 md:p-12",
              // Backgrounds & Borders
              "rounded-xl border border-border bg-card shadow-sm"
            )}
          >
            <div
              className={cn(
                // Layout & Positioning
                "grid md:grid-cols-[1fr_auto] items-center",
                // Sizing & Spacing
                "gap-8 md:gap-12"
              )}
            >
              {/* Left Column: Copy */}
              <div className="text-start">
                <h2
                  className={cn(
                    // Typography
                    "text-2xl sm:text-3xl font-semibold tracking-tight text-foreground",
                    // Sizing & Spacing
                    "mb-3"
                  )}
                >
                  Try Hexbuffer on your next target.
                </h2>
                <p
                  className={cn(
                    // Sizing & Spacing
                    "max-w-lg",
                    // Typography
                    "text-base text-muted-foreground leading-relaxed"
                  )}
                >
                  A lightweight desktop workspace for HTTP inspection, request interception, payload testing, and API debugging.
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
                          "size-3.5",
                          // Typography
                          "text-emerald-400"
                        )}
                      />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div
                className={cn(
                  // Layout & Positioning
                  "flex flex-col items-stretch",
                  // Sizing & Spacing
                  "gap-2.5 min-w-[220px]"
                )}
              >
                <Button
                  size="lg"
                  render={
                    <Link href="/downloads" />
                  }
                >
                  Download for macOS
                  <ArrowRightIcon className="size-4" />
                </Button>

                <Button size="lg" variant="outline" disabled>
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
                  macOS available now
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
