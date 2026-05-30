export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">0xbuffer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for security researchers, by security researchers.
          </p>
        </div>
      </div>
    </footer>
  );
}