"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ai-elements/loader";
import { Highlighter } from "@/components/ui/highlighter";

interface JokeInputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  isLoading: boolean;
  isConnected: boolean;
  onGenerateJoke: () => void;
  onGenerateRandomJoke: () => void;
}

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

export function JokeInputForm({
  topic,
  setTopic,
  isLoading,
  isConnected,
  onGenerateJoke,
  onGenerateRandomJoke
}: JokeInputFormProps) {
  const handleRandomJoke = () => {
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(randomTopic);
    onGenerateRandomJoke();
  };

  return (
    <div className="relative rounded-3xl border border-rose-200/70 bg-white shadow-2xl overflow-hidden">
      {/* Corner accents */}
      <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-rose-400/90" aria-hidden />
      <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-pink-400/90" aria-hidden />

      <div className="p-8 md:p-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Premium comedy for a nickel
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          <Highlighter action="underline" color="#10b981">
            Pay once
          </Highlighter>
          , get a laugh. Each joke streams live to your screen.
        </p>

        {/* Price badge */}
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
              onClick={onGenerateJoke}
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
              onClick={handleRandomJoke}
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
  );
}