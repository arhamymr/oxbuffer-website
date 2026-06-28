"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AsteriskIcon, CubeIcon } from "@phosphor-icons/react";
import { TrafficIllustration } from "@/components/traffic-illustration";
import { ShinyText } from "@/components/shiny-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HeroSection() {
  return (
    <section className="py-16 px-4 mt-10 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
        <div className="rounded-xl relative border border-border h-120 overflow-hidden bg-card p-8 md:p-12">

          <div className="flex items-start flex-col justify-center h-full z-10">
            <div className="mb-3 flex items-center justify-center gap-1 text-green-500 lg:justify-start">
              <AsteriskIcon className="hidden md:block animate-spin size-5 [animation-duration:2s]" />
              <ShinyText
                text="Testing, Recon, and Reporting"
                className="text-sm md:text-md"
                speed={2}
                shineColor="#bbf7d0"
              />
            </div>
            <h1 className="text-2xl lg:text-3xl max-w-sm !font-normal tracking-tight mb-6">
              Testing tools for security teams, developers, and QA
            </h1>
            <p className="text-md md:text-md text-muted-foreground max-w-sm mb-10">
              hexbuffer helps inspect traffic, test APIs, automate workflows, and document findings faster with AI-powered analysis
            </p>
            <Link href="/#features">
              <Button size="lg" className="gap-2">
                See Features
                <CubeIcon className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="hidden lg:block absolute w-[1000px] h-[620px] z-9 scale-[0.8] top-0 -right-[480px]">
            <TrafficIllustration />
          </div>

        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
