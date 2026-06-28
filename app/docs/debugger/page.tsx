import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Bug, Play, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Debugger & Regression — hexbuffer Docs",
  description:
    "Learn how to inspect proxy events and run automated integration and UI test suites in hexbuffer.",
};

export default function DebuggerDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Debugger & Regression" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Debugger & Regression</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Triage system execution logs and run automated integration or UI test regression suites.
          </p>

          {/* Workflow Debugger */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Bug className="size-5 text-muted-foreground" />
              Workflow Debugger
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The workflow debugger is a resizable, double-panel viewer designed to inspect proxy operations and workflow logs.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>**Event Timeline**: Lists events, timestamps, latency metrics, and execution status.</li>
              <li>**Payload Inspector**: Displays parsed JSON configurations, active environment values, and response dumps for the selected timeline event.</li>
            </ul>
          </section>

          {/* Regression Runner */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <CheckSquare className="size-5 text-muted-foreground" />
              Automated Regression Tests
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Write, edit, and launch integration test suites against target web applications:
            </p>
            <div className="rounded-lg border border-border p-4 bg-muted/20 text-sm text-muted-foreground mb-4">
              <p className="font-semibold text-foreground mb-1">Supported Steps:</p>
              <p>Setup test flows using browser actions: **navigate**, **click**, **fill**, **wait**, **screenshot**, assertions (**assert-visible**, **assert-text**, **assert-url**), and custom **ai-verify** calls.</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Watch live step run durations, review screenshots from the run, and check historical run logs to verify application consistency.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
