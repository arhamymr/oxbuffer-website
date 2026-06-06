import { Card, CardContent } from "@/components/ui/card";
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  Activity,
  type LucideIcon,
} from "lucide-react";

interface StatCardsProps {
  totalLicenses: number;
  activeLicenses: number;
  revokedLicenses: number;
  totalActivations: number;
}

const stats: { label: string; icon: LucideIcon; key: keyof StatCardsProps }[] = [
  { label: "Total Licenses", icon: KeyRound, key: "totalLicenses" },
  { label: "Active", icon: CheckCircle2, key: "activeLicenses" },
  { label: "Revoked", icon: XCircle, key: "revokedLicenses" },
  { label: "Total Activations", icon: Activity, key: "totalActivations" },
];

export function StatCards(props: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(({ label, icon: Icon, key }) => (
        <Card key={key} size="sm">
          <CardContent className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Icon className="size-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold leading-tight">
                {props[key]}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
