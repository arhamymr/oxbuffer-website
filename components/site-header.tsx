"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { PulseTriangle } from "@/components/pulse-triangle";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Who Is It For", href: "/#audience" },
  { label: "Release Notes", href: "/release-notes" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex min-h-13 items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <PulseTriangle size="small" />
          <span className="truncate font-mono text-sm font-semibold">0xbuffer</span>
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
          <ThemeToggle />
          <Button variant={"outline"} size="sm" asChild>
            <Link href="/downloads">Download</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`border-t border-border bg-background px-4 py-3 md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-1">
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
          <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
            <Link href="/downloads" onClick={() => setMenuOpen(false)}>
              Download
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
