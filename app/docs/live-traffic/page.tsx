import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Search, Filter, Table2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Traffic — 0xbuffer Docs",
  description:
    "Learn how to view, filter, and inspect captured HTTP and WebSocket traffic in 0xbuffer.",
};

export default function LiveTrafficDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Live Traffic" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Live Traffic</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Watch HTTP and WebSocket traffic as it is captured. Use this page
            to spot interesting requests, narrow noisy sessions, and inspect
            the full request and response when something needs a closer look.
          </p>

          <div className="mb-12 overflow-hidden rounded-lg border border-border">
            <Image
              src="/docs/overview-live-traffic.png"
              alt="Live Traffic overview"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Overview */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">When to Use It</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Open Live Traffic when you want to understand what an application
              is sending and receiving while you browse, crawl, or test it.
              It is useful for finding API endpoints, confirming form
              submissions, checking authentication flows, and comparing normal
              traffic with suspicious behavior.
            </p>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-medium mb-3">Basic Workflow</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Start capturing traffic, then use the target application normally.</p>
                <p>2. Use search, filters, and target tabs to hide unrelated requests.</p>
                <p>3. Select a row to inspect the request, response, cookies, and body.</p>
                <p>4. Copy details, send the request to another tool, or clear traffic when finished.</p>
              </div>
            </div>
          </section>

          {/* Traffic Table */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Table2 className="size-5 text-muted-foreground" />
              HTTP Traffic Table
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The traffic table gives you a quick overview of each captured
              request. Start by scanning the host, path, method, status, and
              size columns to decide which requests deserve attention.
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Column</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Time", "When the request was captured. Sort by time to replay the session order."],
                    ["Method", "The HTTP method and response status, useful for spotting errors or state changes."],
                    ["Host", "The domain that received the request."],
                    ["Path", "The requested path. Use it to identify pages, API routes, and assets."],
                    ["Size", "How large the response was."],
                    ["Length", "How much data was sent in the request."],
                    ["MIME Type", "The response content type, such as JSON, HTML, image, or script."],
                  ].map(([col, desc]) => (
                    <tr key={col} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-mono text-xs">{col}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Select a Request</h3>
                <p className="text-sm text-muted-foreground">
                  Click any row to open its full details in the inspector. This
                  is the fastest way to review headers, cookies, request data,
                  and response content.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Use Row Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Right-click a row for actions such as copying details, sending
                  the request to another workflow, deleting a noisy item, or
                  focusing on a related host.
                </p>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Filter className="size-5 text-muted-foreground" />
              Filters
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Search", "Find matching hosts, paths, methods, or body text."],
                ["Method", "Show only the request methods you care about, such as POST or DELETE."],
                ["Status", "Focus on successful, redirected, client-error, or server-error responses."],
                ["HTTP/WebSocket", "Switch between normal HTTP traffic and WebSocket frame traffic."],
                ["Pause/Resume", "Pause the live list while you inspect current traffic, then resume capture."],
                ["Target Tabs", "Limit the table to one target or workflow when multiple sessions are active."],
                ["Clear All", "Remove captured traffic after you finish a session or want a clean start."],
              ].map(([filter, desc]) => (
                <div key={filter} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{filter}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Inspector */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              HTTP Inspector
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              After selecting a row, use the inspector to review exactly what
              was sent and what came back. This is where you confirm parameters,
              headers, cookies, redirects, error messages, and response bodies.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Request", "Response", "Cookies"].map((tab) => (
                <span
                  key={tab}
                  className="rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-mono"
                >
                  {tab}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Use the separate detail window when you want to compare one
              request against another workflow without losing your place.
            </p>
          </section>

          {/* WebSocket */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Globe className="size-5 text-muted-foreground" />
              WebSocket Traffic
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Switch to the WebSocket view when the application uses live
              updates, chat, collaboration, dashboards, or streaming data. Use
              direction, length, and payload preview to spot messages worth
              opening in the payload inspector.
            </p>
          </section>

          {/* Session Hygiene */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Keep Sessions Manageable</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Busy applications can generate a lot of traffic. Use pause when
              you need time to inspect, filter aggressively while testing a
              specific flow, and clear captured traffic before starting a new
              task so old requests do not distract you.
            </p>
            <div className="rounded-lg border border-border p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Tip: clear traffic only after saving or copying anything you
                still need. Clearing is useful for a fresh session, but it
                removes the captured items from the current workspace.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
