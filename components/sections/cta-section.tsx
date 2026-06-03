"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Hexagon } from "lucide-react";

const highlights = [
  { icon: Hexagon, label: "Always improving" },
  { icon: Heart, label: "Open to feedback" },
];

export function CtaSection() {
  return (
    <section className="py-24 px-4 border-t border-border relative overflow-hidden">
      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative">
        <div className="rounded-xl border border-border bg-card p-10 md:p-14">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Left: copy */}
            <div>
              <p className="text-sm text-green-500 mb-3 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Built with care
              </p>
              <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">
                Try 0xbuffer on your next target.
              </h2>
              <p className="text-muted-foreground max-w-md">
                A desktop app for web app recon, traffic inspection, and security testing — all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground">
                {highlights.map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5">
                    <item.icon className="size-3.5" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col items-stretch gap-3 min-w-[220px]">
              <Button size="lg" className="gap-2 w-full" asChild>
                <a href="/downloads">
                  Download for macOS
                  <ArrowRight className="size-4" />
                </a>
              </Button>

              <Button size="lg" variant="outline" className="gap-2 w-full" disabled>
                Windows — Coming Soon
              </Button>

              <p className="text-[11px] text-muted-foreground text-center mt-1">
                macOS available now — Windows coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
