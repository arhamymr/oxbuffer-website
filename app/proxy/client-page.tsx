"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TextEditor } from "@/components/ui/text-editor";
import { ProxyArchitecture } from "@/components/proxy-architecture";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  ArrowLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import {
  NAV_SECTIONS,
  RECIPES,
  QUICKSTART_CODE_SNIPPET,
  PROXY_BUILDER_CODE_SNIPPET,
  PROXY_CODE_SNIPPET,
  CERTIFICATION_AUTHORITY_CODE_SNIPPET,
  HTTP_HANDLER_CODE_SNIPPET,
  WEBSOCKET_HANDLER_CODE_SNIPPET,
  PROXY_ERROR_CODE_SNIPPET,
  GRACEFUL_SHUTDOWN_CODE_SNIPPET,
} from "./constants";

export function ProxyPageClient() {
  const [activeRecipe, setActiveRecipe] = useState("logger");
  const [apiSearch, setApiSearch] = useState("");

  const currentRecipeObj =
    RECIPES.find((r) => r.id === activeRecipe) || RECIPES[0];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-28 px-4 bg-background selection:bg-emerald-500/20 selection:text-emerald-300 antialiased">
        <div className="mx-auto max-w-7xl">
          <PageBreadcrumb current="hexbuffer-proxy" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to docs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
            {/* Sticky Sidebar Table of Contents */}
            <aside className="hidden lg:block shrink-0 sticky top-28 self-start border-r border-border/40 pr-6 h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin">
              <div className="px-2 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
                  On this page
                </span>
              </div>
              <nav className="space-y-1">
                {NAV_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-emerald-500/40" />
                    <span>{sec.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-primary mb-1">
                  High Performance MITM
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Stream pooling, zero allocation frame parsing, and Tokio async
                  runtime integration.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="min-w-0 flex-1 space-y-16">
              {/* HERO SECTION */}
              <section id="overview" className="scroll-mt-24">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full border border-primary bg-primary px-3 py-1 text-xs font-mono text-primary">
                    Rust Library
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground">
                    Tokio • Hyper • rustls
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl tracking-tight mb-4 text-foreground text-wrap-balance">
                  hexbuffer-proxy
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 text-wrap-pretty">
                  High-performance HTTPS Man-in-the-Middle (MITM) proxy library
                  for Rust built on{" "}
                  <strong className="text-foreground font-semibold">
                    Tokio
                  </strong>
                  ,{" "}
                  <strong className="text-foreground font-semibold">
                    Hyper
                  </strong>
                  , and{" "}
                  <strong className="text-foreground font-semibold">
                    rustls
                  </strong>
                  . Features connection pooling, WebSocket frame-level
                  interception, and dynamic TLS certificate forging.
                </p>

                {/* Feature Flags */}
                <div className="mt-8">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Feature Flags
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">Feature</th>
                          <th className="px-4 py-3">Default</th>
                          <th className="px-4 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr>
                          <td className="px-4 py-3 font-mono font-semibold text-primary">
                            decoder
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">
                            Enabled
                          </td>
                          <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                            Application-level request/response body
                            decompression (<code>decode_request</code>,{" "}
                            <code>decode_response</code>), re-encoding (
                            <code>encode_body</code>), and{" "}
                            <code>DecodeHandler</code> plugin for gzip, deflate,
                            brotli, and zstd.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* QUICK START SECTION */}
              <section id="quickstart" className="scroll-mt-24">
                <div className="mb-2">
                  <h2 className="text-2xl tracking-tight text-foreground text-wrap-balance">
                    Quick Start — Minimal Proxy
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Set up a pass-through HTTPS proxy server listening on{" "}
                  <code>127.0.0.1:8080</code> in under 20 lines of Rust code.
                </p>

                <div className="rounded-lg border border-border overflow-hidden my-4 bg-card">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2 text-xs font-mono text-muted-foreground">
                    <span>src/main.rs</span>
                  </div>
                  <TextEditor
                    value={QUICKSTART_CODE_SNIPPET}
                    options={{ readOnly: true }}
                    height={340}
                  />
                </div>

                <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-4 text-xs text-blue-300/90 leading-relaxed">
                  <strong className="text-blue-200">Note:</strong> Configure
                  your application or browser to proxy traffic through{" "}
                  <code>127.0.0.1:8080</code> and trust <code>cert/ca.pem</code>{" "}
                  for HTTPS interception.
                </div>
              </section>

              {/* ARCHITECTURE SECTION */}
              <section id="architecture" className="scroll-mt-24">
                <div className="mb-2">
                  <h2 className="text-2xl tracking-tight text-foreground text-wrap-balance">
                    Architecture & Pipeline Flow
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Understand how <code>hexbuffer-proxy</code> handles TCP
                  connections, TLS certificate forging, HTTP handler chains, and
                  WebSocket upgrades.
                </p>

                <ProxyArchitecture />
              </section>

              {/* PUBLIC API REFERENCE SECTION */}
              <section id="api-reference" className="scroll-mt-24">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl tracking-tight text-foreground text-wrap-balance">
                      Public API Reference
                    </h2>
                  </div>
                  <div className="relative w-48 sm:w-64">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter API symbols..."
                      value={apiSearch}
                      onChange={(e) => setApiSearch(e.target.value)}
                      className="w-full rounded-md border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Re-exports Table */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Re-exports (Crate Root)
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-2.5">Symbol</th>
                          <th className="px-4 py-2.5">Kind</th>
                          <th className="px-4 py-2.5">Module</th>
                          <th className="px-4 py-2.5">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {[
                          [
                            "ProxyBuilder",
                            "struct",
                            "builder",
                            "Builder-pattern proxy configuration and assembly",
                          ],
                          [
                            "Proxy",
                            "struct",
                            "builder",
                            "Ready-to-run proxy instance",
                          ],
                          [
                            "CertificationAuthority",
                            "struct",
                            "ca",
                            "CA certificate authority & per-domain certificate forging",
                          ],
                          [
                            "HttpHandler",
                            "trait",
                            "handler",
                            "Trait for inspecting/modifying HTTP requests & responses",
                          ],
                          [
                            "WebSocketHandler",
                            "trait",
                            "handler",
                            "Trait for inspecting/modifying WebSocket frames",
                          ],
                          [
                            "NoopHandler",
                            "struct",
                            "handler",
                            "Pass-through HttpHandler implementation (default)",
                          ],
                          [
                            "NoopWebSocketHandler",
                            "struct",
                            "handler",
                            "Pass-through WebSocketHandler implementation",
                          ],
                          [
                            "HttpContext",
                            "struct",
                            "handler",
                            "Metadata for an intercepted HTTP request/response pair",
                          ],
                          [
                            "Body",
                            "enum",
                            "handler",
                            "HTTP body representation (Streaming or Full)",
                          ],
                          [
                            "RequestOrResponse",
                            "enum",
                            "handler",
                            "Return value of handle_request (forward vs short-circuit)",
                          ],
                          [
                            "Direction",
                            "enum",
                            "handler",
                            "WebSocket frame direction (ClientToServer / ServerToClient)",
                          ],
                          [
                            "WebSocketMessage",
                            "type",
                            "handler",
                            "Re-export of tokio_tungstenite::tungstenite::Message",
                          ],
                          [
                            "full_body",
                            "fn",
                            "handler",
                            "Helper function creating Full<Bytes> body from bytes",
                          ],
                          [
                            "ProxyError",
                            "enum",
                            "error",
                            "Error variants returned by proxy operations",
                          ],
                          [
                            "Result<T>",
                            "type",
                            "error",
                            "Alias for std::result::Result<T, ProxyError>",
                          ],
                          [
                            "decoder",
                            "module",
                            "decoder",
                            "Application-level body decompression/re-encoding module",
                          ],
                        ]
                          .filter(([sym]) =>
                            sym.toLowerCase().includes(apiSearch.toLowerCase()),
                          )
                          .map(([sym, kind, mod, desc]) => (
                            <tr
                              key={sym}
                              className="hover:bg-muted/40 transition-colors"
                            >
                              <td className="px-4 py-2.5 font-mono text-xs font-semibold text-emerald-400">
                                {sym}
                              </td>
                              <td className="px-4 py-2.5 font-mono text-[11px] text-purple-400">
                                {kind}
                              </td>
                              <td className="px-4 py-2.5 font-mono text-[11px] text-zinc-400">
                                {mod}
                              </td>
                              <td className="px-4 py-2.5 text-xs text-muted-foreground">
                                {desc}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detailed Symbol Reference Cards */}
                <div className="space-y-6">
                  {/* ProxyBuilder */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      ProxyBuilder
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Builder struct for assembling and configuring a{" "}
                      <code>Proxy</code>.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={PROXY_BUILDER_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={220}
                      />
                    </div>
                  </div>

                  {/* Proxy */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      Proxy
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      A fully assembled proxy server instance created by{" "}
                      <code>ProxyBuilder::build</code>.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={PROXY_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={130}
                      />
                    </div>
                  </div>

                  {/* CertificationAuthority */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      CertificationAuthority
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Handles self-signed CA generation, file persistence, and
                      dynamic per-host TLS certificate forging.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={CERTIFICATION_AUTHORITY_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={95}
                      />
                    </div>
                  </div>

                  {/* HttpHandler */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      HttpHandler (trait)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Core trait for inspecting or mutating HTTP traffic flowing
                      through the proxy pipeline.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={HTTP_HANDLER_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={300}
                      />
                    </div>
                  </div>

                  {/* WebSocketHandler */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      WebSocketHandler (trait)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Trait for frame-level inspection and modification of
                      WebSocket traffic.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={WEBSOCKET_HANDLER_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={340}
                      />
                    </div>
                  </div>

                  {/* ProxyError */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-mono text-emerald-400 mb-2">
                      ProxyError & Result
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive error variants returned by proxy operations.
                    </p>
                    <div className="rounded-lg border border-border overflow-hidden mt-4">
                      <TextEditor
                        value={PROXY_ERROR_CODE_SNIPPET}
                        options={{ readOnly: true }}
                        height={460}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* USAGE RECIPES SECTION */}
              <section id="recipes" className="scroll-mt-24">
                <div className="mb-2">
                  <h2 className="text-2xl tracking-tight text-foreground text-wrap-balance">
                    Usage Recipes
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Select a recipe below to view common implementation patterns
                  and handler code.
                </p>

                {/* Hexbuffer styled ButtonGroup */}
                <div className="mb-6">
                  <ButtonGroup>
                    {RECIPES.map((r) => {
                      const isActive = activeRecipe === r.id;
                      return (
                        <Button
                          key={r.id}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "hover:text-emerald-500 transition-colors text-xs",
                            isActive &&
                              "text-emerald-500 border-emerald-500/50 bg-emerald-500/10 font-semibold",
                          )}
                          data-state={isActive ? "on" : "off"}
                          onClick={() => setActiveRecipe(r.id)}
                        >
                          {r.title}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </div>

                {/* Recipe Details Display */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-xl text-foreground mb-2 text-wrap-balance">
                    {currentRecipeObj.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {currentRecipeObj.description}
                  </p>

                  <div className="rounded-lg border border-border overflow-hidden mt-4">
                    <TextEditor
                      value={currentRecipeObj.code}
                      options={{ readOnly: true }}
                      height={Math.max(
                        200,
                        currentRecipeObj.code.split("\n").length * 19 + 20,
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* GRACEFUL SHUTDOWN SECTION */}
              <section id="shutdown" className="scroll-mt-24">
                <div className="mb-2">
                  <h2 className="text-2xl tracking-tight text-foreground text-wrap-balance">
                    Graceful Shutdown
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Handle Ctrl+C signals gracefully using{" "}
                  <code>tokio::select!</code>:
                </p>

                <div className="rounded-lg border border-border overflow-hidden mt-4">
                  <TextEditor
                    value={GRACEFUL_SHUTDOWN_CODE_SNIPPET}
                    options={{ readOnly: true }}
                    height={260}
                  />
                </div>
              </section>

              {/* FOOTER CTA */}
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <h3 className="text-2xl text-foreground mb-2 text-wrap-balance">
                  Ready to Intercept Traffic with hexbuffer-proxy?
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
                  Integrate high-speed MITM proxy capabilities into your
                  security tools, web fuzzers, or test automation suites today.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" variant="default" asChild>
                    <a
                      href="https://github.com/arhamymr/hexbuffer"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Star on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/docs">View Desktop App Docs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
