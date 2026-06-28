import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, LoaderPinwheel, Zap, GitBranch, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Workflow Automation — hexbuffer Docs",
  description:
    "Learn how to build, configure, and debug visual node-based execution flows using triggers, conditions, and actions.",
};

export default function AutomationDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Workflow Automation" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Workflow Automation</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Build and visual-edit automated testing workflows in a node canvas powered by React Flow.
          </p>

          {/* Node Categories */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <GitBranch className="size-5 text-muted-foreground" />
              Workflow Node Architecture
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Workflows are composed of three categories of nodes:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Triggers",
                  desc: "Start flow execution. Triggers include Crawl Finished, Cron Schedules, Manual Actions, Intercept Events, or Live traffic captures.",
                },
                {
                  title: "Conditions",
                  desc: "Evaluate routing paths. Match status codes, URLs, response body substrings, severity levels, or AI confidence thresholds.",
                },
                {
                  title: "Actions",
                  desc: "Execute operations. Send to Repeater, analyze with AI, log findings, run local shell scripts, start crawls, or dispatch external webhooks.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Execution Log */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Terminal className="size-5 text-muted-foreground" />
              Workflow Execution Logs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a workflow is running, monitor its live execution trace in the slide-up execution console. View status badges, variable dumps, shell script standard outputs, and assertion logs block-by-block.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
