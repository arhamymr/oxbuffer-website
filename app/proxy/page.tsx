import type { Metadata } from "next";
import { ProxyPageClient } from "./client-page";

export const metadata: Metadata = {
  title: "hexbuffer-proxy — High-Performance Rust HTTPS MITM Proxy Library",
  description:
    "High-performance HTTPS MITM proxy library for Rust built on Tokio, Hyper, and rustls. Provides connection pooling, WebSocket frame-level interception, and dynamic TLS certificate forging.",
  keywords: [
    "Rust MITM proxy",
    "hexbuffer-proxy",
    "HTTPS proxy library",
    "Tokio proxy",
    "Hyper MITM",
    "rustls interception",
    "WebSocket interception",
  ],
};

export default function ProxyPage() {
  return <ProxyPageClient />;
}
