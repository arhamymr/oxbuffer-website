"use client";

import { WifiOff, Shield, Laptop } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const perks = [
  { icon: WifiOff, label: "Entirely local — runs on your machine, not on our servers" },
  { icon: Shield, label: "No accounts — install and start working immediately" },
  { icon: Laptop, label: "Zero cloud — everything stays on your machine" },
];

export function OfflineSection() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">
            A local-first desktop app
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            0xbuffer runs entirely on your machine. No cloud, no accounts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <ScrollReveal key={perk.label} delay={i * 0.1}>
            <div
              className="rounded-lg border border-border bg-card p-6 flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <perk.icon className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{perk.label}</p>
            </div>
            </ScrollReveal>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
