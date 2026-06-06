import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  ArrowLeft,
  Globe,
  Settings2,
  Play,
  Pause,
  RotateCcw,
  Square,
  Brain,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Browser Automation — 0xbuffer Docs",
  description:
    "Learn how to configure, run, review, and troubleshoot authorized browser crawls in 0xbuffer.",
};

export default function BrowserAutomationDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Browser Automation" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Browser Automation</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Crawl an authorized target to discover pages, forms, APIs, and
            points of interest. Use the results to decide where to test next,
            then review notes and activity as the crawl runs.
          </p>

          {/* Safety Notice */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-5 mb-12">
            <div className="flex items-start gap-3">
              <Shield className="size-5 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Authorized Use Only
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-200/70">
                  Only scan targets you own or are authorized to assess.
                  Unauthorized scanning may violate terms of service or
                  applicable laws.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Reading Crawl Results</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Browser Automation is organized into panels so you can follow
              progress while reviewing discovered pages. Start with the crawl
              tree, then open page details and insights for anything that looks
              important.
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden mb-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Panel</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Crawl Tree", "Shows discovered pages and their status so you can see what was visited, skipped, or still pending."],
                    ["Page Detail", "Shows the selected page screenshot, page summary, discovered APIs, forms, and useful metadata."],
                    ["AI Insights", "Highlights pages, patterns, or behaviors that may deserve manual review."],
                    ["Crawl Overview", "Summarizes pages visited, URLs found, errors, blocked pages, forms, and session time."],
                    ["Activity Log", "Lists crawl events so you can understand what happened during the session."],
                  ].map(([panel, desc]) => (
                    <tr key={panel} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{panel}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Crawl Controls */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Play className="size-5 text-muted-foreground" />
              Crawl Controls
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Play,
                  title: "Start (Headless)",
                  desc: "Runs the crawl in the background. Use this for routine discovery when you do not need to watch the browser.",
                },
                {
                  icon: Globe,
                  title: "Start Visible",
                  desc: "Shows the browser while it crawls. Use this when login, consent prompts, or unexpected page behavior may need attention.",
                },
                {
                  icon: Pause,
                  title: "Pause",
                  desc: "Temporarily stops new crawl activity while keeping the current session available.",
                },
                {
                  icon: RotateCcw,
                  title: "Resume",
                  desc: "Continues from the paused point after you have reviewed progress or handled a prompt.",
                },
                {
                  icon: Square,
                  title: "Stop",
                  desc: "Ends the crawl when you have enough coverage or want to start again with new settings.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-lg border border-border p-4 flex gap-3">
                  <Icon className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Configuration */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Settings2 className="size-5 text-muted-foreground" />
              Configuration
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Configure the crawl before starting. Begin with a narrow scope,
              confirm the results, then expand depth or page limits when you
              are confident the target and settings are correct.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Target URL", "The page where the crawl should begin. Use only targets you own or are authorized to test."],
                ["Max Depth", "How many link levels the crawler should follow from the starting page."],
                ["Max Pages", "The maximum number of pages to visit before stopping."],
                ["Delay", "How long to wait between page visits. Increase this for sensitive or slower targets."],
                ["Timeout", "How long to wait for a page before treating it as failed."],
                ["Network Settle", "Extra wait time for late-loading API calls or dynamic content."],
                ["Exclude Paths", "Paths to skip, such as logout routes, destructive actions, or out-of-scope areas."],
                ["Capture Screenshots", "Save a visual record of visited pages for review."],
                ["Capture Rendered HTML", "Save the page content after it loads so you can inspect dynamic pages later."],
              ].map(([field, desc]) => (
                <div key={field} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{field}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Insights */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Brain className="size-5 text-muted-foreground" />
              AI Insights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AI Insights help you triage crawl results. Treat them as review
              prompts, not final findings: open the related page, confirm the
              behavior manually, and mark the insight reviewed when you are done.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Severity Levels</h3>
                <p className="text-sm text-muted-foreground">
                  Filter by severity to focus on the most important notes first,
                  then work through lower-priority observations as time allows.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Interesting Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Review pages that contain forms, unusual responses, exposed
                  data, login flows, admin paths, or other signals worth testing.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Review Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Mark an insight reviewed after you have checked it. Leave it
                  unreviewed when it still needs manual testing.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Use Evidence</h3>
                <p className="text-sm text-muted-foreground">
                  Open the page detail, screenshot, captured APIs, and traffic
                  before turning any note into a report item.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Common Crawl Issues</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Few pages found", "Increase max depth or max pages, and make sure important links are reachable from the target URL."],
                ["Many errors", "Increase timeout, slow down the delay, or use Start Visible to see whether the site is blocking automation."],
                ["Login required", "Use a visible crawl when manual sign-in or multi-factor prompts are part of the authorized workflow."],
                ["Too much noise", "Add exclude paths for logout, account deletion, large files, and areas outside your testing scope."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
