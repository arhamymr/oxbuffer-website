import { Asterisk, Circle, Globe, MoreVertical, Move, Send, GripHorizontal} from "lucide-react";

const tabs = ["All History", "id.linkedin.com", "web.facebook.com"];

const trafficRows = [
  ["12:24:53", "POST", "301", "traffic.google.com", "/c2dm/register3", "25B", "73B", "text/plain; cha..."],
  ["12:22:05", "POST", "200", "optimizationguide-pa.account.com", "/v1:GetModels", "8.4KB", "1.2KB", "application/x-p..."],
  ["12:21:56", "POST", "200", "pages.google.com", "/ListAccounts", "0B", "1B", "application/bin..."],
  ["12:21:56", "POST", "200", "update.facebook.com", "/service/update2/json", "290B", "1.1KB", "application/jso..."],
  ["12:21:56", "GET", "200", "www.google.com", "/async/folae", "291B", "0B", "application/x-p..."],
  ["11:46:59", "GET", "307", "id.linkedin.com", "/blog/ai-computer-vision", "52B", "0B", "-"],
];

const requestLines = [
  "POST /list?gpsia=1&source=ChromiumBrowser&json=standard&laf=b64bin HTTP/1.1",
  "connection: keep-alive",
  "host: acc.google.com",
  "content-length: 1",
  "user-agent: ChromiumBrowser/148.0",
];

const responseLines = [
  "HTTP/1.1 200 OK",
  "access-control-allow-credentials: true",
  "date: Sun, 31 May 2026 04:21:56 GMT",
  "access-control-allow-origin: https://www.google.com",
];

function MethodBadge({ value }: { value: string }) {
  const color = value === "GET" ? "border-emerald-500/70 text-emerald-500" : "border-blue-500/70 text-blue-500";

  return (
    <span className={`rounded-[4px] border px-1.5 py-0.5 text-[10px] font-bold ${color}`}>
      {value}
    </span>
  );
}

function StatusBadge({ value }: { value: string }) {
  const color =
    value === "200"
      ? "border-emerald-500/70 text-emerald-500"
      : value === "304" || value === "307"
        ? "border-blue-500/70 text-blue-500"
        : "border-sky-500/70 text-sky-500";

  return <span className={`rounded-[4px] border px-1.5 py-0.5 text-[10px] font-bold ${color}`}>{value}</span>;
}

