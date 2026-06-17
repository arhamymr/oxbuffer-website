import { ArticleForm } from "../../components/article-form";

export const metadata = {
  title: "New Article — hexbuffer Admin",
};

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">New Article</h1>
        <p className="text-sm text-muted-foreground">
          Create a new blog article.
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}
