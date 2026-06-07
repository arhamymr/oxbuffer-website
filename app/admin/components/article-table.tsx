"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import Link from "next/link";
import { Search, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  deleteArticleAction,
  toggleArticleStatusAction,
  type SimpleResult,
} from "../lib/actions";
import type { Article } from "../lib/db";

interface ArticleTableProps {
  articles: Article[];
}

export function ArticleTable({ articles }: ArticleTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");

  const filtered = articles.filter((article) => {
    const matchesSearch =
      !search ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "draft", "published"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="xs"
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All" : status === "draft" ? "Draft" : "Published"}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Title</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Slug</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Status</th>
              <th className="px-3 py-2.5 font-medium text-muted-foreground">Created</th>
              <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No articles found.
                </td>
              </tr>
            ) : (
              filtered.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} article{filtered.length !== 1 && "s"}
        </p>
      )}
    </div>
  );
}

function ArticleRow({ article }: { article: Article }) {
  const router = useRouter();

  return (
    <tr className="border-b border-border transition-colors last:border-0 hover:bg-muted/30">
      <td className="px-3 py-2.5">
        <Link
          href={`/admin/blog/${article.id}/edit`}
          className="font-medium transition-colors hover:text-primary"
        >
          {article.title}
        </Link>
      </td>
      <td className="px-3 py-2.5">
        <code className="font-mono text-xs text-muted-foreground">{article.slug}</code>
      </td>
      <td className="px-3 py-2.5">
        <Badge
          variant={article.status === "published" ? "default" : "secondary"}
          className="text-[10px]"
        >
          {article.status}
        </Badge>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground">
        {new Date(article.createdAt).toLocaleDateString()}
      </td>
      <td className="px-3 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <ToggleStatusButton article={article} />
          <button
            onClick={() => router.push(`/admin/blog/${article.id}/edit`)}
            className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
            title="Edit article"
          >
            <Pencil className="size-3.5" />
          </button>
          <DeleteButton articleId={article.id} />
        </div>
      </td>
    </tr>
  );
}

function ToggleStatusButton({ article }: { article: Article }) {
  const [state, formAction] = useActionState<SimpleResult | null, string>(
    toggleArticleStatusAction,
    null
  );
  const [pending, setPending] = useState(false);

  const isPublished = article.status === "published";

  return (
    <form
      action={async () => {
        setPending(true);
        await formAction(article.id);
        setPending(false);
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        title={isPublished ? "Unpublish" : "Publish"}
      >
        {isPublished ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </button>
    </form>
  );
}

function DeleteButton({ articleId }: { articleId: string }) {
  const [state, formAction] = useActionState<SimpleResult | null, string>(
    deleteArticleAction,
    null
  );
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setPending(true);
    await formAction(articleId);
    setPending(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
      title="Delete article"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}
