"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ai-elements/loader";
import { useAccount, useWalletClient, useSwitchChain } from "wagmi";
import { wrapFetchWithPayment } from "x402-fetch";
import { baseSepolia, base } from "wagmi/chains"; // Toggle TARGET_CHAIN to base for production

const randomTopics = [
  "programming",
  "cats",
  "coffee",
  "artificial intelligence",
  "pizza",
  "meetings",
  "smartphones",
  "weather",
  "exercise",
  "social media",
  "cooking",
  "travel",
  "movies",
  "music",
  "books",
  "video games",
  "work from home",
  "dating",
  "parenting",
  "technology",
  "dogs",
];

export default function NickelJokePage() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    const randomTopic =
      randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(randomTopic);
    generateJoke(randomTopic);
  };

  const clearJoke = () => {
    setJoke("");
    setTopic("");
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image. Place your Nickelback meme image at /public/nickelback-meme.jpg */}
      <div
        className="pointer-events-none absolute inset-0 bg-fixed bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/nickelback-meme.jpg')" }}
        aria-hidden
      />
      {/* Light veil for readability */}
      <div className="absolute inset-0 bg-white/70" aria-hidden />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-6 pt-12 pb-16 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: billboard card */}
          <div className="relative rounded-3xl border border-orange-200/60 bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Premium AI comedy for a nickel
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Pay a nickel, get a laugh. Each joke streams live to your screen.
              </p>
              {/* Topic input and actions */}
              <div className="mt-8 space-y-3">
                <Input
                  type="text"
                  placeholder="Enter a topic or leave blank for a surprise"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isLoading || !isConnected}
                  className="h-12 rounded-full border border-orange-200/60 bg-white text-center text-lg placeholder-slate-400"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => generateJoke()}
                    disabled={isLoading || !isConnected}
                    className="flex-1 h-12 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold hover:from-orange-400 hover:to-rose-400"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="mr-2 h-5 w-5" />
                        Crafting comedy
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        {topic.trim() ? `Joke about "${topic}"` : "Custom joke"}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={generateRandomJoke}
                    disabled={isLoading || !isConnected}
                    className="flex-1 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold hover:from-amber-300 hover:to-yellow-400"
                  >
                    <span className="mr-2">🎲</span>
                    Surprise me
                  </Button>
                </div>
                {!isConnected ? (
                  <p className="text-sm text-slate-600">
                    Use the Connect button in the header to start
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right: meme callout */}
          <div className="relative h-full">
            <div className="rounded-3xl border border-orange-200/60 bg-white/80 p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <div className="flex items-start gap-4">
                <span className="text-5xl">📸</span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Look at this photograph</h3>
                  <p className="mt-2 text-slate-700">
                    Every time it makes you laugh, a nickel leaves your wallet. Consent first, comedy second.
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside">
                    <li>Choose a topic or go random</li>
                    <li>Approve a tiny payment, then stream your joke</li>
                    <li>Keep the laughs coming with a single click</li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      onClick={() => setShowInfo(true)}
                      variant="outline"
                      className="border-orange-200/60 bg-white hover:bg-orange-50 text-slate-800"
                    >
                      How it works and help
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error notice */}
        {error && (
          <div className="container mx-auto max-w-3xl px-6">
            <div className="mt-4 rounded-2xl border border-rose-300/60 bg-rose-50 p-5 text-rose-700">
              <p className="font-semibold">{error}</p>
              <div className="mt-2 text-sm space-y-1">
                {!isOnTarget && (
                  <Button
                    onClick={() => switchChain({ chainId: TARGET_CHAIN.id })}
                    className="bg-amber-400 text-slate-900 font-bold hover:bg-amber-300"
                  >
                    Switch to {TARGET_CHAIN.name}
                  </Button>
                )}
                {error.includes("Payment required") && (
                  <p>Tip: check your USDC balance and try again.</p>
                )}
                {error.toLowerCase().includes("switch") && (
                  <p>Tip: use the header to pick a supported network.</p>
                )}
                {error.toLowerCase().includes("connect") && (
                  <p>Tip: use the Connect button in the header.</p>
                )}
                {!error.toLowerCase().includes("payment") &&
                  !error.toLowerCase().includes("switch") &&
                  !error.toLowerCase().includes("connect") && (
                    <p>Try refreshing the page or reconnect your wallet.</p>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Joke display */}
        {(joke || isLoading) && (
          <section className="container mx-auto max-w-4xl px-6 pb-16">
            <div className="mt-8 rounded-3xl border border-orange-200/60 bg-white p-6 md:p-8 backdrop-blur-sm shadow-2xl">
              <div className="text-center mb-4">
                <span className="text-4xl">🎪</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Your joke</h3>
              </div>
              <div className="relative">
                <Textarea
                  value={isLoading ? "Generating your premium joke. Payment processing." : joke}
                  readOnly
                  className={`min-h-[160px] text-lg text-center rounded-2xl border ${
                    joke
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-amber-300 bg-amber-50 text-slate-700"
                  }`}
                  placeholder="Your hilarious joke will appear here"
                />
                {isLoading && (
                  <div className="absolute top-4 right-4">
                    <Loader className="h-6 w-6" />
                  </div>
                )}
              </div>
              {joke && (
                <div className="text-center mt-6">
                  <Button
                    onClick={clearJoke}
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-400 hover:to-pink-400"
                  >
                    <span className="mr-2">🎭</span>
                    Another joke please
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Info modal */}
        {showInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowInfo(false)} />
            <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-orange-200/60 bg-white p-6 md:p-8 text-slate-800 shadow-xl">
              <div className="flex items-start justify-between">
                <h4 className="text-xl font-bold">How it works and help</h4>
                <button
                  onClick={() => setShowInfo(false)}
                  className="rounded-full border border-orange-200/60 px-3 py-1 text-sm hover:bg-orange-50"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 grid gap-4 text-sm">
                <div>
                  <p className="font-semibold">Steps</p>
                  <ol className="mt-2 list-decimal list-inside space-y-1 text-slate-700">
                    <li>Connect your wallet in the header</li>
                    <li>Pick a topic and request a joke</li>
                    <li>Approve a 5¢ USDC payment</li>
                    <li>Watch the joke stream in real time</li>
                  </ol>
                </div>
                <div>
                  <p className="font-semibold">Need help</p>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-slate-700">
                    <li>
                      <strong>No Web3 wallet found</strong>: install MetaMask or Coinbase Wallet
                    </li>
                    <li>
                      <strong>Switch network</strong>: use the header to select a supported network
                    </li>
                    <li>
                      <strong>Payment required</strong>: add a little USDC and try again
                    </li>
                    <li>
                      <strong>Still stuck</strong>: refresh the page and reconnect
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-orange-200/60 bg-orange-50 p-3 text-slate-700">
                  <p className="text-xs">
                    Tech note: payments use x402-fetch with wallet native authorization. No sign ups, just a tiny
                    approval per joke.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
