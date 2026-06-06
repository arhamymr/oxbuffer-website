import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getAdminApiKey, verifyAdmin } from "./lib/auth";
import { getStats, getRecentLicenses } from "./lib/db";
import { StatCards } from "./components/stat-cards";
import { LicenseTable } from "./components/license-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard — 0xbuffer",
};

export default async function AdminDashboard() {
  const apiKey = await getAdminApiKey();
  if (!apiKey || !verifyAdmin(apiKey)) redirect("/admin/login");

  const [stats, recentLicenses] = await Promise.all([
    getStats(),
    getRecentLicenses(10),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            License overview and recent activity.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/licenses/new">
            <PlusCircle className="size-3.5" />
            New License
          </Link>
        </Button>
      </div>

      <StatCards {...stats} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Recent Licenses</h2>
          <Link
            href="/admin/licenses"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <LicenseTable licenses={recentLicenses} compact />
      </div>
    </div>
  );
}
