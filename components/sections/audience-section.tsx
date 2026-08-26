"use client";

import { motion } from "motion/react";
import { CrosshairIcon, MicroscopeIcon, WrenchIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

const AUDIENCE = [
  {
    icon: CrosshairIcon,
    title: "Penetration Testers",
    desc: "A dedicated local workstation for inspecting and manipulating HTTP traffic.",
  },
  {
    icon: MicroscopeIcon,
    title: "Security Researchers",
    desc: "Deep HTTP request and response inspection with manual payload tampering.",
  },
  {
    icon: WrenchIcon,
    title: "Developers & QA",
    desc: "Debug APIs and test endpoint behavior with immediate request replay.",
  },
] as const;

export function AudienceSection() {
  return (
    <section
      id="audience"
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
              Who Is It For?
            </h2>
            <p
              className={cn(
                // Layout & Positioning
                "mx-auto",
                // Sizing & Spacing
                "max-w-md",
                // Typography
                "text-base text-muted-foreground leading-relaxed"
              )}
            >
              Built for anyone who needs to inspect, test, and document web applications.
            </p>
          </div>

          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-1 lg:grid-cols-3",
              // Sizing & Spacing
              "gap-4"
            )}
          >
            {AUDIENCE.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={CRITICALLY_DAMPED_SPRING}
                  className={cn(
                    // Layout & Positioning
                    "flex gap-4 h-full",
                    // Sizing & Spacing
                    "min-h-25 px-5 py-4",
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
                    <item.icon
                      className={cn(
                        // Sizing & Spacing
                        "size-5",
                        // Typography
                        "text-muted-foreground group-hover:text-emerald-400 transition-colors"
                      )}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        // Typography
                        "font-medium text-foreground tracking-tight text-base",
                        // Sizing & Spacing
                        "mb-1"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        // Typography
                        "text-sm text-muted-foreground leading-relaxed"
                      )}
                    >
                      {item.desc}
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
