import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { CartProvider, CartToast, MobileCartBar } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Eleven Alpha Jerky | Made With Purpose",
    template: "%s | Eleven Alpha Jerky",
  },
  description:
    "Veteran-owned small batch jerky built through family, tradition, and years of refinement.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <CartProvider>
          <SiteHeader />
          {children}
          <CartToast />
          <MobileCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
