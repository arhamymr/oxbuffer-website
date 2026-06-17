import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "./install-command";
import { WindowsDownloads } from "./windows-downloads";

export const metadata: Metadata = {
  title: "Downloads — hexbuffer",
  description: "Download hexbuffer with the official install script.",
};

export default function Downloads() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Downloads" />
          <h1 className="text-4xl mb-2 mt-20">Downloads</h1>
          <p className="text-muted-foreground mb-8">
            Install the latest hexbuffer distribution from the terminal.
          </p>

          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg">macOS</h2>
              <Badge variant="secondary">Latest</Badge>
            </div>
            <InstallCommand />
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-muted-foreground">
              <h3 className="mb-2 font-medium text-foreground">macOS security notice</h3>
              <p>
                hexbuffer is currently distributed without Apple Developer ID signing or notarization. The
                terminal installer copies the app into /Applications, but it does not make the app
                Apple-verified. Depending on how the app is installed and your macOS security settings,
                macOS may or may not show an unidentified developer warning.
              </p>
              <p className="mt-2">
                The installer verifies the downloaded DMG with SHA256 to detect corruption or incomplete
                downloads. The checksum is served from the same official release source, so only install
                hexbuffer from the official website.
              </p>
            </div>
          </div>

          {/* <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg">Linux</h2>
              <Badge variant="secondary">Latest</Badge>
            </div>
            <InstallCommand />
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              <h3 className="mb-2 font-medium text-foreground">System requirements</h3>
              <p>
                The AppImage bundles all application dependencies, but your system must provide
                WebKitGTK 4.1 (<code className="text-xs bg-background px-1 py-0.5 rounded">libwebkit2gtk-4.1</code>)
                and a Secret Service daemon such as gnome-keyring or KDE Wallet for secure credential storage.
              </p>
              <p className="mt-2">
                The installer places the AppImage in <code className="text-xs bg-background px-1 py-0.5 rounded">~/.local/bin</code> (override with <code className="text-xs bg-background px-1 py-0.5 rounded">OXBUFFER_INSTALL_DIR</code>),
                creates a symlink for CLI access, and adds a desktop entry for application menu integration.
                SHA256 checksum verification ensures download integrity.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg">Windows</h2>
              <Badge variant="secondary">Latest</Badge>
            </div>
            <WindowsDownloads />
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h3 className="mb-2 font-medium text-foreground">WebView2 requirement</h3>
                <p>
                  The installer will automatically download and install the WebView2 runtime if it is not
                  already present on your system. An internet connection is required during installation.
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <h3 className="mb-2 font-medium text-foreground">Windows SmartScreen notice</h3>
                <p>
                  hexbuffer is not code-signed with an EV certificate. Windows SmartScreen may show a
                  warning when running the installer — click &ldquo;More info&rdquo; then &ldquo;Run anyway&rdquo; to proceed.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
