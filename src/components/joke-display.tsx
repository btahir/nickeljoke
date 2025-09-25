"use client";

import { forwardRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ai-elements/loader";
import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { Caveat } from "next/font/google";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";

const caveat = Caveat({ subsets: ["latin"] });

interface JokeDisplayProps {
  joke: string;
  isLoading: boolean;
  onClearJoke: () => void;
}

export const JokeDisplay = forwardRef<HTMLElement, JokeDisplayProps>(
  ({ joke, isLoading, onClearJoke }, ref) => {
    const [confettiTriggered, setConfettiTriggered] = useState(false);

    // Reset confetti trigger when joke changes
    useEffect(() => {
      if (!joke) {
        setConfettiTriggered(false);
      }
    }, [joke]);

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

    const downloadScratchCard = async () => {
      const element = document.getElementById('scratch-card-container');
      if (!element) return;

      // Store original className for restoration
      let originalClassName = '';
      let scratchElement: Element | null = null;

      try {
        // Find the ScratchToReveal element and temporarily remove border radius
        scratchElement = element.querySelector('[class*="rounded"]');
        originalClassName = scratchElement?.className || '';
        
        if (scratchElement) {
          // Remove border radius classes temporarily
          scratchElement.className = originalClassName.replace(/rounded-[^\s]*|rounded/g, '').trim();
        }

        const dataUrl = await toPng(element, { 
          cacheBust: true,
          backgroundColor: '#ffffff'
        });
        
        // Restore original border radius
        if (scratchElement && originalClassName) {
          scratchElement.className = originalClassName;
        }

        const link = document.createElement('a');
        link.download = 'nickel-joke-card.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image:', err);
        
        // Make sure to restore original className even if download fails
        if (scratchElement && originalClassName) {
          scratchElement.className = originalClassName;
        }
      }
    };

    if (!joke && !isLoading) return null;

    return (
      <section ref={ref} className="container mx-auto max-w-4xl px-6 pb-16">
        <div className="mt-8 text-center">
          <div className="mb-6">
            <span className="text-4xl">🎪</span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              Your joke - <Highlighter action="underline" color="#FF9800">scratch to reveal</Highlighter>!
            </h3>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-rose-200/70 shadow-2xl">
              <Loader className="h-8 w-8 mb-4" />
              <p className="text-lg text-slate-700">Generating your premium joke. Payment processing.</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div id="scratch-card-container">
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
                  onClick={onClearJoke}
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
    );
  }
);

JokeDisplay.displayName = "JokeDisplay";