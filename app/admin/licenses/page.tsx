import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getAdminApiKey, verifyAdmin } from "../lib/auth";
import { getAllLicenses } from "../lib/db";
import { LicenseTable } from "../components/license-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Licenses — 0xbuffer Admin",
};

export default async function AllLicensesPage() {
  const apiKey = await getAdminApiKey();
  if (!apiKey || !verifyAdmin(apiKey)) redirect("/admin/login");

  const licenses = await getAllLicenses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Licenses</h1>
          <p className="text-sm text-muted-foreground">
            Manage all issued license keys.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/licenses/new">
            <PlusCircle className="size-3.5" />
            New License
          </Link>
        </Button>
      </div>

      <LicenseTable licenses={licenses} />
    </div>
  );
}
