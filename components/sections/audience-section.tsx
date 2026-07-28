"use client";

import { CrosshairIcon, BugIcon, MicroscopeIcon, WrenchIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const AUDIENCE = [
  {
    icon: CrosshairIcon,
    title: "Penetration Testers",
    desc: "A complete workstation that replaces a patchwork of tools.",
  },
  {
    icon: BugIcon,
    title: "Bug Bounty Hunters",
    desc: "Find, verify, and document vulnerabilities faster.",
  },
  {
    icon: MicroscopeIcon,
    title: "Security Researchers",
    desc: "Deep traffic analysis combined with AI-assisted discovery.",
  },
  {
    icon: WrenchIcon,
    title: "Developers & QA",
    desc: "Debug APIs and test endpoint behavior manually.",
  },
];

export function AudienceSection() {
  return (
    <section
      id="audience"
      className={cn(
        // Sizing & Spacing
        "py-24 px-4",
        // Backgrounds & Borders
        "border-t border-border"
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
              "text-center",
              // Sizing & Spacing
              "mb-14"
            )}
          >
            <h2
              className={cn(
                // Typography
                "text-3xl md:text-4xl font-normal",
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
                "text-muted-foreground"
              )}
            >
              Built for anyone who needs to inspect, test, and document web applications.
            </p>
          </div>

          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-2",
              // Sizing & Spacing
              "gap-4"
            )}
          >
            {AUDIENCE.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div
                  className={cn(
                    // Layout & Positioning
                    "flex gap-4",
                    // Sizing & Spacing
                    "min-h-25 px-4 py-3",
                    // Backgrounds & Borders
                    "rounded-xl border border-border bg-card",
                    // Interactive & States
                    "group transition-colors hover:border-border hover:bg-card"
                  )}
                >
                  <div
                    className={cn(
                      // Layout & Positioning
                      "flex items-center justify-center shrink-0",
                      // Sizing & Spacing
                      "size-10 mt-0.5",
                      // Backgrounds & Borders
                      "rounded-md border border-border bg-muted"
                    )}
                  >
                    <item.icon
                      className={cn(
                        // Sizing & Spacing
                        "size-5",
                        // Typography
                        "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        // Typography
                        "font-medium text-foreground",
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
