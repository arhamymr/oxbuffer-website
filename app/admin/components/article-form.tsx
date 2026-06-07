"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  createArticleAction,
  updateArticleAction,
  type ArticleResult,
} from "../lib/actions";
import type { Article } from "../lib/db";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200);
}

interface ArticleFormProps {
  article?: Article;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!article;

  const action = isEdit ? updateArticleAction : createArticleAction;

  const [state, formAction] = useActionState<ArticleResult | null, FormData>(
    action,
    null
  );

  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!slugManuallyEdited || !slug) {
      setSlug(slugify(e.target.value));
    }
  };

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/blog");
    }
  }, [state?.success, router]);

  return (
    <Card className="max-w-2xl">
      <CardContent className="space-y-4 py-2">
        <form action={formAction} className="space-y-4">
          {isEdit && article && (
            <input type="hidden" name="id" value={article.id} />
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={article?.title ?? ""}
              placeholder="Article title"
              onBlur={handleTitleBlur}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManuallyEdited(true);
              }}
              placeholder="article-url-slug"
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier. Auto-generated from title.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={article?.excerpt ?? ""}
              placeholder="Short summary for listing pages"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={article?.content ?? ""}
              placeholder="Write your article in Markdown..."
              className="min-h-[300px] font-mono"
              rows={16}
            />
            <p className="text-xs text-muted-foreground">
              Supports Markdown: headings, bold, links, lists.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={article?.status ?? "draft"}
              className="flex h-8 w-full rounded-sm border border-input bg-transparent px-2 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {state && !state.success && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <SubmitButton isEdit={isEdit} />
            <Button variant="ghost" size="sm" asChild>
              <a href="/admin/blog">
                <ArrowLeft className="size-3.5" />
                Back
              </a>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending
        ? isEdit
          ? "Saving..."
          : "Creating..."
        : isEdit
          ? "Save Changes"
          : "Create Article"}
      {!pending && <ArrowRight className="size-3.5" />}
    </Button>
  );
}
