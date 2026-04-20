import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://nightquest.it";

export const metadata: Metadata = {
  title: "NightQuest — La notte ha occhi",
  description:
    "Un'esperienza notturna guidata da un'entità narrativa. In arrivo a Gallipoli, giugno 2026.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: "NightQuest — La notte ha occhi",
    description:
      "Un'esperienza notturna guidata da un'entità narrativa. In arrivo a Gallipoli, giugno 2026.",
    url: APP_URL,
    siteName: "NightQuest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NightQuest — La notte ha occhi",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NightQuest — La notte ha occhi",
    description:
      "Un'esperienza notturna guidata da un'entità narrativa. In arrivo a Gallipoli, giugno 2026.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain =
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "nightquest.it";

  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
