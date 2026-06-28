"use client";

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
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const features = [
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
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-normal mb-3">
              What Can You Do?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Modern web security testing is fragmented. hexbuffer brings it all
              into one workspace.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <div className="group flex gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-border hover:bg-card/70">
                  <div className="size-10 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center mt-0.5">
                    <feature.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground mb-0.5 flex items-center gap-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
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