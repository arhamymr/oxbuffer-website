import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  ArrowLeft,
  Crosshair,
  List,
  Settings,
  Target,
  Play,
  Square,
  Filter,
  Eye,
  Search,
  FolderOpen,
  ChevronDown,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Invoker — hexbuffer Docs",
  description:
    "High-speed parameter mining and fuzzing — mark payload positions, configure attacks, and inspect results.",
};

export default function InvokerDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Invoker" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Invoker</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            High-speed parameter mining and fuzzing. Mark payload positions in
            raw HTTP requests with § markers, load wordlists, and run
            concurrent attacks with real-time progress and detailed results.
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
                  Only run invoker tests against systems you own or are
                  explicitly authorized to assess. Unauthorized attempts can be
                  illegal and may trigger account lockouts.
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Invoker is a parameter fuzzing engine similar to Burp
              Suite&apos;s Intruder. It takes a base HTTP request, marks one or
              more payload positions, assigns wordlists to each position, and
              sends requests with every combination at high concurrency —
              streaming results back to the UI in real time.
            </p>
            <div className="rounded-lg border border-border bg-card p-5 mb-4">
              <h3 className="text-sm font-medium mb-3">Attack Flow</h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>Craft base request → Mark positions with § delimiters →</p>
                <p className="pl-4">Assign payloads per position → Configure concurrency & delay →</p>
                <p className="pl-4">Start attack → Tauri backend generates combinations →</p>
                <p className="pl-4">Results stream via Tauri events → Table displays in real time</p>
              </div>
            </div>
          </section>

          {/* Layout */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Page Layout</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-2">Left Panel — Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Request editor with Monaco-based text input, payload
                  configuration with tabs per position, attack parameters
                  (delay). Start/Stop controls and real-time progress bar.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium mb-2">Right Panel — Results</h3>
                <p className="text-sm text-muted-foreground">
                  Scrollable results table with status/payload filters.
                  Columns: index, payload values, URL, HTTP status badge,
                  response length, response time. Click a row to open the
                  result drawer.
                </p>
              </div>
            </div>
          </section>

          {/* Configuration Tabs */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Settings className="size-5 text-muted-foreground" />
              Configuration
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each attack tab has its own configuration with three sub-tabs:
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                {
                  icon: Crosshair,
                  title: "Request",
                  desc: "Raw HTTP request editor with syntax highlighting. Select text and click Mark Target to wrap it in § delimiters. Supports pasting from repeater or raw import dialog.",
                },
                {
                  icon: List,
                  title: "Payloads",
                  desc: "Per-position payload configuration. Simple list editor, number range generator, predefined presets browser, and file loader.",
                },
                {
                  icon: Settings,
                  title: "Attack",
                  desc: "Request delay in milliseconds between each attack request.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-lg border border-border p-4">
                  <div className="flex size-8 items-center justify-center rounded-md border border-border bg-muted mb-3">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Request Editor */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Crosshair className="size-5 text-muted-foreground" />
              Request Editor & Marking
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The base HTTP request is edited in a Monaco text editor. Payload
              positions are marked with § delimiters — select any text (URL
              path, query parameter, header value, body content) and click
              &quot;Mark Target&quot; to wrap it.
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden mb-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Action</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Mark Target", "Wraps selected text with § delimiters, creating a payload position"],
                    ["Import Raw", "Opens a dialog to paste a complete raw HTTP request with existing § markers"],
                    ["Send from Repeater", "The Repeater page can send its current request as the base for a new attack tab"],
                    ["Parse & Sync", "The editor continuously parses the raw text. § markers are detected and positions auto-synced to the Payloads tab"],
                  ].map(([action, desc]) => (
                    <tr key={action} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{action}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payload Types */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <List className="size-5 text-muted-foreground" />
              Payload Types
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-medium mb-2">Simple List</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  One payload per line in a Monaco text editor. Supports
                  loading from predefined presets, local files (.txt, .lst,
                  .wordlist), or manual input.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FolderOpen className="size-3.5" />
                  <span>Browse Presets button opens categorized payload library</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-medium mb-2">Number Range</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Generates sequential numeric payloads with configurable
                  start, end, step, padding width, and custom format string.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {["Start", "End", "Step", "Padding"].map((field) => (
                    <span key={field} className="rounded border border-border bg-muted px-2 py-0.5 text-xs">
                      {field}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Format supports {"{}"} placeholders and {"{:0N}"} zero-padding
                  (e.g. {"{:04}"} → 0001, 0002, …)
                </p>
              </div>
            </div>
          </section>

          {/* Predefined Payloads */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Predefined Payloads</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A bundled library of wordlists organized by category, accessible
              via the &quot;Browse Presets&quot; button in the Payloads tab.
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Presets</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["BurpSuite ParamMiner", "lowercase-headers (1,102), uppercase-headers (1,102)", "Header parameter discovery — fuzz for hidden HTTP headers"],
                    ["DNS", "subdomains-top1million (5K–110K variants), services-names (1,419)", "Subdomain enumeration and service discovery"],
                    ["API", "api-endpoints (288–10,879), actions, objects, Salesforce Aura objects", "API endpoint fuzzing with real-world wordlists"],
                    ["usernames", "top-usernames-shortlist (17)", "Common username brute-forcing"],
                    ["Logins", "Logins.fuzz.txt (89)", "Login path discovery"],
                  ].map(([cat, presets, use]) => (
                    <tr key={cat} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{cat}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{presets}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Attack Execution */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Play className="size-5 text-muted-foreground" />
              Attack Execution
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Target,
                  title: "Attack Mode",
                  desc: "Currently supports Sniper mode — one payload position is tested at a time with all values from its wordlist.",
                },
                {
                  icon: Play,
                  title: "Concurrency",
                  desc: "Defaults to 10 concurrent requests. Configurable via the attack configuration.",
                },
                {
                  icon: Square,
                  title: "Stop / Cancel",
                  desc: "Click Stop to cancel an in-progress attack. The Tauri backend is signaled to abort via stop_intruder_attack.",
                },
                {
                  icon: ChevronDown,
                  title: "Progress",
                  desc: "Real-time progress bar updates via Tauri events (intruder-progress). Shows current/total and percentage.",
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

          {/* Results */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Eye className="size-5 text-muted-foreground" />
              Results
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Results stream into the table as they arrive from the backend.
              Each result row shows:
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Column</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["#", "Sequential index of the request"],
                    ["Payload", "The substituted payload value(s) for this request"],
                    ["URL", "The actual URL sent (with payload substituted)"],
                    ["Status", "HTTP status code badge — green (2xx), red (4xx+), gray (other)"],
                    ["Length", "Response body length in bytes"],
                    ["Time", "Response time in milliseconds"],
                  ].map(([col, desc]) => (
                    <tr key={col} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-mono text-xs">{col}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mb-3">Result Detail Drawer</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Click any result row to open a bottom drawer with a split-pane
              view:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-sm font-medium mb-1">Modified Request</h4>
                <p className="text-sm text-muted-foreground">
                  Shows the exact raw HTTP request sent, with § markers
                  replaced by the actual payload values for this iteration.
                  Read-only Monaco editor.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-sm font-medium mb-1">Response</h4>
                <p className="text-sm text-muted-foreground">
                  Full raw HTTP response with pretty-printed JSON body.
                  Includes status, headers, timing, and error details if the
                  request failed.
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
                ["Status Filter", "Text input to filter results by HTTP status code (e.g. \"200\", \"404\")"],
                ["Payload Filter", "Text input to filter by substituted payload value"],
                ["Clear Results", "Removes all results for the active tab and deselects any selected result"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tab Management */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Tab Management</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Multiple attack configurations can run independently in separate
              tabs. Each tab maintains its own request, payloads, results, and
              running state.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Add Tab (Attack N)",
                "Rename Tab",
                "Close Tab (stops attack if running)",
              ].map((action) => (
                <span
                  key={action}
                  className="rounded-md border border-border bg-muted px-3 py-1.5 text-sm"
                >
                  {action}
                </span>
              ))}
            </div>
          </section>

          {/* Backend */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Backend Integration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The attack engine runs on the Rust/Tauri backend:
            </p>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-3 text-sm">
                <div>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">start_intruder_attack(config)</code>
                  <span className="text-muted-foreground"> — Begins attack, returns a unique attackId</span>
                </div>
                <div>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">stop_intruder_attack(attackId)</code>
                  <span className="text-muted-foreground"> — Cancels an in-progress attack</span>
                </div>
                <div>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">intruder-progress-{"{attackId}"}</code>
                  <span className="text-muted-foreground"> — Tauri event with current/total progress</span>
                </div>
                <div>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">intruder-result-{"{attackId}"}</code>
                  <span className="text-muted-foreground"> — Tauri event per result, streamed to table</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Event listeners are registered per attackId and automatically
              cleaned up when an attack completes or is stopped.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
