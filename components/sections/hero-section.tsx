"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AsteriskIcon, CubeIcon } from "@phosphor-icons/react";
import { TrafficIllustration } from "@/components/traffic-illustration";
import { ShinyText } from "@/components/shiny-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        // Layout & Positioning
        "overflow-hidden",
        // Sizing & Spacing
        "py-16 px-4 mt-10"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto",
          // Sizing & Spacing
          "max-w-6xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Layout & Positioning
              "relative overflow-hidden",
              // Sizing & Spacing
              "h-120 p-8 md:p-12",
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
                  text="Testing, Recon, and Reporting"
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
                  "max-w-md mb-6",
                  // Typography
                  "text-3xl lg:text-4xl font-semibold tracking-tight leading-snug text-foreground"
                )}
              >
                Web application tools for developers, QA, and engineers
              </h1>
              <p
                className={cn(
                  // Sizing & Spacing
                  "max-w-lg mb-10",
                  // Typography
                  "text-base md:text-lg text-muted-foreground leading-relaxed"
                )}
              >
                hexbuffer helps inspect traffic, test APIs, automate workflows, and document findings faster with AI-powered analysis
              </p>
              <Link href="/#features">
                <Button size="lg" className="gap-2 active:scale-95 transition-transform duration-100 ease-out">
                  See Features
                  <CubeIcon className="size-4" />
                </Button>
              </Link>
            </div>
            <div
              className={cn(
                // Layout & Positioning
                "hidden lg:block absolute z-9 scale-[0.85] top-0 -right-[380px] pointer-events-none",
                // Sizing & Spacing
                "w-[1000px] h-[620px]"
              )}
            >
              <TrafficIllustration />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
