"use client";

import Link from "next/link";
import { Button } from "@celestia-project/ui";
import { ArrowRightIcon, AsteriskIcon, CubeIcon } from "@phosphor-icons/react";
import { ShinyText } from "@/components/shiny-text";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8"
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
              // Layout & Positioning
              "flex flex-col items-start text-start",
              // Sizing & Spacing
              "max-w-2xl"
            )}
          >
            {/* Minimal Badge */}
            <div
              className={cn(
                // Layout & Positioning
                "inline-flex items-center gap-2",
                // Sizing & Spacing
                "px-3 py-1 mb-6 rounded-full",
                // Backgrounds & Borders
                "border border-border bg-card",
                // Typography
                "text-xs font-mono text-emerald-400"
              )}
            >
              <AsteriskIcon
                className={cn(
                  // Layout & Positioning
                  "animate-spin [animation-duration:4s]",
                  // Sizing & Spacing
                  "size-3.5"
                )}
              />
              <ShinyText
                text="HTTP Traffic Interception & Testing"
                className={cn(
                  // Typography
                  "text-xs font-mono tracking-tight"
                )}
                speed={2}
                shineColor="#34d399"
              />
            </div>

            {/* Main Headline */}
            <h1
              className={cn(
                // Typography
                "text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.12]",
                // Sizing & Spacing
                "mb-6"
              )}
            >
              Testing tools for web development & security.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p
              className={cn(
                // Typography
                "text-base sm:text-lg text-muted-foreground leading-relaxed",
                // Sizing & Spacing
                "mb-10 max-w-xl"
              )}
            >
              Hexbuffer is a local-first desktop suite to inspect HTTP traffic, modify requests mid-flight, replay and fuzz endpoints, and organize reconnaissance notes.
            </p>

            {/* Action Row */}
            <div
              className={cn(
                // Layout & Positioning
                "flex flex-wrap items-center",
                // Sizing & Spacing
                "gap-3"
              )}
            >
              <Button
                size="lg"
                render={<Link href="/downloads" />}
              >
                Download for macOS
                <ArrowRightIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/#features" />}
              >
                Explore Modules
                <CubeIcon className="size-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
