"use client";

import Link from "next/link";
import { GithubLogoIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
import { PulseTriangle } from "@/components/pulse-triangle";

const navItems = [
  { label: "Docs", href: "/docs" },
  // { label: "Buy License", href: "/payment" },
  { label: "Blogs", href: "/blogs" }
  // { label: "Release Notes", href: "/release-notes" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <div className="flex min-h-13 items-center justify-between px-4 py-2">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <PulseTriangle />
            <span className="truncate font-mono text-sm font-semibold">hexbuffer</span>
            <span className="text-[10px] border border-border font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              Early version</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5" asChild>
              <a
                href="https://github.com/arhamymr/hexbuffer"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon className="size-4" />
                <span>Star us on GitHub</span>
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/downloads">Download</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" asChild>
              <a
                href="https://github.com/arhamymr/hexbuffer"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
              >
                <GithubLogoIcon className="size-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <XIcon className="size-5" /> : <ListIcon className="size-5" />}
            </Button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className={`border-t border-border bg-background px-4 py-3 md:hidden ${menuOpen ? "block" : "hidden"
            }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/arhamymr/hexbuffer"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              <GithubLogoIcon className="size-5" />
              <span>Star us on GitHub</span>
            </a>
            <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
              <Link href="/downloads" onClick={() => setMenuOpen(false)}>
                Download
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
