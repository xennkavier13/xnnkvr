import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenn Xavier Dabon — xnnkvr OS (System 1.0 Portfolio)",
  description:
    "Personal portfolio of Kenn Xavier Dabon (xnnkvr) — BSIT Student (4.43/5.00 GPA), Full-Stack Developer, QA, and Project Manager, styled as an early Macintosh System 1–6 desktop environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@500;600;700&family=Pixelify+Sans:wght@600;700&family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased selection:bg-black selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
