"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JokeInputForm } from "./joke-input-form";
import { InfoCard } from "./info-card";

interface MobileCarouselProps {
  topic: string;
  setTopic: (topic: string) => void;
  isLoading: boolean;
  isConnected: boolean;
  onGenerateJoke: () => void;
  onGenerateRandomJoke: () => void;
  onShowInfo: () => void;
}

export function MobileCarousel({
  topic,
  setTopic,
  isLoading,
  isConnected,
  onGenerateJoke,
  onGenerateRandomJoke,
  onShowInfo
}: MobileCarouselProps) {
  return (
    <div className="md:hidden">
      <Carousel className="w-full">
        <CarouselContent className="rounded-3xl">
          <CarouselItem>
            <JokeInputForm
              topic={topic}
              setTopic={setTopic}
              isLoading={isLoading}
              isConnected={isConnected}
              onGenerateJoke={onGenerateJoke}
              onGenerateRandomJoke={onGenerateRandomJoke}
            />
          </CarouselItem>
          
          <CarouselItem>
            <div className="relative rounded-3xl border border-rose-200/70 bg-white shadow-2xl overflow-hidden h-full">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-rose-400/90" aria-hidden />
              <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-pink-400/90" aria-hidden />

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">📸</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Capitalism meets comedy</h3>
                    <p className="mt-2 text-slate-700">
                      We've monetized laughter. Your great-grandmother paid more for a gumball, but at least this won't rot your teeth.
                    </p>
                    <ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside">
                      <li>Pick a topic (or let chaos decide)</li>
                      <li>Download your scratch card to flex on social media</li>
                      <li>Repeat until broke or satisfied</li>
                    </ul>
                    <div className="mt-6">
                      <button
                        onClick={onShowInfo}
                        className="rounded-xl border border-rose-200/70 bg-white hover:bg-rose-50 text-slate-800 px-4 py-2"
                      >
                        How it works and help
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hand-drawn color bars for personality */}
                <div className="mt-6 flex gap-2" aria-hidden>
                  <div className="h-2 w-12 bg-rose-300 transform rotate-1" />
                  <div className="h-2 w-8 bg-pink-300 transform -rotate-1" />
                  <div className="h-2 w-16 bg-red-300 transform rotate-0.5" />
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        
        {/* Custom navigation with text */}
        <div className="flex justify-between items-center mt-4 px-4">
          <CarouselPrevious className="static translate-y-0 h-10 w-auto px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-3xl shadow-sm">
            <span className="text-sm font-medium text-gray-700">← Back to joke</span>
          </CarouselPrevious>
          <CarouselNext className="static translate-y-0 h-10 w-auto px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-3xl shadow-sm">
            <span className="text-sm font-medium text-gray-700">Learn more →</span>
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}