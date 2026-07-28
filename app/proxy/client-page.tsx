"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeBlock } from "@/components/code-block";
import { ProxyArchitecture } from "@/components/proxy-architecture";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  Zap,
  Terminal,
  Layers,
  Code2,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Radio,
  FileCode,
  Box,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Laptop,
  Flame,
  Search,
} from "lucide-react";

const navSections = [
  { id: "overview", label: "Overview" },
  { id: "quickstart", label: "Quick Start" },
  { id: "architecture", label: "Architecture" },
  { id: "api-reference", label: "API Reference" },
  { id: "recipes", label: "Usage Recipes" },
  { id: "shutdown", label: "Graceful Shutdown" },
];

const recipes = [
  {
    id: "logger",
    title: "1. Request & Response Logging",
    description:
      "Inspect incoming HTTP method, URI, and outgoing response status with atomic request ID tracking.",
    code: `use std::sync::atomic::{AtomicU64, Ordering};
use async_trait::async_trait;
use http::{Request, Response};
use hexbuffer_proxy::{Body, HttpContext, HttpHandler, RequestOrResponse, Result};

pub struct Logger {
    counter: AtomicU64,
}

impl Logger {
    pub fn new() -> Self {
        Self { counter: AtomicU64::new(1) }
    }
}

#[async_trait]
impl HttpHandler for Logger {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        let id = self.counter.fetch_add(1, Ordering::Relaxed);
        ctx.id = id;
        println!("[#{id:04}] -> {} {}", request.method(), request.uri());
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        println!("[#{:04}] <- {}", ctx.id, response.status());
        Ok(response)
    }
}`,
  },
  {
    id: "headers",
    title: "2. Modifying Request Headers",
    description:
      "Inject custom user agents or strip internal tokens from requests on-the-fly.",
    code: `#[async_trait]
impl HttpHandler for HeaderModifier {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        mut request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        request.headers_mut().insert("User-Agent", "CustomProxy/1.0".parse().unwrap());
        request.headers_mut().remove("X-Internal-Token");
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(response)
    }
}`,
  },
  {
    id: "short-circuit",
    title: "3. Short-Circuiting (Blocking & Mocking)",
    description:
      "Block domains or return synthetic mock HTTP responses without contacting upstream servers.",
    code: `#[async_trait]
impl HttpHandler for HostBlocker {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        _request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        if ctx.host.contains("blocked-domain.com") {
            let res = Response::builder()
                .status(403)
                .header("Content-Type", "text/plain")
                .body(Body::Full("Blocked by Proxy".into()))
                .unwrap();
            return Ok(RequestOrResponse::Response(res));
        }
        Ok(RequestOrResponse::Request(_request))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(response)
    }
}`,
  },
  {
    id: "body-modify",
    title: "4. Inspecting & Modifying Response Body",
    description:
      "Collect body stream bytes and inject custom payloads into HTML responses.",
    code: `#[async_trait]
impl HttpHandler for HtmlInjector {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        let is_html = response.headers()
            .get("content-type")
            .and_then(|v| v.to_str().ok())
            .map(|v| v.contains("text/html"))
            .unwrap_or(false);

        if !is_html {
            return Ok(response);
        }

        let (parts, body) = response.into_parts();
        let bytes = body.into_bytes().await?;
        let mut html = String::from_utf8_lossy(&bytes).into_owned();

        html = html.replace("</body>", "<!-- Injected by hexbuffer-proxy --></body>");

        Ok(Response::from_parts(parts, Body::Full(html.into_bytes().into())))
    }
}`,
  },
  {
    id: "tls-bypass",
    title: "5. Selective TLS Interception Bypass",
    description:
      "Skip MITM certificate forging for hosts that enforce certificate pinning (e.g. Google/Apple services).",
    code: `struct BypassCertPinnedHosts;

#[async_trait]
impl HttpHandler for BypassCertPinnedHosts {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        req: Request<Body>,
    ) -> Result<RequestOrResponse> {
        Ok(RequestOrResponse::Request(req))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        res: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(res)
    }

    async fn should_intercept_tls(&self, host: &str) -> bool {
        // Skip TLS MITM for specific domains (relays raw TCP)
        if host.ends_with("google.com") || host == "apple.com" {
            return false;
        }
        true
    }
}`,
  },
  {
    id: "dynamic-toggle",
    title: "6. Dynamic Runtime Enable / Disable Toggle",
    description:
      "Enable or disable interception at runtime via thread-safe atomic handle without restarting.",
    code: `let proxy = ProxyBuilder::new()
    .with_ca(ca)
    .with_enabled(true)
    .build()?;

let proxy_control = proxy.enabled_flag();

// In another async task or UI thread:
proxy_control.store(false, std::sync::atomic::Ordering::Relaxed); // Disables TLS interception dynamically
proxy.enable();  // Convenience method to re-enable
proxy.disable(); // Convenience method to disable`,
  },
  {
    id: "websocket",
    title: "7. WebSocket Inspection Handler",
    description:
      "Intercept, inspect, modify, or drop frame-level WebSocket traffic in duplex directions.",
    code: `use hexbuffer_proxy::{Direction, WebSocketHandler, WebSocketMessage, HttpContext, Body};
use http::Request;

struct WsLogger;

#[async_trait]
impl WebSocketHandler for WsLogger {
    async fn on_upgrade(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Request<Body> {
        println!("WebSocket Upgrade: {}", request.uri());
        request
    }

    async fn on_frame(
        &self,
        _ctx: &mut HttpContext,
        frame: WebSocketMessage,
        direction: Direction,
    ) -> Option<WebSocketMessage> {
        match direction {
            Direction::ClientToServer => println!("WS C->S: {:?}", frame),
            Direction::ServerToClient => println!("WS S->C: {:?}", frame),
        }
        Some(frame) // Return None to drop frame
    }

    async fn on_close(&self, _ctx: &mut HttpContext) {
        println!("WebSocket Connection Closed");
    }
}`,
  },
];

