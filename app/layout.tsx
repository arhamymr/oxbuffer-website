import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SideRays from "@/components/siderays";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0xbuffer — Web Security Testing Tools",
  description:
    "0xbuffer is a desktop application for web security testing, traffic interception, request crafting, automated recon, and professional report building.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <SideRays />
      </body>
      <GoogleAnalytics gaId="G-1C8QL0CLB9" />
    </html>
  );
}
