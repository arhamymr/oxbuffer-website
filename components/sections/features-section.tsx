"use client";

import { motion } from "motion/react";
import {
  ArrowsDownUpIcon,
  PauseCircleIcon,
  ArrowsClockwiseIcon,
  SwordIcon,
  PinwheelIcon,
  GlobeIcon,
  FileTextIcon,
  BroadcastIcon,
  BugIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

const FEATURES = [
  {
    icon: ArrowsDownUpIcon,
    title: "HTTP & WS History",
    description:
      "Capture, inspect, and filter HTTP traffic and live WebSocket frames in real time.",
  },
  {
    icon: PauseCircleIcon,
    title: "Intercept & Tamper",
    description:
      "Pause traffic mid-flight. Edit raw request/response headers and bodies before they resolve.",
  },
  {
    icon: ArrowsClockwiseIcon,
    title: "Repeater & Scripting",
    description:
      "Replay requests, re-execute sockets, and run custom sandboxed JavaScript pre-request and test scripts.",
  },
  {
    icon: SwordIcon,
    title: "Invoker Fuzzer",
    description:
      "Run concurrent fuzzer campaigns with marked request payload positions and processing pipelines.",
  },
  {
    icon: PinwheelIcon,
    title: "Workflow Automation",
    description:
      "Build visual node-based automation pipelines using triggers, conditions, and actions.",
  },
  {
    icon: GlobeIcon,
    title: "Browser Crawler",
    description:
      "Automated BFS crawler that maps target directories and surfaces AI-categorized severity insights.",
  },
  {
    icon: FileTextIcon,
    title: "Documents & Evidence",
    description:
      "Write markdown reports using specialized templates and link captured HTTP transactions as evidence.",
  },
  {
    icon: BroadcastIcon,
    title: "OOB Listener",
    description:
      "Generate temporary lookup domains to capture out-of-band DNS, HTTP, and SMTP transactions.",
  },
  {
    icon: BugIcon,
    title: "Debugger & Regression",
    description:
      "Triage chronological proxy logs and build/run automated UI test integration suites.",
  },
  {
    icon: SparkleIcon,
    title: "AI Assistant",
    description:
      "Get contextual suggested payloads, endpoint summaries, and remediation advice.",
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
          "max-w-7xl"
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
              Modern web application testing is fragmented. hexbuffer brings it all
              into one workspace.
            </p>
          </div>

          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-2 lg:grid-cols-2",
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
                      "rounded-lg border border-border bg-muted/60",
                      // Interactive & States
                      "group-hover:border-emerald-500/40 transition-colors"
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