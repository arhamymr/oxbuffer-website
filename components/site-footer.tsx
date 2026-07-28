"use client";

import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { PulseTriangle } from "./pulse-triangle";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50 backdrop-blur-sm pt-16 pb-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* 1 Content on Left: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PulseTriangle size="small" />
              <span className="font-mono text-base font-semibold tracking-tight">
                hexbuffer
              </span>
              <span className="text-[10px] border border-border font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Early version
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desktop application and developer tooling for web application security testing, traffic interception, automated recon, and report generation.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/arhamymr/hexbuffer"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 border border-border px-3 py-1.5 rounded-md transition-colors"
              >
                <GithubLogoIcon className="size-4" />
                <span>Star us on GitHub</span>
              </a>
            </div>
          </div>

          {/* 2 Content on Right */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Product & Tools
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/downloads" className="hover:text-foreground transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/proxy" className="hover:text-foreground transition-colors">
                  Hexbuffer MITM Proxy
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-foreground transition-colors">
                  Blogs & Notes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:arhamymr@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  Feedback & Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arhamymr/hexbuffer"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} hexbuffer. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px]">Active Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
