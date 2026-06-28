import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Layout, Shield, Target, NotepadText } from "lucide-react";

export const metadata: Metadata = {
  title: "Overview & Workspaces — hexbuffer Docs",
  description:
    "Learn how to manage target domains, scopes, collections, and workspaces in hexbuffer.",
};

export default function OverviewDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Overview & Workspaces" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Overview & Workspaces</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Get familiar with the hexbuffer launcher layout, target scopes, and active project workspace structures.
          </p>

          {/* Target Scoping */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Target className="size-5 text-muted-foreground" />
              Target & Scope Management
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Everything in hexbuffer is scoped to a workspace target. Defining clear target scopes keeps your data clean, filters out background traffic noise, and prevents scanning out-of-scope services.
            </p>
            <div className="rounded-lg border border-border p-4 bg-muted/20 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Target Collections:</p>
              <p>Group target domains, scopes, and saved endpoints into named collections. This makes it easy to switch between projects or assessments without losing history or settings.</p>
            </div>
          </section>

          {/* Dashboard Widgets */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Layout className="size-5 text-muted-foreground" />
              Dashboard Widgets
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The main launchpad view features persistent helper widgets on the sidebar:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Clock Widget", "Shows active local time for tracking assessment duration and timing constraints."],
                ["Collections Widget", "Displays statistics on the number of configured workspaces, saved collections, and total endpoints."],
                ["Proxy Widget", "Shows active proxy listening status, target port settings, and a quick-toggle switch to turn MITM capture on/off."],
                ["Scratchpad Widget", "A simple markdown notepad that persists locally. Write draft notes, payload lists, or credentials for quick retrieval."],
              ].map(([widget, desc]) => (
                <div key={widget} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{widget}</h3>
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
