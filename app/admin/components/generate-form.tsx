"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Copy, Check, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { generateLicense, type GenerateResult } from "../lib/actions";

export function GenerateForm() {
  const [state, formAction] = useActionState<GenerateResult | null, FormData>(
    generateLicense,
    null
  );
  const [copied, setCopied] = useState(false);

  if (state?.success) {
    const { data } = state;

    const copyKey = async () => {
      await navigator.clipboard.writeText(data.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const shareViaEmail = async () => {
      const subject = encodeURIComponent("Your 0xbuffer License Key");
      const body = encodeURIComponent(
        `Hi${data.email ? ` ${data.email}` : ""},\n\n` +
          `Your 0xbuffer license key:\n\n${data.key}\n\n` +
          `Plan: ${data.plan}\nMax devices: ${data.maxDevices}\n\n` +
          `Download 0xbuffer: https://0xbuffer.com/downloads\n\n` +
          `-- 0xbuffer`
      );
      window.open(`mailto:${data.email ?? ""}?subject=${subject}&body=${body}`);
    };

    return (
      <Card className="max-w-lg">
        <CardContent className="space-y-5 py-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">License Generated</p>
              <p className="text-xs text-muted-foreground">
                Copy the key below to share it.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-xs text-muted-foreground">License Key</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 break-all font-mono text-sm font-medium">
                {data.key}
              </code>
              <Button variant="outline" size="icon-sm" onClick={copyKey}>
                {copied ? (
                  <Check className="size-3.5 text-primary" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {data.email && (
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                {data.email}
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Plan:</span>{" "}
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {data.plan}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">Devices:</span>{" "}
              {data.maxDevices}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.email && (
              <Button variant="outline" size="sm" onClick={shareViaEmail}>
                <Mail className="size-3.5" />
                Share via Email
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href="/admin/licenses/new">Generate Another</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/admin/licenses">View All Licenses</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg">
      <CardContent className="space-y-4 py-2">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="customer@example.com"
            />
            <p className="text-xs text-muted-foreground">
              Optional. The customer&apos;s email for reference.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Plan</Label>
            <select
              id="plan"
              name="plan"
              defaultValue="lifetime"
              className="flex h-8 w-full rounded-sm border border-input bg-transparent px-2 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="lifetime">Lifetime</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxDevices">Max Devices</Label>
            <Input
              id="maxDevices"
              name="maxDevices"
              type="number"
              defaultValue={1}
              min={1}
              max={10}
            />
          </div>

          {state && !state.success && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <GenerateButton />
        </form>
      </CardContent>
    </Card>
  );
}

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate License"}
      {!pending && <ArrowRight className="size-3.5" />}
    </Button>
  );
}
