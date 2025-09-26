"use client";

import { RoughBlockchain, RoughCreator, RoughWallet, RoughNickelCoin } from "@/components/rough-components";

export function BackgroundDecorations() {
  return (
    <>
      {/* Fine red grid across the canvas */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,63,94,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,63,94,0.25) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      
      {/* Comedy and blockchain-themed decorative elements */}
      <div className="pointer-events-none absolute top-8 left-6 opacity-65" aria-hidden>
        <RoughBlockchain width={140} height={100} className="text-blue-500" />
      </div>
      <div className="absolute top-12 right-6 opacity-75 z-20 hidden sm:block">
        <a 
          href="https://x.com/deepwhitman" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        >
          <RoughCreator width={120} height={140} className="text-rose-400" />
        </a>
      </div>
      <div className="pointer-events-none absolute bottom-12 left-6 opacity-70" aria-hidden>
        <RoughWallet width={160} height={120} className="text-purple-500" />
      </div>
      <div className="absolute bottom-16 right-6 opacity-60 z-0">
        <div className="hidden sm:block pointer-events-none" aria-hidden>
          <RoughNickelCoin width={120} height={120} className="text-gray-500" />
        </div>
        <div className="block sm:hidden pointer-events-none" aria-hidden>
          <RoughNickelCoin width={100} height={100} className="text-gray-500" />
        </div>
      </div>
    </>
  );
}