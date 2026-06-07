import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getAdminApiKey, verifyAdmin } from "../lib/auth";
import { getAllArticles } from "../lib/db";
import { ArticleTable } from "../components/article-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — 0xbuffer Admin",
};

export default async function AdminBlogPage() {
  const apiKey = await getAdminApiKey();
  if (!apiKey || !verifyAdmin(apiKey)) redirect("/admin/login");

  const articles = await getAllArticles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Manage articles and blog posts.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="size-3.5" />
            New Article
          </Link>
        </Button>
      </div>

      <ArticleTable articles={articles} />
    </div>
  );
}
