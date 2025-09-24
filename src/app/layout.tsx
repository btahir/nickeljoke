import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SiteHeader from "@/components/site-header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NickelJoke",
  description: "Pay a nickel. Get a giggle.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <Providers>
          {/* Light playful gradient */}
          <div
            className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50"
            aria-hidden
          />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-orange-200/60 py-6 text-center text-slate-600 bg-white/80 backdrop-blur-sm">
              <p>© NickelJoke. Pay a nickel, get a giggle.</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
