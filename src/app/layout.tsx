import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quiz Mint AI - Intelligent Quiz Generator",
    template: "%s | Quiz Mint AI",
  },
  description:
    "AI-powered quiz generator for personalized learning. Supports multiple professional certification exam preparation including AWS, Google Ads, SAP, and more. Smart learning platform for efficient exam preparation.",
  keywords: [
    "AI quiz generator",
    "artificial intelligence learning",
    "exam preparation",
    "AWS certification",
    "Google certification",
    "SAP certification",
    "online learning platform",
    "smart quiz bank",
    "automated testing",
    "exam practice",
  ],
  authors: [{ name: "Quiz Mint AI Team" }],
  creator: "Quiz Mint AI",
  publisher: "Quiz Mint AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quiz-mint-ai.peasify.app",
    siteName: "Quiz Mint AI",
    title: "Quiz Mint AI - Intelligent Quiz Generator",
    description:
      "AI-powered quiz generator for personalized learning. Supports multiple professional certification exam preparation. Smart learning platform for efficient exam preparation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quiz Mint AI - Intelligent Quiz Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Mint AI - Intelligent Quiz Generator",
    description:
      "AI-powered quiz generator for personalized learning. Supports multiple professional certification exam preparation.",
    images: ["/og-image.png"],
    creator: "@quiz_mint_ai",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://quiz-mint-ai.peasify.app",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
    </html>
  );
}
