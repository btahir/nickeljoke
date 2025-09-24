"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useWalletClient } from "wagmi";
import { metaMask, coinbaseWallet, injected } from "wagmi/connectors";
import { baseSepolia, base } from "wagmi/chains";

export default function SiteHeader() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const [mounted, setMounted] = useState(false);

  // Force a single chain. Use base for prod.
  const TARGET_CHAIN = baseSepolia; // change to base for production
  const isOnTarget = chainId === TARGET_CHAIN.id;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const connectWallet = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    if (ethereum?.isCoinbaseWallet) await connect({ connector: coinbaseWallet({ appName: "NickelJoke" }) });
    else if (ethereum?.isMetaMask) await connect({ connector: metaMask() });
    else await connect({ connector: injected() });
    try {
      await switchChain({ chainId: TARGET_CHAIN.id });
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-orange-200/60 bg-white/70 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="NickelJoke Logo" 
            className="h-14 w-14 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-slate-800">NickelJoke</span>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && (
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-orange-200/60 bg-white/80 px-3 py-1 text-slate-700">
              <span>{isOnTarget ? TARGET_CHAIN.name : "Wrong network"}</span>
              <span className="text-xs">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          )}
          {isConnected ? (
            <div className="flex items-center gap-2">
              {!isOnTarget && (
                <Button
                  onClick={() => switchChain({ chainId: TARGET_CHAIN.id })}
                  className="bg-amber-400 text-slate-900 font-bold hover:bg-amber-300"
                >
                  Switch to {TARGET_CHAIN.name}
                </Button>
              )}
              <Button
                onClick={() => disconnect()}
                variant="outline"
                className="border-orange-200/60 bg-white hover:bg-orange-50 text-slate-800"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-amber-400 to-rose-400 text-slate-900 font-bold hover:from-amber-300 hover:to-rose-300"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
