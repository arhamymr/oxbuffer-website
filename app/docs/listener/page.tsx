import type { Metadata } from "next";
import Link from "next/link";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Radio, Network, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "OOB Collaborator Listener — hexbuffer Docs",
  description:
    "Learn how to generate interaction payloads and monitor Out-Of-Band DNS, HTTP, and SMTP transactions in hexbuffer.",
};

export default function ListenerDoc() {
  return (
    <>
      <div className="mt-10">
          <PageBreadcrumb current="OOB Collaborator Listener" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">OOB Collaborator Listener</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Detect Out-Of-Band (OOB) interactions. Generate temporary lookup 
            domains, view incoming transactions, and inspect packet headers.
          </p>

          {/* How Out-Of-Band Works */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <HelpCircle className="size-5 text-muted-foreground" />
              What is OOB Testing?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Out-of-band application security testing (OAST) is used to find vulnerabilities 
              like blind SSRF, blind SQL injection, or blind command execution. If a server processes 
              a payload and initiates a DNS, HTTP, or SMTP lookup back to a controlled domain, the 
              vulnerability is confirmed.
            </p>
          </section>

          {/* Payloads */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Radio className="size-5 text-muted-foreground" />
              Generating Payloads
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Open the listener panel and configure a Collaborator server. Generate unique payloads (e.g. `xyz.hexbuffer-collaborator.com`) to inject into input parameters, HTTP headers, or request payloads.
            </p>
          </section>

          {/* Inbound Logs */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Network className="size-5 text-muted-foreground" />
              Interactions Table & Logs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When target servers resolve or ping the lookup domain, the listener console captures:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-sm text-muted-foreground">
              <li>**DNS**: Inbound queries showing DNS request types, timestamps, and client IP addresses.</li>
              <li>**HTTP**: Full HTTP requests with query parameters, request bodies, and headers.</li>
              <li>**SMTP**: Inbound mail transaction logs showing raw envelopes and text payloads.</li>
            </ul>
          </section>
        </div>
      </>
  );
}
