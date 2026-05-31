import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Downloads — 0xbuffer",
  description: "Download 0xbuffer for macOS. Windows coming soon.",
};

export default function Downloads() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh]">
        <div className="container mx-auto max-w-3xl">
          <PageBreadcrumb current="Downloads" />
          <h1 className="text-4xl mb-2 mt-20">Downloads</h1>
          <p className="text-muted-foreground mb-8">
            Choose your platform and start testing.
          </p>

          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <a
                href={process.env.NEXT_PUBLIC_DIST_URL}
                className="underline underline-offset-4 hover:text-primary transition-colors"
                target="_blank"
              >
                macOS Download
              </a>
              <Badge variant="secondary">Latest</Badge>
            </li>
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
