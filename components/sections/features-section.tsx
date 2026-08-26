"use client";

import { motion } from "motion/react";
import {
  ArrowsDownUpIcon,
  PauseCircleIcon,
  InfinityIcon,
  CubeFocusIcon,
  PencilIcon,
  GearSixIcon,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

const FEATURES = [
  {
    icon: ArrowsDownUpIcon,
    title: "HTTP & HTTPS History",
    description:
      "Capture, inspect, and filter real-time HTTP and HTTPS network traffic with detailed header and body viewers.",
  },
  {
    icon: PauseCircleIcon,
    title: "Intercept & Tamper",
    description:
      "Pause traffic mid-flight. Edit raw request and response headers, parameters, and bodies before they resolve.",
  },
  {
    icon: InfinityIcon,
    title: "Request Repeater",
    description:
      "Modify HTTP requests, reissue them instantly, and analyze response status, headers, and bodies side-by-side.",
  },
  {
    icon: CubeFocusIcon,
    title: "Intruder & Fuzzer",
    description:
      "Set payload positions, configure wordlists, and run automated attack iterations against target endpoints.",
  },
  {
    icon: PencilIcon,
    title: "Notes & Scratchpad",
    description:
      "Write markdown notes, record reproduction steps, and keep context organized within your testing session.",
  },
  {
    icon: GearSixIcon,
    title: "Proxy Configuration",
    description:
      "Configure custom proxy listeners, install trusted CA root certificates, and tune application preferences.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      id="features"
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
          "max-w-5xl"
        )}
      >
        <ScrollReveal>
          <div
            className={cn(
              // Layout & Positioning
              "text-center",
              // Sizing & Spacing
              "mb-14"
            )}
          >
            <h2
              className={cn(
                // Typography
                "text-3xl md:text-4xl font-medium tracking-tight text-foreground",
                // Sizing & Spacing
                "mb-3"
              )}
            >
              What Can You Do?
            </h2>
            <p
              className={cn(
                // Layout & Positioning
                "mx-auto",
                // Sizing & Spacing
                "max-w-lg",
                // Typography
                "text-base text-muted-foreground leading-relaxed"
              )}
            >
              Essential tools for inspecting, tampering, replaying, and testing web application traffic in one workspace.
            </p>
          </div>

          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-2 lg:grid-cols-3",
              // Sizing & Spacing
              "gap-4"
            )}
          >
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={CRITICALLY_DAMPED_SPRING}
                  className={cn(
                    // Layout & Positioning
                    "flex gap-4 h-full",
                    // Sizing & Spacing
                    "px-5 py-4",
                    // Backgrounds & Borders
                    "rounded-xl border border-border border-t-neutral-800 bg-card backdrop-blur-md shadow-sm",
                    // Interactive & States
                    "group transition-colors duration-200 hover:border-neutral-700 hover:bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      // Layout & Positioning
                      "flex items-center justify-center shrink-0",
                      // Sizing & Spacing
                      "size-10 mt-0.5",
                      // Backgrounds & Borders
                      "rounded-lg border border-border bg-muted",
                      // Interactive & States
                      "group-hover:border-emerald-500 transition-colors"
                    )}
                  >
                    <feature.icon
                      className={cn(
                        // Sizing & Spacing
                        "size-5",
                        // Typography
                        "text-muted-foreground group-hover:text-emerald-400 transition-colors"
                      )}
                    />
                  </div>
                  <div className={cn("min-w-0 flex-1")}>
                    <h3
                      className={cn(
                        // Layout & Positioning
                        "flex items-center gap-2",
                        // Sizing & Spacing
                        "mb-1",
                        // Typography
                        "font-medium text-foreground tracking-tight text-base"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        // Typography
                        "text-sm text-muted-foreground leading-relaxed"
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}