import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { FloatingAiTutor } from "@/components/ai-tutor";
import { ORGANISATION, SITE } from "@/lib/site";

// Fonts are self-hosted via @fontsource CSS with correct Unicode ranges, so
// Devanagari and the South Indian scripts render without any runtime font request.

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} | ${ORGANISATION.ministry}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c2a43" },
    { media: "(prefers-color-scheme: dark)", color: "#081f33" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the saved theme, data-saver and text-size preferences before the
 * first paint. Kept inline so there is no flash of the wrong theme.
 */
const PREFERENCE_BOOT_SCRIPT = `(function(){try{var r=document.documentElement,s=localStorage,t=s.getItem('vs_theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);r.dataset.theme=d?'dark':'light';r.classList.toggle('dark',d);r.dataset.saver=s.getItem('vs_saver')==='1'?'1':'0';var f=s.getItem('vs_fontscale');r.dataset.fontscale=f==='s'||f==='l'?f:'m'}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCE_BOOT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
          <FloatingAiTutor />
        </LanguageProvider>
      </body>
    </html>
  );
}
