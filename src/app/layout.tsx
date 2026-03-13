import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "antd/dist/reset.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentWise Splitter",
  description: "Conflict-free shared expense tracking for roommates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <SiteNav />
        {children}
        <footer className="border-t border-[var(--border)] bg-white/80 py-4 text-center text-xs text-slate-600">
          RentWise Splitter • Multi-page product case for admissions portfolio
        </footer>
      </body>
    </html>
  );
}
