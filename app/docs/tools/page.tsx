import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  ArrowLeft,
  ArrowLeftRight,
  Hash,
  Radar,
  Copy,
  Download,
  Play,
  Square,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tools — 0xbuffer Docs",
  description:
    "Learn how to use 0xbuffer's built-in encoder, hash, and port scanning utilities.",
};

export default function ToolsDoc() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Tools" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Tools</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Use the built-in utilities for common testing tasks without leaving
            your workspace. Convert data, generate hashes, scan authorized
            hosts, copy results, and export findings as you work.
          </p>

          {/* Active Tools */}
          <div className="mb-12 grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: ArrowLeftRight,
                title: "Encoder/Decoder",
                desc: "Convert URL, Base64, and Hex values while reviewing parameters, tokens, or payloads.",
              },
              {
                icon: Hash,
                title: "Hash Generator",
                desc: "Generate common hashes from text so you can compare values during analysis.",
              },
              {
                icon: Radar,
                title: "Port Scanner",
                desc: "Check which TCP services are reachable on hosts you are authorized to assess.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex size-9 items-center justify-center rounded-md border border-border bg-muted mb-3">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* Encoder/Decoder */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Encoder / Decoder</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use Encoder / Decoder when a request contains encoded values or
              when you need to prepare a value for a test. Paste input, choose
              the format, choose encode or decode, then copy the output.
            </p>

            <div className="rounded-lg border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Format</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Encode</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Decode</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["URL", "Prepare text for a query string or form value.", "Read encoded URL parameters."],
                    ["Base64", "Turn readable text into Base64.", "Decode Base64 tokens, blobs, or copied values."],
                    ["Hex", "Turn readable text into hexadecimal.", "Decode hexadecimal strings into readable text."],
                  ].map(([format, encode, decode]) => (
                    <tr key={format} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{format}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{encode}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{decode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Swap", "Move the output back into the input field and switch direction for quick round trips."],
                ["Copy", "Copies the output to clipboard."],
                ["Clear", "Clears both input and output fields."],
                ["Invalid Input", "If a value cannot be decoded, fix the input and try again instead of trusting partial output."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hash Generator */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Hash Generator</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use Hash Generator when you need to compare a value with a known
              hash, check whether two strings produce the same digest, or
              document a stable fingerprint for a finding. Choose an algorithm,
              paste text, then copy the generated hash.
            </p>

            <div className="rounded-lg border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Algorithm</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["MD5", "Legacy checksums and older application behavior."],
                    ["SHA-1", "Legacy fingerprints and compatibility checks."],
                    ["SHA-224", "Shorter SHA-2 digest needs."],
                    ["SHA-256", "General-purpose comparisons and the recommended default."],
                    ["SHA-384", "Longer SHA-2 digest needs."],
                    ["SHA-512", "High-length SHA-2 digest comparisons."],
                    ["SHA3-224", "Shorter SHA-3 digest needs."],
                    ["SHA3-256", "Modern SHA-3 comparisons."],
                    ["SHA3-384", "Longer SHA-3 digest needs."],
                    ["SHA3-512", "High-length SHA-3 digest comparisons."],
                    ["RIPEMD-160", "Compatibility checks for systems that use RIPEMD-160."],
                  ].map(([algo, method]) => (
                    <tr key={algo} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium font-mono text-xs">{algo}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              The hash updates as you type or change the selected algorithm.
              Use copy when you need to paste the result into a note, report,
              or another 0xbuffer workflow.
            </p>
          </section>

          {/* Port Scanner */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Port Scanner</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use Port Scanner to check reachable TCP services on systems you
              are authorized to assess. Start with a quick or web preset, then
              expand only when the test scope allows it.
            </p>

            <h3 className="text-lg font-medium mb-3">Port Presets</h3>
            <div className="rounded-lg border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Preset</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Ports</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Quick", "A small set of common service ports for fast orientation."],
                    ["Web", "Common HTTP and HTTPS ports for web application testing."],
                    ["Top 100", "A broader scan of common TCP services."],
                    ["Full", "All TCP ports. Use only when authorized and when the target can handle it."],
                    ["Custom", "A range or list you define for the current test scope."],
                  ].map(([preset, desc]) => (
                    <tr key={preset} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{preset}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  icon: Play,
                  title: "Real-time Progress",
                  desc: "Watch scan progress and review open ports as they appear.",
                },
                {
                  icon: Square,
                  title: "Cancellable",
                  desc: "Stop a scan at any time if the target is out of scope, too noisy, or no longer needed.",
                },
                {
                  icon: Copy,
                  title: "Copy Open Ports",
                  desc: "Copy host:port pairs for notes, follow-up testing, or another tool.",
                },
                {
                  icon: Download,
                  title: "Export",
                  desc: "Download results as JSON or CSV so you can keep evidence with your recon notes.",
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

            <h3 className="text-lg font-medium mb-3">Configuration</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Target", "Hostname, IP address, or in-scope network range."],
                ["Timeout", "How long to wait for each port before treating it as closed or unavailable."],
                ["Concurrency", "How many ports to check at once. Lower it for fragile or sensitive targets."],
                ["Banner Grab", "Try to capture service banners from open ports for easier identification."],
              ].map(([field, desc]) => (
                <div key={field} className="rounded-lg border border-border p-4">
                  <h4 className="text-sm font-medium mb-1">{field}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safe Usage */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4">Safe Usage</h2>
            <div className="rounded-lg border border-border p-5">
              <p className="text-muted-foreground leading-relaxed">
                Only scan hosts and networks you own or have permission to
                assess. Use narrower presets first, keep concurrency reasonable,
                and export results before clearing or moving to the next target.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