function CodeBlock({ title, badge, lines }: { title: string; badge?: string; lines: string[] }) {
  return (
    <div className="min-w-0 border-r border-foreground/10 last:border-r-0">
      <div className="flex h-9 items-center justify-between border-b border-foreground/10 bg-background/30 px-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground">{title}</span>
          {badge ? <StatusBadge value={badge} /> : null}
        </div>
        <MoreVertical className="size-4 text-muted-foreground" />
      </div>
      <div className="px-2 py-2">
        <div className="h-28 overflow-hidden rounded border border-foreground/10 bg-background/20 px-3 py-2 font-mono text-[10px] leading-5 text-muted-foreground">
          {lines.map((line, index) => (
            <div className="grid grid-cols-[20px_minmax(0,1fr)] gap-3" key={`${title}-${line}`}>
              <span className="text-right text-muted-foreground/60">{index + 1}</span>
              <span className={index === 0 ? "truncate text-foreground" : "truncate"}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrafficIllustration() {
  return (
    <div
      aria-label="hexbuffer live traffic interface illustration"
      className="relative h-full min-h-[420px] w-full overflow-hidden rounded-md border border-foreground/15 bg-background/30 text-foreground shadow-[0_24px_80px_rgb(0_0_0/0.14)] backdrop-blur"
    >
      <div className="flex h-9 items-center justify-between border-b border-foreground/10 px-4">
        <div className="flex items-center gap-4">
          <GripHorizontal className="size-4 text-muted-foreground" />

          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-20 rounded-full bg-foreground/35" />
          </div>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="h-2 w-16 rounded-full bg-foreground/20" />
            <span className="h-2 w-14 rounded-full bg-foreground/20" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid size-6 place-items-center rounded-md border border-foreground/15 text-emerald-500">
            <Asterisk className="size-3" />
          </div>
          <span className="h-4 w-8 rounded-full border border-emerald-500 before:block before:ml-4 before:size-3.5 before:rounded-full before:border before:border-emerald-500" />
          <Globe className="size-4 text-foreground" />
          <span className="h-5 border-l border-foreground/10" />
          <Circle className="size-3 text-yellow-500" />
          <Circle className="size-3 text-emerald-500" />
          <Circle className="size-3 text-red-500" />
        </div>
      </div>

      <div className="flex h-11 items-end gap-1 border-b border-emerald-500/70 px-2">
        {tabs.map((tab, index) => (
          <div
            className={
              index === 0
                ? "rounded-t-md border border-b-0 border-emerald-500 px-3 py-2 text-xs font-bold text-foreground"
                : "rounded-t-md border border-b-0 border-foreground/15 px-3 py-2 text-xs text-muted-foreground"
            }
            key={tab}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="space-y-2 border-b border-foreground/10 p-2">
        <div className="flex items-center gap-3">
          <div className="h-8 flex-1 rounded-md border border-foreground/15 bg-background/20 px-3 py-1.5 text-xs text-muted-foreground">
            Search URL, host, method, body...
          </div>
          <div className="hidden items-center gap-2 text-xs font-bold text-foreground md:flex">
            HTTP
            <span className="h-4 w-8 rounded-full border border-foreground/20 before:block before:size-3.5 before:rounded-full before:border before:border-foreground/40" />
            <span className="font-normal text-muted-foreground">WebSocket</span>
          </div>
          <div className="rounded-md border border-emerald-500 px-3 py-2 text-[10px] font-bold text-emerald-500">TARGET</div>
        </div>
        <div className="flex items-center justify-end text-[11px] text-muted-foreground">
          <div className="hidden items-center gap-1 lg:flex">
            <span>Filter by:</span>
            {["GET", "POST", "DELETE"].map((filter) => (
              <span className="rounded-md border border-foreground/15 px-2 py-1 font-semibold text-foreground" key={filter}>
                {filter}
              </span>
            ))}
            <span className="ml-2">Status:</span>
            {["2xx", "3xx"].map((status) => (
              <span className="rounded-md border border-foreground/15 px-2 py-1 font-semibold text-foreground" key={status}>
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden font-mono text-[11px]">
        <div className="grid grid-cols-[80px_120px_minmax(200px,1fr)_minmax(220px,1.4fr)_70px_54px] border-b border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-muted-foreground">
          {["Time ↓", "Method", "Host", "Path", "Size", "Action"].map((heading) => (
            <span key={heading}>{heading}</span>
          ))}
        </div>
        {trafficRows.map((row, index) => (
          <div
            className={`grid grid-cols-[80px_120px_minmax(200px,1fr)_minmax(220px,1.4fr)_70px_54px] border-b border-foreground/10 px-3 py-2 ${
              index === 2 ? "bg-emerald-500/[0.04]" : "bg-transparent"
            }`}
            key={`${row[0]}-${row[3]}-${index}`}
          >
            <span className="text-muted-foreground">{row[0]}</span>
            <span className="flex gap-1">
              <MethodBadge value={row[1]} />
              <StatusBadge value={row[2]} />
            </span>
            <span className="truncate font-semibold text-foreground">{row[3]}</span>
            <span className="flex items-center">
              <span className="h-1.5 w-36 rounded-full bg-foreground/20" />
            </span>
            <span className="text-right text-muted-foreground">{row[5]}</span>
            <span className="flex justify-end text-foreground">
              <Send className="size-4" />
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-7 grid grid-cols-2 border-y border-foreground/10 bg-background/40 backdrop-blur">
        <CodeBlock title="Request" lines={requestLines} />
        <CodeBlock title="Response" badge="200" lines={responseLines} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-7 items-center gap-3 border-t border-foreground/10 bg-background/50 px-4">
        <span className="h-1.5 w-32 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-40 rounded-full bg-foreground/20" />
      </div>
    </div>
  );
}
