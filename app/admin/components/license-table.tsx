"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, Check, Search, Ban, ExternalLink, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { revokeLicenseAction } from "../lib/actions";
import type { LicenseWithActivations } from "../lib/db";

interface LicenseTableProps {
  licenses: LicenseWithActivations[];
  compact?: boolean;
}

export function LicenseTable({ licenses, compact = false }: LicenseTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "revoked"
  >("all");

  const filtered = licenses.filter((lic) => {
    const matchesSearch =
      !search ||
      lic.key.toLowerCase().includes(search.toLowerCase()) ||
      lic.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || lic.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const displayed = compact ? filtered.slice(0, 10) : filtered;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-3">
      {!compact && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by key or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-8"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "active", "revoked"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="xs"
                onClick={() => setStatusFilter(status)}
              >
                {status === "all"
                  ? "All"
                  : status === "active"
                    ? "Active"
                    : "Revoked"}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Key
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Email
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Plan
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Claimed
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Devices
              </th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">
                Created
              </th>
              <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-10 text-center text-sm text-muted-foreground"
                >
                  No licenses found.
                </td>
              </tr>
            ) : (
              displayed.map((license) => (
                <LicenseRow
                  key={license.id}
                  license={license}
                  onCopy={copyToClipboard}
                  onNavigate={() =>
                    router.push(
                      `/admin/licenses/${encodeURIComponent(license.key)}`
                    )
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {!compact && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} license{filtered.length !== 1 && "s"}
        </p>
      )}
    </div>
  );
}

function LicenseRow({
  license,
  onCopy,
  onNavigate,
}: {
  license: LicenseWithActivations;
  onCopy: (text: string) => void;
  onNavigate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onCopy(license.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncatedKey =
    license.key.length > 20
      ? `${license.key.slice(0, 10)}...${license.key.slice(-6)}`
      : license.key;

  return (
    <tr
      className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-muted/30"
      onClick={onNavigate}
    >
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <code className="font-mono text-xs">{truncatedKey}</code>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            title="Copy key"
          >
            {copied ? (
              <Check className="size-3 text-primary" />
            ) : (
              <Copy className="size-3" />
            )}
          </button>
        </div>
      </td>
      <td className="px-3 py-2.5 text-muted-foreground">
        {license.email || <span className="text-muted-foreground/50">---</span>}
      </td>
      <td className="px-3 py-2.5">
        <Badge variant="secondary" className="text-[10px]">
          {license.plan}
        </Badge>
      </td>
      <td className="px-3 py-2.5">
        <Badge
          variant={license.status === "active" ? "default" : "destructive"}
          className="text-[10px]"
        >
          {license.status}
        </Badge>
      </td>
      <td className="px-3 py-2.5">
        {license.activationCount > 0 ? (
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <UserCheck className="size-3" />
            Claimed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <UserX className="size-3" />
            Unclaimed
          </span>
        )}
      </td>
      <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
        {license.activationCount}/{license.maxDevices}
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground">
        {new Date(license.createdAt).toLocaleDateString()}
      </td>
      <td className="px-3 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <InlineRevokeButton licenseKey={license.key} status={license.status} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
            title="View details"
          >
            <ExternalLink className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function InlineRevokeButton({
  licenseKey,
  status,
}: {
  licenseKey: string;
  status: string;
}) {
  const [revoked, setRevoked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRevoke = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Revoke this license? This cannot be undone.")) return;
    setLoading(true);
    const result = await revokeLicenseAction(null, licenseKey);
    if (result.success) {
      setRevoked(true);
    } else {
      setLoading(false);
    }
  };

  if (status === "revoked" || revoked) {
    return (
      <span className="text-[10px] text-muted-foreground">Revoked</span>
    );
  }

  return (
    <button
      onClick={handleRevoke}
      disabled={loading}
      className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
      title="Revoke license"
    >
      <Ban className="size-3.5" />
    </button>
  );
}
