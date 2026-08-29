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
    desc: "A dedicated local workstation for intercepting, inspecting, and manipulating live target HTTP traffic.",
  },
  {
    icon: MicroscopeIcon,
    title: "Security Researchers",
    desc: "Deep request and response payload inspection with automated fuzzing and token tampering.",
  },
  {
    icon: WrenchIcon,
    title: "Developers & QA",
    desc: "Debug web APIs, mock scenarios, and verify endpoint behavior with instant request replay.",
  },
] as const;

export function AudienceSection() {
  return (
    <section
      id="audience"
      className={cn(
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
          {/* Section Header */}
          <div
            className={cn(
              // Layout & Positioning
              "flex flex-col items-start text-start",
              // Sizing & Spacing
              "mb-12 max-w-2xl"
            )}
          >
            <h2
              className={cn(
                // Typography
                "text-2xl sm:text-4xl font-semibold tracking-tight text-foreground",
                // Sizing & Spacing
                "mb-3"
              )}
            >
              Who is Hexbuffer for?
            </h2>
            <p
              className={cn(
                // Typography
                "text-base text-muted-foreground leading-relaxed"
              )}
            >
              Tailored for security engineers, penetration testers, and developers requiring fast, private local reconnaissance.
            </p>
          </div>

          {/* Minimal 3-Card Grid */}
          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-1 md:grid-cols-3",
              // Sizing & Spacing
              "gap-4"
            )}
          >
            {AUDIENCE.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={CRITICALLY_DAMPED_SPRING}
                  className={cn(
                    // Layout & Positioning
                    "flex flex-col justify-start h-full",
                    // Sizing & Spacing
                    "p-6 rounded-xl",
                    // Backgrounds & Borders
                    "border border-border bg-card shadow-sm",
                    // Interactive & States
                    "group transition-colors duration-150 hover:border-neutral-700 hover:bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      // Layout & Positioning
                      "flex items-center justify-center shrink-0",
                      // Sizing & Spacing
                      "size-10 mb-4",
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
                        "font-semibold text-foreground tracking-tight text-base",
                        // Sizing & Spacing
                        "mb-1.5"
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
