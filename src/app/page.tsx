"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount, useWalletClient, useSwitchChain } from "wagmi";
import { wrapFetchWithPayment } from "x402-fetch";
import { baseSepolia } from "wagmi/chains"; // Toggle TARGET_CHAIN to base for production
import { JokeInputForm } from "@/components/joke-input-form";
import { InfoCard } from "@/components/info-card";
import { JokeDisplay } from "@/components/joke-display";
import { InfoModal } from "@/components/info-modal";
import { BackgroundDecorations } from "@/components/background-decorations";
import { MobileCarousel } from "@/components/mobile-carousel";

export default function NickelJokePage() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [mounted, setMounted] = useState(false);

  const jokeCardRef = useRef<HTMLElement>(null);

  const { address, isConnected, chainId } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();

  // Enforce a single target chain
  const TARGET_CHAIN = baseSepolia; // set to base for production
  const isOnTarget = chainId === TARGET_CHAIN.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateJoke = async (customTopic?: string) => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first using the header");
      return;
    }

    if (!isOnTarget) {
      try {
        await switchChain({ chainId: TARGET_CHAIN.id });
      } catch {
        setError(`Please switch to ${TARGET_CHAIN.name} using the header`);
        return;
      }
    }

    if (!walletClient) {
      setError("Wallet not ready. Please reconnect your wallet in the header");
      return;
    }

    const jokeTopicToUse = customTopic || topic || "random";
    setIsLoading(true);
    setError("");
    setJoke("");

    // Auto scroll to joke card
    setTimeout(() => {
      jokeCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    try {
      const x402fetch = wrapFetchWithPayment(fetch, walletClient as any);
      const response = await x402fetch("/api/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: jokeTopicToUse }),
      });

      if (!response.ok) {
        if (response.status === 402) {
          throw new Error("Payment required. Make sure you have enough USDC");
        } else if (response.status === 500) {
          throw new Error("AI service temporarily unavailable. Try again in a moment");
        } else {
          throw new Error(`Request failed: ${response.statusText}`);
        }
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response received from server");

      let jokeText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        jokeText += new TextDecoder().decode(value);
        setJoke(jokeText);
      }
    } catch (err) {
      console.error("Joke generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate joke. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomJoke = () => {
    const randomTopics = [
      "programming", "cats", "coffee", "artificial intelligence", "pizza", "meetings",
      "smartphones", "weather", "exercise", "social media", "cooking", "travel",
      "movies", "music", "books", "video games", "work from home", "dating",
      "parenting", "technology", "dogs"
    ];
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(randomTopic);
    generateJoke(randomTopic);
  };

  const clearJoke = () => {
    setJoke("");
    setTopic("");
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <BackgroundDecorations />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-6 pt-12 pb-16">
          {/* Desktop: Side by side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-start">
            <JokeInputForm
              topic={topic}
              setTopic={setTopic}
              isLoading={isLoading}
              isConnected={isConnected}
              onGenerateJoke={() => generateJoke()}
              onGenerateRandomJoke={generateRandomJoke}
            />
            <InfoCard onShowInfo={() => setShowInfo(true)} />
          </div>

          <MobileCarousel
            topic={topic}
            setTopic={setTopic}
            isLoading={isLoading}
            isConnected={isConnected}
            onGenerateJoke={() => generateJoke()}
            onGenerateRandomJoke={generateRandomJoke}
            onShowInfo={() => setShowInfo(true)}
          />
        </section>

        {/* Error notice */}
        {error && (
          <div className="container mx-auto max-w-3xl px-6">
            <div className="mt-4 rounded-2xl border border-rose-300/70 bg-rose-50 p-5 text-rose-700">
              <p className="font-semibold">{error}</p>
              <div className="mt-2 text-sm space-y-1">
                {error.includes("Payment required") && <p>Tip: check your USDC balance and try again.</p>}
                {error.toLowerCase().includes("switch") && <p>Tip: use the header to pick a supported network.</p>}
                {error.toLowerCase().includes("connect") && <p>Tip: use the Connect button in the header.</p>}
                {!error.toLowerCase().includes("payment") &&
                  !error.toLowerCase().includes("switch") &&
                  !error.toLowerCase().includes("connect") && (
                    <p>Try refreshing the page or reconnect your wallet.</p>
                  )}
              </div>
            </div>
          </div>
        )}

        <JokeDisplay
          ref={jokeCardRef}
          joke={joke}
          isLoading={isLoading}
          onClearJoke={clearJoke}
        />

        <InfoModal showInfo={showInfo} onClose={() => setShowInfo(false)} />
      </div>
    </div>
  );
}
