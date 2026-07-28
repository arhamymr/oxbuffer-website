"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

const STEPS = [
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
] as const;

export function ProxyArchitecture() {
  const [activeStep, setActiveStep] = useState<string>("interception");

  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  return (
    <div
      className={cn(
        // Layout & Positioning
        "my-8",
        // Sizing & Spacing
        "p-6 rounded-2xl",
        // Backgrounds & Borders
        "border border-border border-t-neutral-800 bg-card backdrop-blur-xl shadow-xl"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4",
          // Sizing & Spacing
          "mb-6"
        )}
      >
        <div>
          <h3
            className={cn(
              // Typography
              "text-lg font-semibold tracking-tight text-foreground"
            )}
          >
            hexbuffer-proxy Execution Lifecycle
          </h3>
          <p
            className={cn(
              // Typography
              "text-xs text-muted-foreground mt-0.5"
            )}
          >
            Click any phase in the pipeline flow to inspect runtime hooks and behavior.
          </p>
        </div>
        <div
          className={cn(
            // Layout & Positioning
            "flex items-center gap-2",
            // Sizing & Spacing
            "px-3 py-1 rounded-full",
            // Typography
            "text-xs font-mono text-emerald-400",
            // Backgrounds & Borders
            "bg-muted border border-border"
          )}
        >
          <span className={cn("inline-block size-2 rounded-full bg-emerald-400 animate-pulse")} />
          Tokio • Hyper • rustls
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div
        className={cn(
          // Layout & Positioning
          "grid grid-cols-1 md:grid-cols-5",
          // Sizing & Spacing
          "gap-3 mb-6"
        )}
      >
        {STEPS.map((s) => {
          const isActive = s.id === activeStep;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(s.id)}
              className={cn(
                // Layout & Positioning
                "flex flex-col items-start cursor-pointer text-left",
                // Sizing & Spacing
                "p-3.5 rounded-xl border",
                // Typography
                isActive ? "font-semibold text-emerald-400" : "text-muted-foreground",
                // Backgrounds & Borders
                isActive
                  ? "border-emerald-500 bg-muted shadow-sm"
                  : "border-border bg-background hover:border-neutral-700 hover:bg-muted hover:text-foreground",
                // Interactive & States
                "active:scale-95 transition-all duration-100 ease-out"
              )}
            >
              <div className={cn("w-full mb-1")}>
                <span className={cn("text-xs font-mono uppercase tracking-wider text-muted-foreground")}>
                  {s.step}
                </span>
              </div>
              <span className={cn("text-xs font-medium line-clamp-2 leading-tight")}>
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={CRITICALLY_DAMPED_SPRING}
          className={cn(
            // Sizing & Spacing
            "p-5 rounded-xl",
            // Backgrounds & Borders
            "border border-border bg-background/80 backdrop-blur-md"
          )}
        >
          <div
            className={cn(
              // Layout & Positioning
              "flex flex-wrap items-center justify-between gap-3",
              // Sizing & Spacing
              "mb-3"
            )}
          >
            <div className={cn("flex items-center gap-2")}>
              <span
                className={cn(
                  // Sizing & Spacing
                  "px-2 py-0.5 rounded",
                  // Typography
                  "text-xs font-mono font-semibold text-emerald-400",
                  // Backgrounds & Borders
                  "bg-muted border border-border"
                )}
              >
                {current.step}
              </span>
              <h4 className={cn("text-base font-medium text-foreground")}>{current.title}</h4>
            </div>
            <span
              className={cn(
                // Sizing & Spacing
                "px-2.5 py-1 rounded",
                // Typography
                "text-xs font-mono text-muted-foreground",
                // Backgrounds & Borders
                "bg-muted border border-border"
              )}
            >
              {current.badge}
            </span>
          </div>

          <p className={cn("text-sm text-muted-foreground leading-relaxed mb-4")}>{current.description}</p>

          <div
            className={cn(
              // Layout & Positioning
              "flex items-center gap-2 border-t border-border pt-3",
              // Typography
              "text-xs font-mono text-emerald-400"
            )}
          >
            <span className={cn("text-muted-foreground")}>Primary Hook:</span>
            <code
              className={cn(
                // Layout & Positioning
                "max-w-full overflow-x-auto",
                // Sizing & Spacing
                "px-2 py-0.5 rounded",
                // Typography
                "text-emerald-400 font-mono",
                // Backgrounds & Borders
                "bg-muted border border-border"
              )}
            >
              {current.hook}
            </code>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
