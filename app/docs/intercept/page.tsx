import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  ArrowLeft,
  Code2,
  List,
  Trash2,
  Flag,
  ShieldOff,
  Play,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Intercept — hexbuffer Docs",
  description:
    "Learn how to pause, inspect, edit, forward, and drop selected HTTP traffic in hexbuffer.",
};

export default function InterceptDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Intercept" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Intercept</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Pause selected HTTP traffic while you test. Inspect the message,
            change request or response content when needed, then forward it,
            drop it, or pause the response for another check.
          </p>

          <div className="mb-12 overflow-hidden rounded-lg border border-border">
            <Image
              src="/docs/overview-intercept.png"
              alt="Intercept overview"
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
              Use Intercept when you want to test how an application handles
              changed parameters, headers, cookies, methods, or response data.
              Capture only the hosts you are actively testing so unrelated
              traffic can continue normally.
            </p>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-medium mb-3">Workspace</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Message Editor</p>
                  <p>Review and edit the selected request or response before deciding what to do with it.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Paused Queue</p>
                  <p>See traffic waiting for your decision, choose a message, and use actions for capture, forward, or drop.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Request Editor */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Code2 className="size-5 text-muted-foreground" />
              Request Editor
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Select a paused item to load it into the editor. Make careful,
              intentional changes, then forward the message to continue the
              application flow.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Request or Response", "The label tells you whether you are editing traffic going to the server or back to the client."],
                ["Edit Raw Message", "Change paths, parameters, headers, cookies, body content, or response values before forwarding."],
                ["Enable or Disable", "Turn intercept mode on when testing, and turn it off when you want traffic to pass normally."],
                ["No Selection", "Choose an item from the paused queue before editing."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Queue Panel */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <List className="size-5 text-muted-foreground" />
              Intercept Queue
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The queue lists traffic waiting for your decision. Each row shows
              the direction, method or status, host, path, and capture time.
              Click a row to inspect it in the editor.
            </p>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Paused Count</h3>
                <p className="text-sm text-muted-foreground">
                  Shows how much traffic is waiting across your workspace and
                  in the current tab.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-1">Mode Indicator</h3>
                <p className="text-sm text-muted-foreground">
                  Shows whether matching traffic will be captured or allowed to
                  pass through without pausing.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-8">Context Menu Actions</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Play,
                  title: "Capture this host",
                  desc: "Adds the selected host to the active tab so future traffic from that host pauses for review.",
                },
                {
                  icon: Flag,
                  title: "Intercept response",
                  desc: "Forward the request now, then pause the server response before it reaches the app.",
                },
                {
                  icon: Trash2,
                  title: "Drop",
                  desc: "Discard the paused message when you intentionally want to block it.",
                },
                {
                  icon: ShieldOff,
                  title: "Don't capture this host",
                  desc: "Stop pausing traffic for that host and let matching items continue normally.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-lg border border-border p-4 flex gap-3">
                  <Icon className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{title}</h4>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Host Matching */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Choose What to Capture</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Capture rules keep Intercept focused. Use an exact host when you
              only want one domain, or a wildcard when the target uses multiple
              subdomains.
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Pattern</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Matches</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["example.com", "Capture traffic for example.com."],
                    ["*.example.com", "Capture traffic for subdomains such as app.example.com or api.example.com."],
                  ].map(([pattern, matches]) => (
                    <tr key={pattern} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-mono text-xs">{pattern}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{matches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tab Management */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Tab Management</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Use tabs to separate different hosts, workflows, or test cases.
              This helps you avoid mixing login traffic, API testing, and
              unrelated browsing in the same queue.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Add Tab", "Rename Tab", "Close Tab", "Close Tabs to Left", "Close Tabs to Right", "Add Tab for Host"].map((action) => (
                <span
                  key={action}
                  className="rounded-md border border-border bg-muted px-3 py-1.5 text-sm"
                >
                  {action}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Before closing a tab, make sure any paused messages in that tab
              have been forwarded, dropped, or are no longer needed.
            </p>
          </section>

          {/* Workflow */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Typical Workflow</h2>
            <div className="rounded-lg border border-border bg-card p-5">
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li><span className="text-foreground font-medium">Start the proxy</span> if not already running.</li>
                <li><span className="text-foreground font-medium">Enable Intercept</span> using the toggle switch.</li>
                <li><span className="text-foreground font-medium">Add capture hosts</span> from the queue or tab settings.</li>
                <li><span className="text-foreground font-medium">Browse or use browser automation</span> so matching traffic pauses.</li>
                <li><span className="text-foreground font-medium">Inspect</span> paused requests in the queue panel.</li>
                <li><span className="text-foreground font-medium">Edit</span> the raw request/response if modification is needed.</li>
                <li><span className="text-foreground font-medium">Forward</span> to send, or <span className="text-foreground font-medium">Drop</span> to discard.</li>
                <li>Use <span className="text-foreground font-medium">Intercept response</span> when you need to inspect or change the server response.</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
