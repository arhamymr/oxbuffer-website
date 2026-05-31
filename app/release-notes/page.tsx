import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import releases from "@/data/releases.json";

export const metadata: Metadata = {
  title: "Release Notes — 0xbuffer",
  description: "See what's new in 0xbuffer — the all-in-one security testing workstation.",
};

export default function ReleaseNotes() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh]">
        <div className="container mx-auto max-w-3xl">
          <PageBreadcrumb current="Release Notes" />
          <h1 className="text-4xl font-normal mb-2 mt-10">Release Notes</h1>
          <p className="text-muted-foreground mb-12">
            Track what&apos;s new and improved in each version of 0xbuffer.
          </p>

          <div className="space-y-12">
            {releases.map((release) => (
              <div key={release.version}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-semibold">{release.version}</h2>
                  {release.latest && <Badge variant="secondary">Latest</Badge>}
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                </div>
                <ul className="space-y-2">
                  {release.changes.map((change) => (
                    <li key={change} className="flex items-start gap-2 text-muted-foreground">
                      <Separator orientation="vertical" decorative className="mt-2 h-3 w-px" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-12" />

          <p className="text-center text-sm text-muted-foreground">
            More releases coming soon. Stay tuned.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
