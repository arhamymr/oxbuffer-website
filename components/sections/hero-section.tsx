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
          "max-w-4xl"
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
              "rounded-xl border border-border bg-card"
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
                  "flex items-center justify-center lg:justify-start gap-1",
                  // Sizing & Spacing
                  "mb-3",
                  // Typography
                  "text-green-500"
                )}
              >
                <AsteriskIcon
                  className={cn(
                    // Layout & Positioning
                    "hidden md:block animate-spin [animation-duration:2s]",
                    // Sizing & Spacing
                    "size-5"
                  )}
                />
                <ShinyText
                  text="Testing, Recon, and Reporting"
                  className={cn(
                    // Typography
                    "text-sm md:text-md"
                  )}
                  speed={2}
                  shineColor="#bbf7d0"
                />
              </div>
              <h1
                className={cn(
                  // Sizing & Spacing
                  "max-w-sm mb-6",
                  // Typography
                  "text-2xl lg:text-3xl font-normal tracking-tight"
                )}
              >
                Web application tools for developers, QA, and engineers
              </h1>
              <p
                className={cn(
                  // Sizing & Spacing
                  "max-w-sm mb-10",
                  // Typography
                  "text-md md:text-md text-muted-foreground"
                )}
              >
                hexbuffer helps inspect traffic, test APIs, automate workflows, and document findings faster with AI-powered analysis
              </p>
              <Link href="/#features">
                <Button size="lg" className="gap-2">
                  See Features
                  <CubeIcon className="size-4" />
                </Button>
              </Link>
            </div>
            <div
              className={cn(
                // Layout & Positioning
                "hidden lg:block absolute z-9 scale-[0.8] top-0 -right-[480px]",
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
