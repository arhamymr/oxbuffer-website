import { redirect } from "next/navigation";
import { getAdminApiKey } from "../../lib/auth";
import { getLicenseByKey } from "../../lib/db";
import { LicenseDetail } from "../../components/license-detail";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  return {
    title: `${decodeURIComponent(key)} — 0xbuffer Admin`,
  };
}

export default async function LicenseDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const apiKey = await getAdminApiKey();
  if (!apiKey) redirect("/admin/login");

  const license = await getLicenseByKey(decodeURIComponent(key));

  if (!license) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-muted-foreground">License not found.</p>
        <a
          href="/admin/licenses"
          className="text-sm text-primary hover:underline"
        >
          Back to licenses
        </a>
      </div>
    );
  }

  return <LicenseDetail license={license} />;
}
