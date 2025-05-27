// layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { getSeoSettings } from "@/lib/sanity.query";
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();

  const baseUrl = seo?.baseUrl;
  const fullUrl = `${baseUrl}"/"}`;

  return {
    title: seo?.title,
    description: seo?.description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: "/" },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: fullUrl,
      siteName: seo?.siteName,
      images: seo?.ogImage?.asset?.url ? [
        {
          url: seo.ogImage.asset.url,
          width: 1200,
          height: 630,
          alt: seo.title
        }
      ] : [],
      locale: "fr_FR",
      type: "website"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    }
  };
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body id="top" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}