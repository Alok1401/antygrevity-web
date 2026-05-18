import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AntyGrevity AI - Your Personal AI Career Assistant",
  description: "Futuristic AI-powered platform for mock interviews, resume analysis, and career guidance. Download the Android APK directly.",
  keywords: "AI Career Assistant, Mock Interviews, Resume AI, App Download, AntyGrevity AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9305168006735352" 
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-black text-white selection:bg-brand-green/30">{children}</body>
    </html>
  );
}
