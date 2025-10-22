// app/layout.tsx
import { Footer } from "@/components/common/Footer";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "InterestCalc | Smart Bank & Loan Calculators",
    template: "%s | InterestCalc",
  },
  description:
    "InterestCalc helps you calculate bank interest, loan payments, and savings easily — with support for both AD (Gregorian) and BS (Bikram Sambat) calendars.",
  icons: {
    icon: "/bibekkumarkushwaha.png", // main favicon
   // shortcut: "/favicon-16x16.png", // small shortcut icon
   // apple: "/apple-touch-icon.png", // for iOS devices
  },
  authors: [
    { name: "Bibek Kumar Kushwaha", url: "https://bibekkumarkushwaha.com.np" },
  ],
  creator: "Bibek Kumar Kushwaha",
  publisher: "Bibek Kumar Kushwaha",
  keywords: [
    "Bank Interest Calculator",
    "Loan Calculator",
    "InterestCalc",
    "Bikram Sambat Calculator",
    "Nepali Calendar Interest Calculator",
    "AD to BS Calculator",
    "BS to AD Calculator",
  ],
  openGraph: {
    title: "InterestCalc — Smart Bank & Loan Calculators (AD & BS)",
    description:
      "Easily calculate interest, duration, and total amount for your savings and loans. Works with both AD and BS calendars.",
    url: "https://your-site-url.com",
    siteName: "InterestCalc",
    locale: "en_NP",
    type: "website",
    images: [
      {
        url: "https://your-site-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InterestCalc App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InterestCalc — Smart Bank & Loan Calculators",
    description:
      "Calculate bank interest with AD & BS calendar support. Created by Bibek Kumar Kushwaha.",
    creator: "@your_twitter_handle",
    images: ["https://your-site-url.com/og-image.jpg"],
  },
  metadataBase: new URL("https://your-site-url.com"),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-site-url.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
