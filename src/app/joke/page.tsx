"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ai-elements/loader";

const randomTopics = [
  "programming", "cats", "coffee", "artificial intelligence", "pizza", 
  "meetings", "smartphones", "weather", "exercise", "social media",
  "cooking", "travel", "movies", "music", "books", "video games",
  "work from home", "dating", "parenting", "technology", "dogs"
];

export default function JokePage() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateJoke = async (customTopic?: string) => {
    const jokeTopicToUse = customTopic || topic || "random";
    
    setIsLoading(true);
    setError("");
    setJoke("");

    try {
      // Create EventSource connection to bot API with payment enabled
      const url = new URL("/api/bot", window.location.origin);
      url.searchParams.set("job", "joke");
      url.searchParams.set("enable-payment", "true");
      url.searchParams.set("topic", jokeTopicToUse);

      console.log("Connecting to:", url.toString());
      const eventSource = new EventSource(url.toString());
      
      // Add connection open handler
      eventSource.onopen = () => {
        console.log("EventSource connection opened successfully");
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === "result") {
            setJoke(data.result.joke || "");
            setIsLoading(false);
            eventSource.close();
          } else if (data.type === "error") {
            throw new Error(data.error);
          }
          // For regular log messages, we can ignore them for cleaner UX
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        console.error("EventSource readyState:", eventSource.readyState);
        console.error("EventSource URL:", url.toString());
        
        // More specific error messages based on readyState
        let errorMessage = "Connection failed. ";
        if (eventSource.readyState === EventSource.CLOSED) {
          errorMessage += "Server closed the connection. ";
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          errorMessage += "Unable to connect to server. ";
        }
        errorMessage += "Please check your wallet has sufficient USDC balance and try again.";
        
        setError(errorMessage);
        setIsLoading(false);
        eventSource.close();
      };

    } catch (err) {
      console.error("Error generating joke:", err);
      setError(err instanceof Error ? err.message : "Failed to generate joke");
      setIsLoading(false);
    }
  };

  const generateRandomJoke = () => {
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(randomTopic);
    generateJoke(randomTopic);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">🎭 $1 Joke Generator</h1>
        <p className="text-muted-foreground mb-2">
          Premium AI-generated jokes powered by Gemini Flash 2 Lite
        </p>
        <p className="text-sm text-yellow-600">
          💳 $1.00 USDC per joke • Automatic payment processing
        </p>
      </div>

      <div className="space-y-6">
        {/* Topic Input Section */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Joke Topic (Optional)
            </label>
            <Input
              id="topic"
              type="text"
              placeholder="e.g., programming, cats, coffee... or leave blank for random"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              className="text-center"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => generateJoke()} 
              disabled={isLoading}
              className="flex-1"
              size="lg"
              variant="default"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4" />
                  Generating...
                </>
              ) : (
                topic.trim() ? `Generate Joke About "${topic}"` : "Generate Custom Joke"
              )}
            </Button>
            
            <Button 
              onClick={generateRandomJoke}
              disabled={isLoading}
              className="flex-1"
              size="lg"
              variant="outline"
            >
              🎲 Random Joke
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-red-700 text-sm font-medium">❌ {error}</p>
            <p className="text-red-600 text-xs mt-1">
              Make sure you have sufficient USDC balance for the $0.05 payment.
            </p>
          </div>
        )}

        {/* Joke Display */}
        {(joke || isLoading) && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Your Premium Joke:</label>
            <div className="relative">
              <Textarea
                value={isLoading ? "🤖 Generating your hilarious joke... Payment processing automatically!" : joke}
                readOnly
                className={`min-h-[120px] text-lg ${
                  joke ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
                }`}
                placeholder="Your joke will appear here..."
              />
              {isLoading && (
                <div className="absolute top-3 right-3">
                  <Loader className="h-5 w-5 text-blue-500" />
                </div>
              )}
            </div>
            {joke && (
              <div className="text-center">
                <Button 
                  onClick={() => { setJoke(""); setTopic(""); }} 
                  variant="ghost" 
                  size="sm"
                >
                  Generate Another Joke
                </Button>
              </div>
            )}
          </div>
        )}

        {/* How it Works */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 How it works:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Enter a topic or click "Random Joke" for surprise topics</li>
            <li>• Payment ($0.05 USDC) is processed automatically via x402</li>
            <li>• Uses Base Sepolia testnet - get free USDC from faucet</li>
            <li>• AI generates a unique, custom joke just for you</li>
            <li>• No wallet popups - seamless payment experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}