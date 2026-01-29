import "./globals.css";
import type { Metadata, Viewport } from "next";

import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

/* -------------------------------------
   SEO METADATA
------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Antigravity | Immersive Experience",
    template: "%s | Antigravity",
  },

  description: "A cinematic, luxury-grade scroll experience powered by Antigravity.",

  applicationName: "Antigravity",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Antigravity",
    "Luxury Website",
    "GSAP Scroll Experience",
    "Cinematic UI",
    "Next.js Premium Website",
  ],

  authors: [{ name: "Antigravity Studio", url: "https://your-domain.com" }],
  creator: "Antigravity Studio",
  publisher: "Antigravity Studio",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://your-domain.com",
    siteName: "Antigravity",
    title: "Antigravity | Immersive Experience",
    description: "A cinematic scroll journey with premium motion design.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antigravity – Immersive Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Antigravity | Immersive Experience",
    description: "A cinematic scroll journey with premium motion design.",
    images: ["/og-image.jpg"],
  },
};

/* -------------------------------------
   VIEWPORT
------------------------------------- */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0B" },
  ],
};

/* -------------------------------------
   ROOT LAYOUT
------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-black text-white">
        <SmoothScroll>
          <Loader />
          <Header />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
