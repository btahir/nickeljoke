"use client";

import { RoughBlockchain, RoughStar, RoughWallet, RoughNickelCoin } from "@/components/rough-components";

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
      <div className="pointer-events-none absolute top-16 right-8 opacity-75" aria-hidden>
        <RoughStar width={200} height={160} text="LOL!" className="text-rose-400" />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-6 opacity-70" aria-hidden>
        <RoughWallet width={160} height={120} className="text-purple-500" />
      </div>
      <div className="pointer-events-none absolute bottom-16 right-6 opacity-60" aria-hidden>
        <RoughNickelCoin width={120} height={120} className="text-gray-500" />
      </div>
    </>
  );
}