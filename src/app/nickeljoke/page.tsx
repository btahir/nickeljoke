"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ai-elements/loader";
import { useAccount, useWalletClient, useSwitchChain } from "wagmi";
import { wrapFetchWithPayment } from "x402-fetch";
import { baseSepolia, base } from "wagmi/chains"; // Toggle TARGET_CHAIN to base for production
import rough from "roughjs";
import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";
import confetti from "canvas-confetti";
import { Caveat } from "next/font/google";
import { toPng } from "html-to-image";
import { Highlighter } from "@/components/ui/highlighter";

const caveat = Caveat({ subsets: ["latin"] });

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

// Speech bubble component using Rough.js
const RoughSpeechBubble = ({ width = 160, height = 120, text = "Ha Ha!", className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw speech bubble body
    rc.ellipse(width * 0.5, height * 0.4, width * 0.7, height * 0.6, {
      stroke: '#f43f5e',
      strokeWidth: 2,
      roughness: 1.5,
      fill: 'rgba(255, 255, 255, 0.9)',
      fillStyle: 'solid'
    });
    
    // Draw speech bubble tail
    const tailPoints: [number, number][] = [
      [width * 0.3, height * 0.65],
      [width * 0.15, height * 0.85],
      [width * 0.4, height * 0.7]
    ];
    
    rc.polygon(tailPoints, {
      stroke: '#f43f5e',
      strokeWidth: 2,
      roughness: 1.5,
      fill: 'rgba(255, 255, 255, 0.9)',
      fillStyle: 'solid'
    });
    
    // Add text
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#f43f5e';
    ctx.textAlign = 'center';
    ctx.fillText(text, width * 0.5, height * 0.42);
    
  }, [width, height, text]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

// Nickel coin component
const RoughNickelCoin = ({ width = 100, height = 100, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw outer coin circle
    rc.circle(width * 0.5, height * 0.5, width * 0.8, {
      stroke: '#6b7280',
      strokeWidth: 3,
      roughness: 1.2,
      fill: 'rgba(156, 163, 175, 0.3)',
      fillStyle: 'solid'
    });
    
    // Draw inner circle
    rc.circle(width * 0.5, height * 0.5, width * 0.65, {
      stroke: '#4b5563',
      strokeWidth: 2,
      roughness: 1.0,
      fill: 'none'
    });
    
    // Add "5¢" text
    ctx.font = 'bold 18px serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.fillText('5¢', width * 0.5, height * 0.55);
    
    // Add decorative ridges around the edge
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * Math.PI / 180;
      const innerR = width * 0.35;
      const outerR = width * 0.4;
      const x1 = width * 0.5 + Math.cos(angle) * innerR;
      const y1 = height * 0.5 + Math.sin(angle) * innerR;
      const x2 = width * 0.5 + Math.cos(angle) * outerR;
      const y2 = height * 0.5 + Math.sin(angle) * outerR;
      
      rc.line(x1, y1, x2, y2, {
        stroke: '#6b7280',
        strokeWidth: 1,
        roughness: 0.8
      });
    }
    
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

// Blockchain component - chain of connected blocks
const RoughBlockchain = ({ width = 160, height = 120, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const blockWidth = width * 0.25;
    const blockHeight = height * 0.4;
    const spacing = width * 0.05;
    
    // Draw single block with "402"
    const x = width * 0.35;
    const y = height * 0.3;
    
    // Draw block rectangle
    rc.rectangle(x, y, blockWidth, blockHeight, {
      stroke: '#3b82f6',
      strokeWidth: 2,
      roughness: 1.3,
      fill: 'rgba(59, 130, 246, 0.1)',
      fillStyle: 'hachure',
      hachureAngle: 45,
      hachureGap: 6
    });
    
    // Add "402" text
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#1e40af';
    ctx.textAlign = 'center';
    ctx.fillText('402', x + blockWidth / 2, y + blockHeight / 2 + 4);
    
    
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

// Crypto wallet component
const RoughWallet = ({ width = 160, height = 120, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw wallet body
    rc.rectangle(width * 0.2, height * 0.3, width * 0.6, height * 0.5, {
      stroke: '#7c3aed',
      strokeWidth: 2,
      roughness: 1.4,
      fill: 'rgba(124, 58, 237, 0.1)',
      fillStyle: 'hachure',
      hachureAngle: -45,
      hachureGap: 6
    });
    
    // Draw wallet flap/closure
    rc.rectangle(width * 0.25, height * 0.25, width * 0.5, height * 0.15, {
      stroke: '#7c3aed',
      strokeWidth: 2,
      roughness: 1.2,
      fill: 'rgba(124, 58, 237, 0.2)',
      fillStyle: 'solid'
    });
    
    // Draw connection symbol (wifi-like)
    const centerX = width * 0.5;
    const centerY = height * 0.55;
    
    // Three curved lines representing connection
    for (let i = 0; i < 3; i++) {
      const radius = 15 + (i * 8);
      const points: [number, number][] = [];
      for (let angle = -45; angle <= 45; angle += 5) {
        const radian = (angle * Math.PI) / 180;
        const x = centerX + Math.cos(radian) * radius;
        const y = centerY + Math.sin(radian) * radius * 0.6;
        points.push([x, y]);
      }
      
      rc.curve(points, {
        stroke: '#10b981',
        strokeWidth: 2,
        roughness: 1.0
      });
    }
    
    // Add "WALLET" text
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#7c3aed';
    ctx.textAlign = 'center';
    ctx.fillText('WALLET', width * 0.5, height * 0.75);
    
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default function NickelJokePage() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  const scratchCardRef = useRef<HTMLDivElement>(null);

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

  const triggerConfetti = () => {
    if (!confettiTriggered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setConfettiTriggered(true);
    }
  };

  const clearJoke = () => {
    setJoke("");
    setTopic("");
    setConfettiTriggered(false);
  };

  const downloadScratchCard = async () => {
    if (scratchCardRef.current === null) {
      return;
    }

    try {
      // Find the ScratchToReveal element and temporarily remove border radius
      const scratchElement = scratchCardRef.current.querySelector('[class*="rounded"]');
      const originalClassName = scratchElement?.className || '';
      
      if (scratchElement) {
        // Remove border radius classes
        scratchElement.className = originalClassName.replace(/rounded-[^\s]*|rounded/g, '').trim();
      }

      const dataUrl = await toPng(scratchCardRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff'
      });
      
      // Restore original border radius
      if (scratchElement) {
        scratchElement.className = originalClassName;
      }

      const link = document.createElement('a');
      link.download = 'nickel-joke-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
      
      // Make sure to restore original className even if download fails
      const scratchElement = scratchCardRef.current?.querySelector('[class*="rounded"]');
      const originalClassName = scratchElement?.getAttribute('data-original-class');
      if (scratchElement && originalClassName) {
        scratchElement.className = originalClassName;
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Design accents for this page only */}
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
        <RoughSpeechBubble width={180} height={130} text="LOL!" className="text-rose-400" />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-6 opacity-70" aria-hidden>
        <RoughWallet width={160} height={120} className="text-purple-500" />
      </div>
      <div className="pointer-events-none absolute bottom-16 right-6 opacity-60" aria-hidden>
        <RoughNickelCoin width={120} height={120} className="text-gray-500" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-6 pt-12 pb-16 grid md:grid-cols-2 gap-8 items-start">
          {/* Left: billboard card */}
          <div className="relative rounded-3xl border border-rose-200/70 bg-white shadow-2xl overflow-hidden">
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-rose-400/90" aria-hidden />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-pink-400/90" aria-hidden />

            <div className="p-8 md:p-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Premium AI comedy for a nickel
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                <Highlighter action="underline" color="#10b981">
                  Pay once
                </Highlighter>
                , get a laugh. Each joke streams live to your screen.
              </p>

              {/* Price badge without pill styling */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-1">
                <span className="text-xl">💰</span>
                <span className="text-slate-800 font-semibold">
                  <Highlighter action="highlight" color="#fbbf24">
                    5¢
                  </Highlighter>
                  <span className="ml-4">per joke</span>
                </span>
              </div>

              {/* Topic input and actions */}
              <div className="mt-8 space-y-3">
                <Input
                  type="text"
                  placeholder="Enter a topic or leave blank for a surprise"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isLoading || !isConnected}
                  className="h-12 rounded-xl border border-rose-200/70 bg-white text-center text-lg placeholder-slate-400"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => generateJoke()}
                    disabled={isLoading || !isConnected}
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:from-rose-400 hover:to-pink-400"
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
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 text-slate-900 font-bold hover:from-amber-300 hover:to-rose-300"
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

          {/* Right: playful explainer card */}
          <div className="relative h-full">
            <div className="rounded-3xl border border-rose-200/70 bg-white p-6 md:p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="text-5xl">📸</span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Capitalism meets comedy</h3>
                  <p className="mt-2 text-slate-700">
                    We've monetized laughter. Your great-grandmother paid more for a gumball, but at least this won't rot your teeth.
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside">
                    <li>Pick a topic (or let chaos decide)</li>
                    <li>Pay the comedy tax, receive premium nonsense</li>
                    <li>Download your scratch card to flex on social media</li>
                    <li>Repeat until broke or satisfied</li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      onClick={() => setShowInfo(true)}
                      variant="outline"
                      className="rounded-xl border-rose-200/70 bg-white hover:bg-rose-50 text-slate-800"
                    >
                      How it works and help
                    </Button>
                  </div>
                </div>
              </div>

              {/* Simple color bars for personality */}
              <div className="mt-6 flex gap-2" aria-hidden>
                <div className="h-2 w-12 rounded-md bg-rose-300" />
                <div className="h-2 w-8 rounded-md bg-pink-300" />
                <div className="h-2 w-16 rounded-md bg-red-300" />
              </div>
            </div>
          </div>
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

        {/* Joke display */}
        {(joke || isLoading) && (
          <section className="container mx-auto max-w-4xl px-6 pb-16">
            <div className="mt-8 text-center">
              <div className="mb-6">
                <span className="text-4xl">🎪</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Your joke - scratch to reveal!</h3>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-rose-200/70 shadow-2xl">
                  <Loader className="h-8 w-8 mb-4" />
                  <p className="text-lg text-slate-700">Generating your premium joke. Payment processing.</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div ref={scratchCardRef}>
                    <ScratchToReveal
                    width={350}
                    height={200}
                    minScratchPercentage={60}
                    className="flex items-center justify-center overflow-hidden rounded-2xl border-2 shadow-2xl"
                    gradientColors={["#ec4899", "#be185d", "#e879a7"]}
                    onComplete={triggerConfetti}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center p-6"
                      style={{ backgroundColor: '#fff8dc' }}
                    >
                      <div className="text-center">
                        <p className={`text-2xl font-medium text-slate-800 leading-tight ${caveat.className}`}>
                          {joke}
                        </p>
                      </div>
                    </div>
                    </ScratchToReveal>
                  </div>
                </div>
              )}
              
              {joke && (
                <div className="text-center mt-6 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={downloadScratchCard}
                      variant="outline"
                      className="rounded-xl border-slate-400 text-slate-600 hover:bg-slate-100 hover:border-slate-500 transition-colors duration-200"
                    >
                      <span className="mr-2">📥</span>
                      Download Card
                    </Button>
                    <Button
                      onClick={clearJoke}
                      className="rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold hover:from-slate-500 hover:to-slate-600 transition-all duration-200"
                    >
                      <span className="mr-2">🎭</span>
                      Another joke please
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Info modal */}
        {showInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-pink-200/20"
              onClick={() => setShowInfo(false)}
            />
            <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-rose-200/70 bg-white p-6 md:p-8 text-slate-800 shadow-xl">
              <div className="flex items-start justify-between">
                <h4 className="text-xl font-bold">How it works and help</h4>
                <button
                  onClick={() => setShowInfo(false)}
                  className="rounded-xl border border-rose-200/70 px-3 py-1 text-sm hover:bg-rose-50"
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
                <div className="rounded-xl border border-rose-200/70 bg-rose-50 p-3 text-slate-700">
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