export function ProxyPageClient() {
  const [activeRecipe, setActiveRecipe] = useState("logger");
  const [apiSearch, setApiSearch] = useState("");

  const currentRecipeObj = recipes.find((r) => r.id === activeRecipe) || recipes[0];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-28 px-4 bg-background selection:bg-emerald-500/20 selection:text-emerald-300">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">hexbuffer-proxy</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
            {/* Sticky Sidebar Table of Contents */}
            <aside className="hidden lg:block shrink-0 sticky top-28 self-start border-r border-border/40 pr-6 h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin">
              <div className="px-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  On this page
                </span>
              </div>
              <nav className="space-y-1">
                {navSections.map((sec) => (
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

              <div className="mt-8 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <Flame className="size-4 text-emerald-400" />
                  <span>Crab MITM Power</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  High-performance stream pooling, zero heap allocation frame splitting, and Tokio async runtime integration.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="min-w-0 flex-1">
              {/* HERO SECTION */}
              <section id="overview" className="mb-16">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
                    <Sparkles className="size-3.5" />
                    Rust MITM Library
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground">
                    Tokio • Hyper • rustls
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
                  hexbuffer-proxy
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                  A high-performance HTTPS Man-in-the-Middle (MITM) proxy library for Rust built on{" "}
                  <strong className="text-foreground font-semibold">Tokio</strong>,{" "}
                  <strong className="text-foreground font-semibold">Hyper</strong>, and{" "}
                  <strong className="text-foreground font-semibold">rustls</strong>. Provides connection pooling, WebSocket frame-level interception, and dynamic TLS certificate forging.
                </p>

                {/* Feature Flags */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                    Feature Flags
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">Feature</th>
                          <th className="px-4 py-3">Default</th>
                          <th className="px-4 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr>
                          <td className="px-4 py-3 font-mono font-semibold text-emerald-400">
                            decoder
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">
                            Enabled
                          </td>
                          <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                            Application-level request/response body decompression (<code>decode_request</code>, <code>decode_response</code>), re-encoding (<code>encode_body</code>), and <code>DecodeHandler</code> plugin for gzip, deflate, brotli, and zstd.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* QUICK START SECTION */}
              <section id="quickstart" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="size-5 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-foreground">Quick Start — Minimal Proxy</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Set up a pass-through HTTPS proxy server listening on <code>127.0.0.1:8080</code> in under 20 lines of Rust code.
                </p>

                <CodeBlock
                  language="rust"
                  filename="src/main.rs"
                  showLineNumbers
                  code={`use hexbuffer_proxy::{CertificationAuthority, ProxyBuilder};
use tokio_rustls::rustls::crypto::aws_lc_rs::default_provider;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 1. Install rustls crypto provider (required before any TLS operations)
    let _ = default_provider().install_default();

    // 2. Initialize CA (loads from or creates cert/ca.pem and cert/ca-key.pem)
    let ca = CertificationAuthority::new();

    // 3. Build and run the proxy (defaults to 127.0.0.1:8080 and pass-through NoopHandler)
    ProxyBuilder::new()
        .with_ca(ca)
        .build()?
        .start()
        .await?;

    Ok(())
}`}
                />

                <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-4 text-xs text-blue-300/90 leading-relaxed">
                  <strong className="text-blue-200">Note:</strong> Configure your application or browser to proxy traffic through <code>127.0.0.1:8080</code> and trust <code>cert/ca.pem</code> for HTTPS interception.
                </div>
              </section>

              {/* ARCHITECTURE SECTION */}
              <section id="architecture" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="size-5 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-foreground">Architecture & Pipeline Flow</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Understand how <code>hexbuffer-proxy</code> handles TCP connections, TLS certificate forging, HTTP handler chains, and WebSocket upgrades.
                </p>

                <ProxyArchitecture />
              </section>

              {/* PUBLIC API REFERENCE SECTION */}
              <section id="api-reference" className="mb-16 scroll-mt-24">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-foreground">Public API Reference</h2>
                  </div>
                  <div className="relative w-48 sm:w-64">
                    <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
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
                  <h3 className="text-base font-semibold text-foreground mb-3">Re-exports (Crate Root)</h3>
                  <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-2.5">Symbol</th>
                          <th className="px-4 py-2.5">Kind</th>
                          <th className="px-4 py-2.5">Module</th>
                          <th className="px-4 py-2.5">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {[
                          ["ProxyBuilder", "struct", "builder", "Builder-pattern proxy configuration and assembly"],
                          ["Proxy", "struct", "builder", "Ready-to-run proxy instance"],
                          ["CertificationAuthority", "struct", "ca", "CA certificate authority & per-domain certificate forging"],
                          ["HttpHandler", "trait", "handler", "Trait for inspecting/modifying HTTP requests & responses"],
                          ["WebSocketHandler", "trait", "handler", "Trait for inspecting/modifying WebSocket frames"],
                          ["NoopHandler", "struct", "handler", "Pass-through HttpHandler implementation (default)"],
                          ["NoopWebSocketHandler", "struct", "handler", "Pass-through WebSocketHandler implementation"],
                          ["HttpContext", "struct", "handler", "Metadata for an intercepted HTTP request/response pair"],
                          ["Body", "enum", "handler", "HTTP body representation (Streaming or Full)"],
                          ["RequestOrResponse", "enum", "handler", "Return value of handle_request (forward vs short-circuit)"],
                          ["Direction", "enum", "handler", "WebSocket frame direction (ClientToServer / ServerToClient)"],
                          ["WebSocketMessage", "type", "handler", "Re-export of tokio_tungstenite::tungstenite::Message"],
                          ["full_body", "fn", "handler", "Helper function creating Full<Bytes> body from bytes"],
                          ["ProxyError", "enum", "error", "Error variants returned by proxy operations"],
                          ["Result<T>", "type", "error", "Alias for std::result::Result<T, ProxyError>"],
                          ["decoder", "module", "decoder", "Application-level body decompression/re-encoding module"],
                        ]
                          .filter(([sym]) => sym.toLowerCase().includes(apiSearch.toLowerCase()))
                          .map(([sym, kind, mod, desc]) => (
                            <tr key={sym} className="hover:bg-muted/40 transition-colors">
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

                {/* Detailed Symbol Reference Accordions / Cards */}
                <div className="space-y-6">
                  {/* ProxyBuilder */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">ProxyBuilder</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Builder struct for assembling and configuring a <code>Proxy</code>.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`pub fn new() -> Self
pub fn with_addr(mut self, addr: impl Into<SocketAddr>) -> Self
pub fn with_ca(mut self, ca: CertificationAuthority) -> Self
pub fn with_http_handler(mut self, handler: impl HttpHandler + 'static) -> Self
pub fn add_http_handler(mut self, handler: impl HttpHandler + 'static) -> Self
pub fn with_ws_handler(mut self, handler: impl WebSocketHandler + 'static) -> Self
pub fn with_request_buffer_size(mut self, size: usize) -> Self
pub fn with_enabled(self, enabled: bool) -> Self
pub fn enabled_flag(&self) -> Arc<AtomicBool>
pub fn with_cert_dir(mut self, dir: impl Into<PathBuf>) -> Self
pub fn build(self) -> Result<Proxy>`}
                    />
                  </div>

                  {/* Proxy */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">Proxy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      A fully assembled proxy server instance created by <code>ProxyBuilder::build</code>.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`pub fn is_enabled(&self) -> bool
pub fn set_enabled(&self, enabled: bool)
pub fn enable(&self)
pub fn disable(&self)
pub fn enabled_flag(&self) -> Arc<AtomicBool>
pub async fn start(self) -> Result<()>`}
                    />
                  </div>

                  {/* CertificationAuthority */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">
                      CertificationAuthority
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Handles self-signed CA generation, file persistence, and dynamic per-host TLS certificate forging.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`pub fn new() -> Self
pub fn new_in(dir: impl Into<PathBuf>) -> Self
pub fn ca_cert_pem(&self) -> &str
pub fn forge_certificate(&self, host: &str) -> (Vec<u8>, Vec<u8>)`}
                    />
                  </div>

                  {/* HttpHandler */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">HttpHandler (trait)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Core trait for inspecting or mutating HTTP traffic flowing through the proxy pipeline.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`#[async_trait]
pub trait HttpHandler: Send + Sync {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse>;

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>>;

    async fn should_intercept_tls(&self, _host: &str) -> bool {
        true
    }
}`}
                    />
                  </div>

                  {/* WebSocketHandler */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">
                      WebSocketHandler (trait)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Trait for frame-level inspection and modification of WebSocket traffic.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`#[async_trait]
pub trait WebSocketHandler: Send + Sync {
    async fn on_upgrade(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Request<Body> {
        request
    }

    async fn on_frame(
        &self,
        _ctx: &mut HttpContext,
        frame: WebSocketMessage,
        _direction: Direction,
    ) -> Option<WebSocketMessage> {
        Some(frame)
    }

    async fn on_close(&self, _ctx: &mut HttpContext) {}
}`}
                    />
                  </div>

                  {/* ProxyError */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-lg font-bold font-mono text-emerald-400 mb-2">ProxyError & Result</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive error variants returned by proxy operations.
                    </p>
                    <CodeBlock
                      language="rust"
                      code={`#[derive(Error, Debug)]
pub enum ProxyError {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    #[error("TLS error: {0}")]
    Tls(#[from] tokio_rustls::rustls::Error),

    #[error("HTTP error: {0}")]
    Hyper(#[from] hyper::Error),

    #[error("invalid HTTP: {0}")]
    Http(#[from] http::Error),

    #[error("certificate error: {0}")]
    Cert(String),

    #[error("connection failed: {0}")]
    Connection(String),

    #[error("protocol error: {0}")]
    Protocol(String),
}

pub type Result<T> = std::result::Result<T, ProxyError>;`}
                    />
                  </div>
                </div>
              </section>

              {/* USAGE RECIPES SECTION */}
              <section id="recipes" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="size-5 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-foreground">Usage Recipes</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Select a recipe below to view common implementation patterns and handler code.
                </p>

                {/* Hexbuffer styled ButtonGroup */}
                <div className="mb-6">
                  <ButtonGroup>
                    {recipes.map((r) => {
                      const isActive = activeRecipe === r.id;
                      return (
                        <Button
                          key={r.id}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "hover:text-green-500 transition-colors text-xs",
                            isActive && "text-green-500 border-green-500/50 bg-green-500/10 font-semibold"
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
                  <h3 className="text-xl font-bold text-foreground mb-2">{currentRecipeObj.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{currentRecipeObj.description}</p>

                  <CodeBlock
                    language="rust"
                    showLineNumbers
                    code={currentRecipeObj.code}
                  />
                </div>
              </section>

              {/* GRACEFUL SHUTDOWN SECTION */}
              <section id="shutdown" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="size-5 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-foreground">Graceful Shutdown</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Handle Ctrl+C signals gracefully using <code>tokio::select!</code>:
                </p>

                <CodeBlock
                  language="rust"
                  showLineNumbers
                  code={`let proxy = ProxyBuilder::new().build()?;

tokio::select! {
    res = proxy.start() => {
        if let Err(e) = res {
            eprintln!("Proxy server error: {e}");
        }
    }
    _ = tokio::signal::ctrl_c() => {
        println!("Shutting down proxy listener...");
    }
}`}
                />
              </section>

              {/* FOOTER CTA */}
              <div className="rounded-2xl border border-emerald-900/50 bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-950 p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ready to Intercept Traffic with hexbuffer-proxy?
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
                  Integrate high-speed MITM proxy capabilities into your security tools, web fuzzers, or test automation suites today.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold" asChild>
                    <a href="https://github.com/arhamymr/hexbuffer" target="_blank" rel="noreferrer">
                      Star on GitHub <ExternalLink className="size-4 ml-1.5" />
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
