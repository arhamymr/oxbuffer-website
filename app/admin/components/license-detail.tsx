"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Ban, ArrowLeft, Calendar, Mail, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revokeLicenseAction } from "../lib/actions";
import type { LicenseWithActivations } from "../lib/db";

interface LicenseDetailProps {
  license: LicenseWithActivations;
}

export function LicenseDetail({ license }: LicenseDetailProps) {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [revoked, setRevoked] = useState(license.status === "revoked");
  const [revoking, setRevoking] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRevoke = async () => {
    if (!confirm("Are you sure you want to revoke this license?")) return;
    setRevoking(true);
    const result = await revokeLicenseAction(null, license.key);
    if (result.success) {
      setRevoked(true);
    } else {
      setRevoking(false);
      alert(result.error);
    }
  };

  const activationPercent = Math.min(
    100,
    (license.activationCount / license.maxDevices) * 100
  );

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/admin/licenses")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to licenses
      </button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-mono text-base">
              {license.key}
            </CardTitle>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => copyToClipboard(license.key, "key")}
            >
              {copied === "key" ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <DetailItem
              icon={Mail}
              label="Email"
              value={license.email || "---"}
            />
            <DetailItem
              label="Plan"
              value={license.plan}
              badge="secondary"
            />
            <DetailItem
              label="Status"
              value={revoked ? "revoked" : license.status}
              badge={
                revoked || license.status === "revoked"
                  ? "destructive"
                  : "default"
              }
            />
            <DetailItem
              icon={Calendar}
              label="Created"
              value={new Date(license.createdAt).toLocaleDateString()}
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Monitor className="size-3.5" />
                Activations
              </div>
              <span className="font-mono text-xs">
                {license.activationCount} / {license.maxDevices}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${activationPercent}%` }}
              />
            </div>
          </div>

          {!revoked && license.status !== "revoked" && (
            <div className="flex gap-2 border-t border-border pt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRevoke}
                disabled={revoking}
              >
                <Ban className="size-3.5" />
                {revoking ? "Revoking..." : "Revoke License"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  badge,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  badge?: "default" | "secondary" | "destructive";
}) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3" />}
        {label}
      </p>
      {badge ? (
        <Badge variant={badge} className="w-fit text-[10px]">
          {value}
        </Badge>
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
    </div>
  );
}
