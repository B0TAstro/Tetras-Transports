// layout.tsx

import "./globals.css";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Tetras Transports",
  description: "Transport privé, professionnel et touristique dans le Jura. Service sur-mesure et devis rapide avec Tetras Transport."

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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