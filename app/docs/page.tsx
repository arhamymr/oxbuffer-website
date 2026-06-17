import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Eye, Globe, Pause, Wrench, Crosshair, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation — hexbuffer",
  description: "Usage guides for common hexbuffer web application security testing workflows.",
};

const docs = [
  {
    icon: Eye,
    title: "Live Traffic",
    description:
      "Watch captured HTTP and WebSocket traffic, filter noisy sessions, and inspect the requests and responses that matter.",
    href: "/docs/live-traffic",
  },
  {
    icon: Globe,
    title: "Browser Automation",
    description:
      "Crawl an authorized target, review discovered pages, and use AI-assisted notes to guide your next testing steps.",
    href: "/docs/browser-automation",
  },
  {
    icon: Pause,
    title: "Intercept",
    description:
      "Pause selected traffic, edit requests or responses, then forward or drop them while testing application behavior.",
    href: "/docs/intercept",
  },
  {
    icon: Crosshair,
    title: "Invoker",
    description:
      "High-speed parameter mining and fuzzing. Mark payload positions, load wordlists, and run concurrent attacks.",
    href: "/docs/invoker",
  },
  {
    icon: Wrench,
    title: "Tools",
    description:
      "Use everyday testing helpers for encoding, decoding, hashing, and checking reachable TCP services.",
    href: "/docs/tools",
  },
];

export default function DocsIndex() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Documentation" />
          <h1 className="text-4xl font-normal mb-3 mt-20">Documentation</h1>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Practical guides for using hexbuffer during web application recon,
            testing, and review. Pick a workflow below and follow the steps
            inside the app.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-card/70"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                    <doc.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="flex items-center gap-2 font-medium text-foreground mb-1.5">
                      {doc.title}
                      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
