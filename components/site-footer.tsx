import { PulseTriangle } from "./pulse-triangle";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <PulseTriangle size="small" />
            <span className="font-mono text-sm">0xbuffer  ✦  @{new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-muted-foreground sm:flex-row sm:gap-4">
            <Link
              href="/privacy-policy"
              className="text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-sm ">
              Contact Support :   {" "}
              <a
                href="mailto:arhamymr@gmail.com"
                className="underline-offset-4 transition-colors hover:text-foreground"
              >
                arhamymr@gmail.com
              </a>
            </span>
          </div>

        </div>
      </div>
    </footer>
  ); 
}
