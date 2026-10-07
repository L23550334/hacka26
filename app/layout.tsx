import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sonora — Bandas locales para tu evento",
  description:
    "Descubre, reserva y paga de forma segura a bandas locales. Sin intermediarios, sin complicaciones.",
  manifest: "/manifest.json",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans`}>
        <div className="mx-auto min-h-screen max-w-6xl sm:border-x sm:border-sand/40">
          {children}
        </div>
      </body>
    </html>
  );
}
