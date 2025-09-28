import type { Metadata } from "next";
import { Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SiteHeader from "@/components/site-header";
import { Analytics } from '@/components/analytics'

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NickelJoke",
  description: "Pay a nickel. Get a giggle.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${fredoka.className} ${fredoka.variable} ${geistMono.variable} antialiased h-full`}>
        <Providers>
          {/* White canvas */}
          <div className="fixed inset-0 -z-20 bg-white" aria-hidden />

          {/* Subtle confetti dots */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.08]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(#ef4444 1px, transparent 1px), radial-gradient(#f472b6 1px, transparent 1px)",
              backgroundSize: "18px 18px, 22px 22px",
              backgroundPosition: "0 0, 10px 8px",
            }}
          />

          {/* Soft playful bursts */}
          <div
            className="pointer-events-none fixed -top-24 -left-24 h-[28rem] w-[28rem] -z-10 rounded-full blur-3xl"
            aria-hidden
            style={{ background: "radial-gradient(circle, rgba(255,99,132,0.30), rgba(255,99,132,0))" }}
          />
          <div
            className="pointer-events-none fixed bottom-[-10rem] right-[-6rem] h-[26rem] w-[26rem] -z-10 rounded-full blur-3xl"
            aria-hidden
            style={{ background: "radial-gradient(circle, rgba(244,114,182,0.25), rgba(244,114,182,0))" }}
          />

          {/* Layout chrome */}
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-rose-200/60 bg-white/80 backdrop-blur-sm py-6 text-center text-slate-600">
              <p>© NickelJoke. Pay a nickel, get a giggle.</p>
            </footer>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
