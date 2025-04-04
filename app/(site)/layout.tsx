// app/layout.tsx

'use client';

import "../globals.css";
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Navbar from "../(site)/components/layout/Navbar";
import Footer from "../(site)/components/layout/Footer";
import { metadata } from "./metadata";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="title" content={String(metadata.title ?? '')} />
        <meta name="description" content={String(metadata.description ?? '')} />
      </head>
      <body id="top" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}