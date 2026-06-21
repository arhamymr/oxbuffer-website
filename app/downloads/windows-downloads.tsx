"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const BASE_URL = "https://dist.0xbuffer.com";

const WINDOWS_ARCHES = [
  { key: "x86_64", label: "x64", suffix: "x86_64" },
  { key: "i686", label: "x86 (32-bit)", suffix: "i686" },
  { key: "aarch64", label: "ARM64", suffix: "aarch64" },
] as const;

export function WindowsDownloads() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/latest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.version) setVersion(data.version);
      })
      .catch(() => {});
  }, []);

  if (!version) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading download links&hellip;
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {WINDOWS_ARCHES.map((arch) => {
        const filename = `hexbuffer_${version}_${arch.suffix}_setup.exe`;
        const url = `${BASE_URL}/${filename}`;
        return (
          <a
            key={arch.key}
            href={url}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="size-4" />
            Windows {arch.label}
          </a>
        );
      })}
    </div>
  );
}
