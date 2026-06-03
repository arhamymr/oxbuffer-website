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
          <div className="flex gap-2 items-center h-5 text-muted-foreground">
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
