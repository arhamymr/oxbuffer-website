import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { MarkdownContent } from "@/lib/markdown";
import { ArrowLeft, Calendar } from "lucide-react";
import { getArticleBySlug } from "@/app/admin/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "published") {
    return { title: "Not Found — 0xbuffer" };
  }
  return {
    title: `${article.title} — 0xbuffer Blog`,
    description: article.excerpt ?? undefined,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  const date = article.publishedAt ?? article.createdAt;

  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current={article.title} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to blog
          </Link>

          <h1 className="text-4xl font-normal mb-3">{article.title}</h1>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-12">
            <Calendar className="size-3.5" />
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <MarkdownContent markdown={article.content} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
