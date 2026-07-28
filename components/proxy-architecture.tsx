"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Cpu,
  ArrowDown,
  ArrowRight,
  Server,
  Layers,
  Radio,
  FileCode2,
  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "interception",
    step: "Step 1",
    title: "TLS Interception Check",
    icon: Lock,
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
    icon: Layers,
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
    icon: Server,
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
    icon: Zap,
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
    icon: Radio,
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
    <div className="my-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 p-6 shadow-xl backdrop-blur-lg">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <Cpu className="size-5 text-emerald-400" />
            <span>hexbuffer-proxy Execution Lifecycle</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click any phase in the pipeline flow to inspect runtime hooks and behavior.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-emerald-400">
          <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
          Tokio • Hyper • rustls
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = s.id === activeStep;

          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={cn(
                "relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all group",
                isActive
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/40"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200"
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                  {s.step}
                </span>
                <Icon
                  className={cn(
                    "size-4",
                    isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                />
              </div>
              <span className="text-xs font-medium line-clamp-2 leading-tight">
                {s.title}
              </span>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-zinc-700">
                  <ArrowRight className="size-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400">
              {current.step}
            </span>
            <h4 className="text-base font-medium text-zinc-100">{current.title}</h4>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            {current.badge}
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-4">{current.description}</p>

        <div className="flex items-center gap-2 pt-3 border-t border-zinc-900 text-xs font-mono text-cyan-400">
          <FileCode2 className="size-4 shrink-0 text-cyan-400" />
          <span className="text-zinc-400">Primary Hook:</span>
          <code className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-cyan-300 overflow-x-auto max-w-full">
            {current.hook}
          </code>
        </div>
      </div>
    </div>
  );
}
