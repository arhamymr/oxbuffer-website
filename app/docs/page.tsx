import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  Home,
  ArrowUpDown,
  LoaderPinwheel,
  AppWindow,
  PauseCircle,
  RotateCw,
  Hexagon,
  BookText,
  Binary,
  Radio,
  Bug,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation — hexbuffer",
  description: "Usage guides for common hexbuffer web application security testing workflows.",
};

const docs = [
  {
    icon: Home,
    title: "Overview & Workspaces",
    description:
      "Get familiar with the main launcher dashboard, persistent widgets, and target collection workspaces.",
    href: "/docs/overview",
  },
  {
    icon: ArrowUpDown,
    title: "HTTP & WebSocket History",
    description:
      "Watch captured traffic streams, configure target filtering rules, and inspect raw request and response data.",
    href: "/docs/live-traffic",
  },
  {
    icon: PauseCircle,
    title: "Intercept & Breakpoints",
    description:
      "Pause selected traffic flows, edit header/body parameters mid-flow, and forward or drop requests interactively.",
    href: "/docs/intercept",
  },
  {
    icon: RotateCw,
    title: "Repeater & Scripting",
    description:
      "Manually craft requests, re-execute WebSocket sessions, and write sandboxed JS Pre-Request and Test scripts.",
    href: "/docs/repeater",
  },
  {
    icon: Hexagon,
    title: "Invoker Fuzzer",
    description:
      "Run concurrent fuzzing attacks. Setup payload positions in raw requests and manage payload processing pipelines.",
    href: "/docs/invoker",
  },
  {
    icon: LoaderPinwheel,
    title: "Workflow Automation",
    description:
      "Build visual node-based execution flows using triggers, conditional match blocks, and custom script actions.",
    href: "/docs/automation",
  },
  {
    icon: AppWindow,
    title: "Browser Crawler",
    description:
      "Crawl target domains, map directories in a crawl tree, and triage AI-categorized severity findings.",
    href: "/docs/browser-automation",
  },
  {
    icon: BookText,
    title: "Documents & Evidence",
    description:
      "Initialize blank or specialized QA/Security templates, save request/response entries, and write reports.",
    href: "/docs/documents",
  },
  {
    icon: Binary,
    title: "Security Utilities (Tools)",
    description:
      "Access split utilities for URL/Base64/Hex codecs, hashers, visual diff comparers, and TCP port scanners.",
    href: "/docs/tools",
  },
  {
    icon: Radio,
    title: "OOB Collaborator Listener",
    description:
      "Generate random interaction URLs and monitor incoming Out-Of-Band DNS, HTTP, and SMTP requests.",
    href: "/docs/listener",
  },
  {
    icon: Bug,
    title: "Debugger & Regression",
    description:
      "Inspect chronological proxy events and build/run automated UI test integration suites.",
    href: "/docs/debugger",
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
