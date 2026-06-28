import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Search, Filter, Table2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "HTTP & WebSocket History — hexbuffer Docs",
  description:
    "Learn how to view, filter, and inspect captured HTTP and WebSocket traffic in hexbuffer.",
};

export default function HistoryDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="HTTP & WebSocket History" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">HTTP & WebSocket History</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Inspect all inbound and outbound traffic captured by the proxy. 
            Analyze parameters, view live WebSocket frames, filter noise, and send 
            interesting requests to other tools for targeted testing.
          </p>

          <div className="mb-12 overflow-hidden rounded-lg border border-border">
            <Image
              src="/docs/overview-live-traffic.png"
              alt="HTTP History overview"
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
              Open the history logs whenever you want to inspect details of requests 
              dispatched by the target application during normal usage. It is the core starting point 
              for discovering API paths, identifying state-altering endpoints, studying cookies, and 
              checking response headers.
            </p>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-medium mb-3">Basic Workflow</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Toggle the proxy active and interact with the target web app.</p>
                <p>2. Select the **HTTP History** page to view raw requests/responses.</p>
                <p>3. Select the **WebSocket History** page to watch live connection handshakes and messages.</p>
                <p>4. Right-click any log row to copy the URL, request as cURL, or send to **Repeater** or **Invoker**.</p>
              </div>
            </div>
          </section>

          {/* HTTP History */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Table2 className="size-5 text-muted-foreground" />
              HTTP History Table
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The main table lists every request captured. Easily check parameters like status codes, request length, response size, and MIME content types.
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
                    ["Time", "The exact timestamp the packet reached the proxy listener."],
                    ["Method", "The HTTP request verb (GET, POST, PUT, DELETE, etc.)."],
                    ["Host", "The target destination server host domain."],
                    ["Path", "The query path of the request URL."],
                    ["Status", "The numerical HTTP response status code (e.g. 200, 302, 403, 500)."],
                    ["Size", "The size of the response payload in bytes."],
                    ["MIME Type", "Content headers parsed from the server response (HTML, JSON, CSS, images)."],
                  ].map(([col, desc]) => (
                    <tr key={col} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-mono text-xs">{col}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Filter className="size-5 text-muted-foreground" />
              Traffic Filters
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Narrow down your scope using the filters toolbar at the top:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Text Search", "Search for matching substrings within URLs, request/response headers, or text bodies."],
                ["Method Toggles", "Checkbox switches to show/hide specific methods like POST, GET, PUT, or DELETE."],
                ["Status Toggles", "Quick switches to isolate success (2xx), redirection (3xx), client error (4xx), or server error (5xx) responses."],
                ["Scope Filtering", "Limit shown requests only to defined targets or workspaces, hiding third-party noise."],
                ["Controls", "Pause the incoming logs stream to analyze static rows, refresh items, or clear logs entirely."],
              ].map(([filter, desc]) => (
                <div key={filter} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{filter}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WebSocket History */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Globe className="size-5 text-muted-foreground" />
              WebSocket History
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For applications using dynamic connection sockets, the WebSocket History page displays:
            </p>
            <div className="rounded-lg border border-border p-4 bg-card mb-4">
              <h3 className="text-sm font-medium mb-2">Connection Log details</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Review connection target URLs, total sent/received message count, and last activity timestamps.
              </p>
              <h3 className="text-sm font-medium mb-2">Message Frames Stream</h3>
              <p className="text-sm text-muted-foreground">
                Watch inbound (downstream) and outbound (upstream) message frames with exact timestamps, sizes, and a JSON/Raw payload inspector drawer.
              </p>
            </div>
          </section>

          {/* Inspector */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              Burp-Style Request Inspector
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Clicking any request row opens a tabbed details side panel:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-sm text-muted-foreground">
              <li>**Raw**: Display raw, colorized HTTP syntax for the request and response.</li>
              <li>**Headers**: A tabular list of request and response headers for easy identification of cookies and security headers.</li>
              <li>**Body**: Beautifully formatted views for JSON, XML, form parameters, or previewable HTML content.</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
