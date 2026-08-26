"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TextEditor, ButtonGroup, Button } from "@celestia-project/ui";
import { ProxyArchitecture } from "@/components/proxy-architecture";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";
import {
  ArrowLeftIcon,
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
      <main
        className={cn(
          // Layout & Positioning
          "min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8",
          // Backgrounds & Borders
          "bg-background selection:bg-emerald-950 selection:text-emerald-300 antialiased"
        )}
      >
        <div
          className={cn(
            // Layout & Positioning
            "mx-auto",
            // Sizing & Spacing
            "max-w-5xl"
          )}
        >
          <PageBreadcrumb current="hexbuffer-proxy" />
          <Link
            href="/docs"
            className={cn(
              // Layout & Positioning
              "inline-flex items-center gap-1.5",
              // Sizing & Spacing
              "mb-6",
              // Typography
              "text-sm font-medium text-muted-foreground",
              // Interactive & States
              "hover:text-foreground transition-colors active:scale-95"
            )}
          >
            <ArrowLeftIcon className={cn("size-3.5")} /> Back to docs
          </Link>

          <div
            className={cn(
              // Layout & Positioning
              "grid grid-cols-1 lg:grid-cols-[240px_1fr]",
              // Sizing & Spacing
              "gap-10"
            )}
          >
            {/* Sticky Sidebar Table of Contents */}
            <aside
              className={cn(
                // Layout & Positioning
                "hidden lg:block shrink-0 sticky top-28 self-start overflow-y-auto scrollbar-thin",
                // Sizing & Spacing
                "pr-6 h-[calc(100vh-140px)]",
                // Backgrounds & Borders
                "border-r border-border"
              )}
            >
              <div className={cn("px-2 mb-4")}>
                <span
                  className={cn(
                    // Typography
                    "text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground"
                  )}
                >
                  On this page
                </span>
              </div>
              <nav className={cn("space-y-1")}>
                {NAV_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={cn(
                      // Layout & Positioning
                      "flex items-center gap-2",
                      // Sizing & Spacing
                      "px-2.5 py-1.5 rounded-lg",
                      // Typography
                      "text-xs font-medium text-muted-foreground",
                      // Interactive & States
                      "transition-all hover:bg-muted hover:text-foreground active:scale-98"
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full bg-emerald-400")} />
                    <span>{sec.label}</span>
                  </a>
                ))}
              </nav>

              <div
                className={cn(
                  // Sizing & Spacing
                  "mt-8 p-4 rounded-xl",
                  // Backgrounds & Borders
                  "bg-card border border-border border-t-neutral-800 backdrop-blur-md shadow-md"
                )}
              >
                <div className={cn("text-xs font-mono font-medium text-emerald-400 mb-1")}>
                  High Performance MITM
                </div>
                <p className={cn("text-xs text-muted-foreground leading-relaxed")}>
                  Stream pooling, zero allocation frame parsing, and Tokio async
                  runtime integration.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className={cn("min-w-0 flex-1 space-y-16")}>
              {/* HERO SECTION */}
              <ScrollReveal>
                <section id="overview" className={cn("scroll-mt-24")}>
                  <div className={cn("flex flex-wrap items-center gap-2 mb-4")}>
                    <span
                      className={cn(
                        // Layout & Positioning
                        "inline-flex items-center",
                        // Sizing & Spacing
                        "px-3 py-1 rounded-full",
                        // Typography
                        "text-xs font-mono text-primary-foreground",
                        // Backgrounds & Borders
                        "bg-primary border border-primary"
                      )}
                    >
                      Rust Library
                    </span>
                    <span
                      className={cn(
                        // Layout & Positioning
                        "inline-flex items-center",
                        // Sizing & Spacing
                        "px-3 py-1 rounded-full",
                        // Typography
                        "text-xs font-mono text-muted-foreground",
                        // Backgrounds & Borders
                        "bg-muted border border-border"
                      )}
                    >
                      Tokio • Hyper • rustls
                    </span>
                  </div>

                  <h1
                    className={cn(
                      // Typography
                      "text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-wrap-balance",
                      // Sizing & Spacing
                      "mb-4"
                    )}
                  >
                    hexbuffer-proxy
                  </h1>
                  <p
                    className={cn(
                      // Sizing & Spacing
                      "max-w-3xl mb-8",
                      // Typography
                      "text-lg md:text-xl text-muted-foreground leading-relaxed text-wrap-pretty"
                    )}
                  >
                    High-performance HTTPS Man-in-the-Middle (MITM) proxy library
                    for Rust built on{" "}
                    <strong className={cn("text-foreground font-semibold")}>
                      Tokio
                    </strong>
                    ,{" "}
                    <strong className={cn("text-foreground font-semibold")}>
                      Hyper
                    </strong>
                    , and{" "}
                    <strong className={cn("text-foreground font-semibold")}>
                      rustls
                    </strong>
                    . Features connection pooling, WebSocket frame-level
                    interception, and dynamic TLS certificate forging.
                  </p>

                  {/* Feature Flags Table */}
                  <div className={cn("mt-8")}>
                    <h3
                      className={cn(
                        // Typography
                        "text-xs uppercase tracking-wider text-muted-foreground font-mono",
                        // Sizing & Spacing
                        "mb-3"
                      )}
                    >
                      Feature Flags
                    </h3>
                    <div
                      className={cn(
                        // Layout & Positioning
                        "overflow-x-auto",
                        // Sizing & Spacing
                        "rounded-xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-md shadow-md"
                      )}
                    >
                      <table className={cn("w-full text-left text-sm")}>
                        <thead
                          className={cn(
                            // Typography
                            "text-xs uppercase text-muted-foreground font-mono",
                            // Backgrounds & Borders
                            "border-b border-border bg-muted/80"
                          )}
                        >
                          <tr>
                            <th className={cn("px-4 py-3")}>Feature</th>
                            <th className={cn("px-4 py-3")}>Default</th>
                            <th className={cn("px-4 py-3")}>Description</th>
                          </tr>
                        </thead>
                        <tbody className={cn("divide-y divide-border")}>
                          <tr className={cn("hover:bg-muted/40 transition-colors")}>
                            <td className={cn("px-4 py-3 font-mono font-semibold text-emerald-400")}>
                              decoder
                            </td>
                            <td className={cn("px-4 py-3 font-semibold text-foreground")}>
                              Enabled
                            </td>
                            <td className={cn("px-4 py-3 text-muted-foreground leading-relaxed")}>
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
              </ScrollReveal>

              {/* QUICK START SECTION */}
              <ScrollReveal>
                <section id="quickstart" className={cn("scroll-mt-24")}>
                  <div className={cn("mb-2")}>
                    <h2
                      className={cn(
                        // Typography
                        "text-2xl font-semibold tracking-tight text-foreground text-wrap-balance"
                      )}
                    >
                      Quick Start — Minimal Proxy
                    </h2>
                  </div>
                  <p className={cn("text-sm text-muted-foreground mb-6 leading-relaxed")}>
                    Set up a pass-through HTTPS proxy server listening on{" "}
                    <code>127.0.0.1:8080</code> in under 20 lines of Rust code.
                  </p>

                  <div
                    className={cn(
                      // Layout & Positioning
                      "overflow-hidden my-4",
                      // Sizing & Spacing
                      "rounded-xl",
                      // Backgrounds & Borders
                      "border border-border border-t-neutral-800 bg-card shadow-lg"
                    )}
                  >
                    <div
                      className={cn(
                        // Layout & Positioning
                        "flex items-center gap-2",
                        // Sizing & Spacing
                        "px-4 py-2",
                        // Typography
                        "text-xs font-mono text-muted-foreground",
                        // Backgrounds & Borders
                        "border-b border-border bg-muted/60"
                      )}
                    >
                      <span>src/main.rs</span>
                    </div>
                    <TextEditor
                      value={QUICKSTART_CODE_SNIPPET}
                      options={{ readOnly: true }}
                      height={340}
                    />
                  </div>

                  <div
                    className={cn(
                      // Sizing & Spacing
                      "p-4 rounded-xl",
                      // Typography
                      "text-xs text-muted-foreground leading-relaxed",
                      // Backgrounds & Borders
                      "border border-neutral-800 bg-card backdrop-blur-md"
                    )}
                  >
                    <strong className={cn("text-foreground font-semibold")}>Note:</strong> Configure
                    your application or browser to proxy traffic through{" "}
                    <code>127.0.0.1:8080</code> and trust <code>cert/ca.pem</code>{" "}
                    for HTTPS interception.
                  </div>
                </section>
              </ScrollReveal>

              {/* ARCHITECTURE SECTION */}
              <ScrollReveal>
                <section id="architecture" className={cn("scroll-mt-24")}>
                  <div className={cn("mb-2")}>
                    <h2
                      className={cn(
                        // Typography
                        "text-2xl font-semibold tracking-tight text-foreground text-wrap-balance"
                      )}
                    >
                      Architecture & Pipeline Flow
                    </h2>
                  </div>
                  <p className={cn("text-sm text-muted-foreground mb-6 leading-relaxed")}>
                    Understand how <code>hexbuffer-proxy</code> handles TCP
                    connections, TLS certificate forging, HTTP handler chains, and
                    WebSocket upgrades.
                  </p>

                  <ProxyArchitecture />
                </section>
              </ScrollReveal>

              {/* PUBLIC API REFERENCE SECTION */}
              <ScrollReveal>
                <section id="api-reference" className={cn("scroll-mt-24")}>
                  <div
                    className={cn(
                      // Layout & Positioning
                      "flex flex-wrap items-center justify-between gap-4",
                      // Sizing & Spacing
                      "mb-4"
                    )}
                  >
                    <div>
                      <h2
                        className={cn(
                          // Typography
                          "text-2xl font-semibold tracking-tight text-foreground text-wrap-balance"
                        )}
                      >
                        Public API Reference
                      </h2>
                    </div>
                    <div className={cn("relative w-48 sm:w-64")}>
                      <MagnifyingGlassIcon
                        className={cn(
                          // Layout & Positioning
                          "absolute left-2.5 top-1/2 -translate-y-1/2",
                          // Sizing & Spacing
                          "size-3.5",
                          // Typography
                          "text-muted-foreground"
                        )}
                      />
                      <input
                        type="text"
                        placeholder="Filter API symbols..."
                        value={apiSearch}
                        onChange={(e) => setApiSearch(e.target.value)}
                        className={cn(
                          // Layout & Positioning
                          "w-full outline-none",
                          // Sizing & Spacing
                          "pl-8 pr-3 py-1.5 rounded-lg",
                          // Typography
                          "text-xs font-mono text-foreground placeholder:text-muted-foreground",
                          // Backgrounds & Borders
                          "border border-border bg-background",
                          // Interactive & States
                          "focus:border-emerald-500 transition-colors"
                        )}
                      />
                    </div>
                  </div>

                  {/* Re-exports Table */}
                  <div className={cn("mb-8")}>
                    <h3
                      className={cn(
                        // Typography
                        "text-xs uppercase tracking-wider text-muted-foreground font-mono",
                        // Sizing & Spacing
                        "mb-3"
                      )}
                    >
                      Re-exports (Crate Root)
                    </h3>
                    <div
                      className={cn(
                        // Layout & Positioning
                        "overflow-x-auto",
                        // Sizing & Spacing
                        "rounded-xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-md shadow-md"
                      )}
                    >
                      <table className={cn("w-full text-left text-sm")}>
                        <thead
                          className={cn(
                            // Typography
                            "text-xs uppercase text-muted-foreground font-mono",
                            // Backgrounds & Borders
                            "border-b border-border bg-muted/80"
                          )}
                        >
                          <tr>
                            <th className={cn("px-4 py-2.5")}>Symbol</th>
                            <th className={cn("px-4 py-2.5")}>Kind</th>
                            <th className={cn("px-4 py-2.5")}>Module</th>
                            <th className={cn("px-4 py-2.5")}>Description</th>
                          </tr>
                        </thead>
                        <tbody className={cn("divide-y divide-border")}>
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
                                className={cn("hover:bg-muted/40 transition-colors")}
                              >
                                <td className={cn("px-4 py-2.5 font-mono text-xs font-semibold text-emerald-400")}>
                                  {sym}
                                </td>
                                <td className={cn("px-4 py-2.5 font-mono text-[11px] text-purple-400")}>
                                  {kind}
                                </td>
                                <td className={cn("px-4 py-2.5 font-mono text-[11px] text-zinc-400")}>
                                  {mod}
                                </td>
                                <td className={cn("px-4 py-2.5 text-xs text-muted-foreground")}>
                                  {desc}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Detailed Symbol Reference Cards */}
                  <div className={cn("space-y-6")}>
                    {/* ProxyBuilder */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        ProxyBuilder
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        Builder struct for assembling and configuring a{" "}
                        <code>Proxy</code>.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={PROXY_BUILDER_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={220}
                        />
                      </div>
                    </div>

                    {/* Proxy */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        Proxy
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        A fully assembled proxy server instance created by{" "}
                        <code>ProxyBuilder::build</code>.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={PROXY_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={130}
                        />
                      </div>
                    </div>

                    {/* CertificationAuthority */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        CertificationAuthority
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        Handles self-signed CA generation, file persistence, and
                        dynamic per-host TLS certificate forging.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={CERTIFICATION_AUTHORITY_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={95}
                        />
                      </div>
                    </div>

                    {/* HttpHandler */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        HttpHandler (trait)
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        Core trait for inspecting or mutating HTTP traffic flowing
                        through the proxy pipeline.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={HTTP_HANDLER_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={300}
                        />
                      </div>
                    </div>

                    {/* WebSocketHandler */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        WebSocketHandler (trait)
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        Trait for frame-level inspection and modification of
                        WebSocket traffic.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={WEBSOCKET_HANDLER_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={340}
                        />
                      </div>
                    </div>

                    {/* ProxyError */}
                    <div
                      className={cn(
                        // Sizing & Spacing
                        "p-5 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-lg"
                      )}
                    >
                      <h3 className={cn("text-lg font-mono font-semibold text-emerald-400 mb-2")}>
                        ProxyError & Result
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        Comprehensive error variants returned by proxy operations.
                      </p>
                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={PROXY_ERROR_CODE_SNIPPET}
                          options={{ readOnly: true }}
                          height={460}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* USAGE RECIPES SECTION */}
              <ScrollReveal>
                <section id="recipes" className={cn("scroll-mt-24")}>
                  <div className={cn("mb-2")}>
                    <h2
                      className={cn(
                        // Typography
                        "text-2xl font-semibold tracking-tight text-foreground text-wrap-balance"
                      )}
                    >
                      Usage Recipes
                    </h2>
                  </div>
                  <p className={cn("text-sm text-muted-foreground mb-6 leading-relaxed")}>
                    Select a recipe below to view common implementation patterns
                    and handler code.
                  </p>

                  {/* Recipe Selection ButtonGroup */}
                  <div className={cn("mb-6 overflow-x-auto pb-1")}>
                    <ButtonGroup>
                      {RECIPES.map((r) => {
                        const isActive = activeRecipe === r.id;
                        return (
                          <Button
                            key={r.id}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
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
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentRecipeObj.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={CRITICALLY_DAMPED_SPRING}
                      className={cn(
                        // Sizing & Spacing
                        "p-6 rounded-2xl",
                        // Backgrounds & Borders
                        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-xl"
                      )}
                    >
                      <h3 className={cn("text-xl font-semibold text-foreground mb-2 text-wrap-balance")}>
                        {currentRecipeObj.title}
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                        {currentRecipeObj.description}
                      </p>

                      <div className={cn("rounded-lg border border-border overflow-hidden mt-4")}>
                        <TextEditor
                          value={currentRecipeObj.code}
                          options={{ readOnly: true }}
                          height={Math.max(
                            200,
                            currentRecipeObj.code.split("\n").length * 19 + 20,
                          )}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </section>
              </ScrollReveal>

              {/* GRACEFUL SHUTDOWN SECTION */}
              <ScrollReveal>
                <section id="shutdown" className={cn("scroll-mt-24")}>
                  <div className={cn("mb-2")}>
                    <h2
                      className={cn(
                        // Typography
                        "text-2xl font-semibold tracking-tight text-foreground text-wrap-balance"
                      )}
                    >
                      Graceful Shutdown
                    </h2>
                  </div>
                  <p className={cn("text-sm text-muted-foreground mb-4 leading-relaxed")}>
                    Handle Ctrl+C signals gracefully using{" "}
                    <code>tokio::select!</code>:
                  </p>

                  <div
                    className={cn(
                      // Layout & Positioning
                      "overflow-hidden mt-4",
                      // Sizing & Spacing
                      "rounded-xl",
                      // Backgrounds & Borders
                      "border border-border border-t-neutral-800 bg-card shadow-lg"
                    )}
                  >
                    <TextEditor
                      value={GRACEFUL_SHUTDOWN_CODE_SNIPPET}
                      options={{ readOnly: true }}
                      height={260}
                    />
                  </div>
                </section>
              </ScrollReveal>

              {/* FOOTER CTA */}
              <ScrollReveal>
                <div
                  className={cn(
                    // Layout & Positioning
                    "text-center",
                    // Sizing & Spacing
                    "p-8 md:p-10 rounded-2xl",
                    // Backgrounds & Borders
                    "border border-border border-t-neutral-700 bg-card backdrop-blur-xl shadow-2xl"
                  )}
                >
                  <h3
                    className={cn(
                      // Typography
                      "text-2xl font-semibold text-foreground tracking-tight text-wrap-balance",
                      // Sizing & Spacing
                      "mb-2"
                    )}
                  >
                    Ready to Intercept Traffic with hexbuffer-proxy?
                  </h3>
                  <p
                    className={cn(
                      // Layout & Positioning
                      "mx-auto",
                      // Sizing & Spacing
                      "max-w-xl mb-6",
                      // Typography
                      "text-sm text-muted-foreground leading-relaxed"
                    )}
                  >
                    Integrate high-speed MITM proxy capabilities into your
                    security tools, web fuzzers, or test automation suites today.
                  </p>
                  <div className={cn("flex flex-wrap items-center justify-center gap-4")}>
                    <Button
                      size="lg"
                      variant="default"
                      render={
                        <a
                          href="https://github.com/arhamymr/hexbuffer-proxy"
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                    >
                      Star on GitHub
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
