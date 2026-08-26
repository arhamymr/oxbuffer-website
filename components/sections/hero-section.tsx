"use client";

import Link from "next/link";
import { Button } from "@celestia-project/ui";
import { AsteriskIcon, CubeIcon } from "@phosphor-icons/react";
import { ShinyText } from "@/components/shiny-text";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        // Layout & Positioning
        "overflow-hidden",
        // Sizing & Spacing
        "py-16 px-4 sm:px-6 lg:px-8 mt-10"
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
              "relative overflow-hidden",
              // Sizing & Spacing
              "p-8 md:p-14",
              // Backgrounds & Borders
              "rounded-2xl border border-border border-t-neutral-700 bg-card shadow-2xl backdrop-blur-xl",
              // Interactive & States
              "transition-all duration-300 hover:border-neutral-700"
            )}
          >
            <div
              className={cn(
                // Layout & Positioning
                "flex flex-col justify-center items-start z-10",
                // Sizing & Spacing
                "h-full"
              )}
            >
              <div
                className={cn(
                  // Layout & Positioning
                  "flex items-center justify-center lg:justify-start gap-1.5",
                  // Sizing & Spacing
                  "mb-3",
                  // Typography
                  "text-emerald-400"
                )}
              >
                <AsteriskIcon
                  className={cn(
                    // Layout & Positioning
                    "hidden md:block animate-spin [animation-duration:3s]",
                    // Sizing & Spacing
                    "size-5"
                  )}
                />
                <ShinyText
                  text="HTTP Traffic Interception & Testing"
                  className={cn(
                    // Typography
                    "text-sm font-mono tracking-tight md:text-md"
                  )}
                  speed={2}
                  shineColor="#34d399"
                />
              </div>
              <h1
                className={cn(
                  // Sizing & Spacing
                  "max-w-xl mb-6",
                  // Typography
                  "text-2xl lg:text-5xl font-semibold tracking-tight leading-tight text-foreground"
                )}
              >
                Testing tools for web development and security
              </h1>
              <p
                className={cn(
                  // Sizing & Spacing
                  "max-w-xl mb-10",
                  // Typography
                  "text-sm md:text-lg text-muted-foreground leading-relaxed"
                )}
              >
                Hexbuffer lets you capture HTTP traffic, modify requests mid-flight, replay and fuzz endpoints, and organize notes in a single local desktop workspace.
              </p>
              <Button size="lg" render={<Link href="/#features" />}>
                See Features
                <CubeIcon className="size-4" />
              </Button>
            </div>
            {/* <div
              className={cn(
                // Layout & Positioning
                "hidden lg:block absolute z-9 scale-[0.85] xl:scale-[0.92] 2xl:scale-100 top-2 -right-[400px] pointer-events-none",
                // Sizing & Spacing
                "w-[1000px] h-[620px]"
              )}
            >
              <TrafficIllustration />
            </div> */}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
