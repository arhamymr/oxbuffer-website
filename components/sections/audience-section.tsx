"use client";

import { CrosshairIcon, BugIcon, MicroscopeIcon, WrenchIcon } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const audience = [
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
    <section id="audience" className="py-24 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-normal mb-3">Who Is It For?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built for anyone who needs to inspect, test, and document web applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {audience.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
            <div
              className="group min-h-25 flex gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-border hover:bg-card/70"
            >
              <div className="size-10 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center mt-0.5">
                <item.icon className="size-5 text-muted-foreground" />
              </div>
              <div>

                <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
