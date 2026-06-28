import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, BookText, FileText, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Documents & Evidence — hexbuffer Docs",
  description:
    "Learn how to create markdown notes, manage saved API HTTP request/response evidence, and export PDF reports.",
};

export default function DocumentsDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Documents & Evidence" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Documents & Evidence</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Build clean markdown logs and structured security reports. Save raw request and response evidence directly into document sections.
          </p>

          {/* Specialized Templates */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <FileText className="size-5 text-muted-foreground" />
              Specialized Document Templates
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Get started quickly by selecting predefined templates for blank notes, developer code specs, QA testing guidelines, or security research reports.
            </p>
          </section>

          {/* Evidence API Entries */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <BookText className="size-5 text-muted-foreground" />
              API Evidence Log
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Integrate raw HTTP traffic directly into your notes. Keep records of payloads, headers, methods, and status codes inside an evidence sidebar. Re-fetch or edit entries directly from the Documents workspace.
            </p>
          </section>

          {/* Markdown & PDF Export */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Download className="size-5 text-muted-foreground" />
              Export & Preview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Edit in a clean, rich WYSIWYG markdown editor or toggle preview mode. Once notes are complete, export them as formatted PDF documents for final reports.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
