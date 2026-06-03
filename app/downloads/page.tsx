import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "./install-command";

export const metadata: Metadata = {
  title: "Downloads — 0xbuffer",
  description: "Download 0xbuffer with the official install script.",
};

export default function Downloads() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Downloads" />
          <h1 className="text-4xl mb-2 mt-20">Downloads</h1>
          <p className="text-muted-foreground mb-8">
            Install the latest 0xbuffer distribution from the terminal.
          </p>

          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg">macOS</h2>
              <Badge variant="secondary">Latest</Badge>
            </div>
            <InstallCommand />
          </div>

          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-muted-foreground">Windows</span>
              <Badge variant="secondary">Coming soon</Badge>
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
