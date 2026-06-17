import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getPublishedArticles } from "@/app/admin/lib/db";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — hexbuffer",
  description: "Articles on web security testing, recon techniques, and hexbuffer workflows.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Blog" />
          <h1 className="text-4xl font-normal mb-3 mt-20">Blog</h1>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Articles on web security testing, recon techniques, and
            getting the most out of hexbuffer.
          </p>

          {articles.length === 0 ? (
            <p className="text-muted-foreground">No articles published yet.</p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blogs/${article.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-card/70"
                >
                  <h2 className="flex items-center gap-2 text-lg font-medium text-foreground mb-2">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date(article.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
