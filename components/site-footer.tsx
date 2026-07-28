"use client";

import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { PulseTriangle } from "./pulse-triangle";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50 backdrop-blur-sm pt-14 pb-10 px-4">
      <div className="mx-auto max-w-4xl w-full">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left Column: Brand & Mission */}
          <div className="md:col-span-6 space-y-3.5 pr-0 md:pr-4">
            <div className="flex items-center gap-2">
              <PulseTriangle size="small" />
              <span className="font-mono text-base font-semibold tracking-tight">
                hexbuffer
              </span>
              <span className="text-xs border border-border/80 font-medium uppercase tracking-wider text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                Early version
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Desktop application and developer tooling for web application
              security testing, traffic interception, automated recon, and
              report generation.
            </p>
            <div className="pt-1">
              <Button variant="outline" size="sm" className="gap-2 text-sm" asChild>
                <a
                  href="https://github.com/arhamymr/hexbuffer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogoIcon className="size-4" />
                  <span>Star us on GitHub</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column 1: Product & Tools */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Product & Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/downloads"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/proxy"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Hexbuffer MITM Proxy
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Blogs & Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column 2: Legal & Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:arhamymr@gmail.com"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Feedback & Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arhamymr/hexbuffer"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-5 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} hexbuffer. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs">Active Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
