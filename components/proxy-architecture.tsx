"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "interception",
    step: "Step 1",
    title: "TLS Interception Check",
    summary: "Dynamic Certificate Forging & Bypass Evaluation",
    description:
      "Evaluates `should_intercept_tls(host)` and `is_enabled()`. If false, raw TCP tunneling bypasses decryption (ideal for cert-pinned domains). If true, on-the-fly CA certificate forging generates dynamic DER certificates via rcgen.",
    badge: "Security & TLS",
    hook: "HttpHandler::should_intercept_tls(&self, host: &str)",
  },
  {
    id: "req_pipeline",
    step: "Step 2",
    title: "HTTP Request Pipeline",
    summary: "Chain of Responsibility Request Inspection",
    description:
      "Passes incoming `Request<Body>` through registered `HttpHandler` instances sequentially. Handlers can mutate headers/body, or return `RequestOrResponse::Response` to short-circuit and mock/block responses immediately.",
    badge: "HttpHandler Pipeline",
    hook: "HttpHandler::handle_request(&self, ctx, req)",
  },
  {
    id: "upstream",
    step: "Step 3",
    title: "Upstream Connection Pool",
    summary: "Hyper Client Pool & Stream Multiplexing",
    description:
      "Forwards non-short-circuited requests upstream using high-performance Hyper client connection pools over HTTP/1.1 or TLS with optimized buffer streaming.",
    badge: "Network IO",
    hook: "hyper::client / tokio_rustls",
  },
  {
    id: "res_pipeline",
    step: "Step 4",
    title: "HTTP Response Pipeline",
    summary: "Reverse Response Processing & Body Modification",
    description:
      "Upstream `Response<Body>` flows back through the `HttpHandler` chain in REVERSE insertion order. Features optional gzip/brotli/zstd decompression (`decoder` feature) or HTML body injection before returning to client.",
    badge: "HttpHandler Pipeline",
    hook: "HttpHandler::handle_response(&self, ctx, res)",
  },
  {
    id: "ws_upgrade",
    step: "Step 5",
    title: "WebSocket Frame Interception",
    summary: "Frame-Level Duplex Interception",
    description:
      "After an HTTP 101 Upgrade, connection transitions to `WebSocketHandler`. Intercepts, modifies, or drops frames in real-time (`Direction::ClientToServer` or `Direction::ServerToClient`).",
    badge: "WebSocket Tunnel",
    hook: "WebSocketHandler::on_frame(&self, ctx, frame, dir)",
  },
];

export function ProxyArchitecture() {
  const [activeStep, setActiveStep] = useState<string>("interception");

  const current = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            hexbuffer-proxy Execution Lifecycle
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click any phase in the pipeline flow to inspect runtime hooks and behavior.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-muted border border-border rounded-full px-3 py-1 text-primary">
          <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
          Tokio • Hyper • rustls
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {steps.map((s) => {
          const isActive = s.id === activeStep;

          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={cn(
                "flex flex-col items-start p-3.5 rounded-xl border text-left transition-all group cursor-pointer",
                isActive
                  ? "border-primary/60 bg-primary/10 text-primary font-semibold shadow-sm"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-border/80 hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <div className="w-full mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {s.step}
                </span>
              </div>
              <span className="text-xs font-medium line-clamp-2 leading-tight">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="rounded-xl border border-border bg-muted/20 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/20 border border-primary/40 text-primary">
              {current.step}
            </span>
            <h4 className="text-base font-medium text-foreground">{current.title}</h4>
          </div>
          <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded border border-border">
            {current.badge}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{current.description}</p>

        <div className="flex items-center gap-2 pt-3 border-t border-border/60 text-xs font-mono text-primary">
          <span className="text-muted-foreground">Primary Hook:</span>
          <code className="bg-muted border border-border px-2 py-0.5 rounded text-primary overflow-x-auto max-w-full">
            {current.hook}
          </code>
        </div>
      </div>
    </div>
  );
}
