import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Arham — 0xbufferr",
  description: "Learn about Arham and the personal project behind 0xbufferr.",
};

export default function About() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="About" />
          <section className="text-center mb-16 min-h-[100vh]">
            <h1 className="text-4xl font-normal mb-4 mt-20">About Me</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m Arham, a Software Developer building 0xbufferr as my personal project.
              It is a space for experimenting with practical web application security workflows,
              developer tooling, and ideas that make technical work feel clearer and faster.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <a href="https://github.com/arhamymr" target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.threads.com/@arhamymr" target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  Threads
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
