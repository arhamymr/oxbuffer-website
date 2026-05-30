import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Apple, Monitor, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads — 0xbuffer",
  description: "Download 0xbuffer for Windows and macOS.",
};

const downloads = [
  {
    os: "macOS",
    icon: Apple,
    arch: "Apple Silicon / Intel",
    version: "v0.1.0",
    size: "~85 MB",
    requirements: "macOS 12 (Monterey) or later",
    href: "#",
    latest: true,
  },
  {
    os: "Windows",
    icon: Monitor,
    arch: "x64",
    version: "v0.1.0",
    size: "~72 MB",
    requirements: "Windows 10 or later",
    href: "#",
    latest: true,
  },
];

export default function Downloads() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Downloads</h1>
          <p className="text-muted-foreground mb-12">
            Choose your platform and start testing.
          </p>

          <div className="space-y-6">
            {downloads.map(({ os: osName, icon: Icon, arch, version, size, requirements, href, latest }) => (
              <Card key={osName}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle>{osName}</CardTitle>
                          {latest && <Badge variant="secondary">Latest</Badge>}
                        </div>
                        <CardDescription className="space-y-0.5">
                          <span>{arch}</span>
                          <span className="mx-2">·</span>
                          <span>{version}</span>
                          <span className="mx-2">·</span>
                          <span>{size}</span>
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">{requirements}</p>
                      </div>
                    </div>
                    <Button size="lg" className="gap-2 shrink-0">
                      <Download className="size-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
