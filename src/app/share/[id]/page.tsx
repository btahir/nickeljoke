"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JokeDisplay } from "@/components/joke-display";
import { BackgroundDecorations } from "@/components/background-decorations";

interface JokeData {
  joke: string;
  topic?: string;
  timestamp: number;
}

export default function SharedJokePage() {
  const params = useParams();
  const [jokeData, setJokeData] = useState<JokeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      if (params.id) {
        try {
          const response = await fetch(`/api/share?id=${params.id}`);
          if (response.ok) {
            const data = await response.json();
            setJokeData(data);
          }
        } catch (error) {
          console.error('Error fetching joke data:', error);
        }
        setLoading(false);
      }
    };

    fetchJoke();
  }, [params.id]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-white">
        <BackgroundDecorations />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading joke...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!jokeData) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-white">
        <BackgroundDecorations />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md px-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Joke Not Found</h1>
            <p className="text-slate-600 mb-6">
              This shared joke link may have expired or is invalid.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-900 font-bold rounded-full hover:from-amber-300 hover:to-rose-300 transition-all"
            >
              Generate New Joke
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <BackgroundDecorations />
      <div className="relative z-10">
        <JokeDisplay
          joke={jokeData.joke}
          isLoading={false}
          onClearJoke={() => {}}
          isSharedView={true}
        />
      </div>
    </div>
  );
}