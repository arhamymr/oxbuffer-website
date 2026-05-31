export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-md">0xbufferr  ✦  @{new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Security Testing, Recon, and Reporting in One App
          </p>
          <span className="text-sm text-muted-foreground">
            Build by{" "}
            <a
              href="mailto:arhamymr@gmail.com"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              arhamymr@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
