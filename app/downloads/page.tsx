import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Apple, Monitor, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads — 0xbuffer",
  description: "Download 0xbuffer for macOS. Windows coming soon.",
};

const downloads = [
  {
    os: "macOS",
    icon: Apple,
    arch: "Apple Silicon / Intel",
    version: "v0.1.0",
    size: "~85 MB",
    requirements: "macOS 12 (Monterey) or later",
    href: "https://dist.0xbuffer.com/0xbuffer_0.1.0_aarch64.dmg",
    latest: true,
  },
  {
    os: "Windows",
    icon: Monitor,
    arch: "x64",
    version: "Coming Soon",
    size: "—",
    requirements: "Windows 10 or later",
    href: "#",
    latest: false,
    comingSoon: true,
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
            {downloads.map(({ os: osName, icon: Icon, arch, version, size, requirements, href, latest, comingSoon }) => (
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
                    {comingSoon ? (
                      <Button size="lg" className="gap-2 shrink-0" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                      <Button size="lg" className="gap-2 shrink-0" asChild>
                        <a href={href}>
                          <Download className="size-4" />
                          Download
                        </a>
                      </Button>
                    )}
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
