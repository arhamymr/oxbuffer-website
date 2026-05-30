import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b fixed top-0 border-border w-full z-10 bg-background">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold font-mono text-lg">0xbuffer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#audience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Who Is It For</a>
          <Link href="/release-notes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Release Notes</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <ThemeToggle />
          <Button size="sm">Download</Button>
        </nav>
      </div>
    </header>
  );
}