import { redirect } from "next/navigation";
import { getAdminApiKey, verifyAdmin } from "../../../lib/auth";
import { getArticleById } from "../../../lib/db";
import { ArticleForm } from "../../../components/article-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Edit Article — hexbuffer Admin`,
  };
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiKey = await getAdminApiKey();
  if (!apiKey || !verifyAdmin(apiKey)) redirect("/admin/login");

  const article = await getArticleById(id);

  if (!article) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-muted-foreground">Article not found.</p>
        <a
          href="/admin/blog"
          className="text-sm text-primary hover:underline"
        >
          Back to blog
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Edit Article</h1>
        <p className="text-sm text-muted-foreground">
          Update &ldquo;{article.title}&rdquo;
        </p>
      </div>

      <ArticleForm article={article} />
    </div>
  );
}
