import type { ShowcaseItem } from "./types";

export const AUTO_CYCLE_INTERVAL_MS = 7000;
export const PAUSE_DURATION_MS = 4000;

export const SHOWCASE_ITEMS: readonly ShowcaseItem[] = [
  {
    id: "http-history",
    title: "HTTP History",
    tagline: "Live Traffic Stream & Deep Inspection",
    description:
      "Capture and inspect every HTTP and HTTPS transaction in real-time. Analyze request headers, query parameters, multipart bodies, and response latency with zero lag.",
    iconSrc: "/assets/app/http-history.png",
    category: "Traffic",
    badge: "Core Proxy",
    features: [
      "Real-time bidirectional stream capture",
      "Header, cookie, and body inspectors",
      "Instant search and status filtering",
    ],
    route: "/http-history",
  },
  {
    id: "intercept",
    title: "Intercept",
    tagline: "Mid-flight Traffic Interception & Tampering",
    description:
      "Hold live HTTP traffic mid-flight before it hits the target server or browser. Modify headers, rewrite request bodies, swap parameters, or drop unwanted packets on the fly.",
    iconSrc: "/assets/app/Intercept.png",
    category: "Traffic",
    badge: "Live Tamper",
    features: [
      "Mid-flight request and response holding",
      "Raw text and structured payload editors",
      "One-click forward, tamper, or drop",
    ],
    route: "/intercept",
  },
  {
    id: "repeater",
    title: "Repeater",
    tagline: "Iterative Request Replay",
    description:
      "Fine-tune HTTP requests and reissue them instantaneously. Analyze response status, headers, and body payloads across test iterations.",
    iconSrc: "/assets/app/repeater.png",
    category: "Testing",
    badge: "Analysis",
    features: [
      "Multi-tab request workspace",
      "Real-time response inspection",
      "Instant parameter mutations",
    ],
    route: "/repeater",
  },
  {
    id: "intruder",
    title: "Intruder",
    tagline: "High-Speed Automated Endpoint Fuzzing",
    description:
      "Pinpoint vulnerability surfaces with automated attacks. Place custom payload markers across headers or parameters, attach wordlists, and sort results by response delta.",
    iconSrc: "/assets/app/intruder.png",
    category: "Testing",
    badge: "Fuzzer",
    features: [
      "Visual payload marker positioning",
      "Custom wordlist & generator integration",
      "Real-time status & anomaly sorting",
    ],
    route: "/intruder",
  },
  {
    id: "port-scanner",
    title: "Port Scanner",
    tagline: "High-Speed Port Discovery & Service Recon",
    description:
      "Scan target hosts for open ports and running network services. Leverage preset port collections, stealth connection modes, and banner grabbing in a dedicated tab.",
    iconSrc: "/assets/app/port-scanner.png",
    category: "Recon",
    badge: "New Feature",
    isNew: true,
    features: [
      "Multi-threaded async TCP checks",
      "Top 100, 1000 & full port presets",
      "Service banner detection & stealth mode",
    ],
    route: "/port-scanner",
  },
  {
    id: "jwt",
    title: "JWT Analyzer",
    tagline: "Token Decoding, Editing & Cryptographic Signing",
    description:
      "Inspect, decode, and tamper with JSON Web Tokens. Edit header algorithms, modify payload claims, verify signatures, and audit for weak keys or none-algorithm flaws.",
    iconSrc: "/assets/app/jwt.png",
    category: "Testing",
    badge: "New Feature",
    isNew: true,
    features: [
      "Instant 3-part claim decoding",
      "Signature verification with secrets",
      "Token tampering for auth testing",
    ],
    route: "/jwt",
  },
  {
    id: "notes",
    title: "Notes & Scratchpad",
    tagline: "In-Context Markdown Workspace Documentation",
    description:
      "Record reproduction steps, store sample payloads, and document active targets without context switching. Notes persist seamlessly across your local sessions.",
    iconSrc: "/assets/app/notes.png",
    category: "Utility",
    badge: "Productivity",
    features: [
      "Markdown with syntax highlighting",
      "Quick PoC snippets & payload staging",
      "Local persistence in your workspace",
    ],
    route: "/notes",
  },
] as const;
