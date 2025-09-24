"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ai-elements/loader";
import { useAccount, useConnect, useDisconnect, useWalletClient, useSwitchChain } from "wagmi";
import { coinbaseWallet, metaMask, injected } from "wagmi/connectors";
import { wrapFetchWithPayment } from "x402-fetch";
import { baseSepolia } from "wagmi/chains";

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

  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();

  const connectWallet = () => {
    const ethereum = (window as any).ethereum;
    if (ethereum?.isCoinbaseWallet) {
      connect({ connector: coinbaseWallet({ appName: 'x402 AI Starter' }) });
    } else if (ethereum?.isMetaMask) {
      connect({ connector: metaMask() });
    } else {
      connect({ connector: injected() });
    }
  };

  const generateJoke = async (customTopic?: string) => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (chainId !== baseSepolia.id) {
      try {
        await switchChain({ chainId: baseSepolia.id });
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch {
        setError("Please switch to Base Sepolia network");
        return;
      }
    }

    if (!walletClient) {
      setError("Wallet client not available. Please reconnect your wallet.");
      return;
    }

    const jokeTopicToUse = customTopic || topic || "random";
    setIsLoading(true);
    setError("");
    setJoke("");

    try {
      const x402fetch = wrapFetchWithPayment(fetch, walletClient);
      const response = await x402fetch("/api/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: jokeTopicToUse }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate joke: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      let jokeText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        jokeText += new TextDecoder().decode(value);
        setJoke(jokeText);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate joke");
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomJoke = () => {
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(randomTopic);
    generateJoke(randomTopic);
  };

  const clearJoke = () => {
    setJoke("");
    setTopic("");
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">🎭 Half-Cent Joke Generator</h1>
        <p className="text-muted-foreground mb-2">
          Premium AI-generated jokes powered by Gemini Flash 2 Lite
        </p>
        <p className="text-sm text-yellow-600">
          💳 $0.005 USDC per joke • Pay from your wallet
        </p>
      </div>

      <div className="space-y-6">
        {/* Wallet Connection */}
        {!isConnected ? (
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Connect Your Wallet</h3>
            <p className="text-blue-700 mb-4 text-sm">
              Connect your Web3 wallet to pay for jokes with USDC
            </p>
            <Button onClick={connectWallet} size="lg" className="bg-blue-600 hover:bg-blue-700">
              🔗 Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-700 text-sm">
                  ✅ Wallet connected: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
                <p className="text-green-600 text-xs mt-1">
                  {chainId === baseSepolia.id ? "Base Sepolia • Ready for payments" : "⚠️ Switch to Base Sepolia"}
                </p>
              </div>
              <Button 
                onClick={() => disconnect()} 
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}

        {/* Topic Input */}
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
              disabled={isLoading || !isConnected}
              className="text-center"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => generateJoke()} 
              disabled={isLoading || !isConnected}
              className="flex-1"
              size="lg"
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
              disabled={isLoading || !isConnected}
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
              Make sure you have sufficient USDC balance for the $0.005 payment.
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
                <Button onClick={clearJoke} variant="ghost" size="sm">
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
            <li>• Payment ($0.005 USDC) is processed automatically from your wallet</li>
            <li>• Uses Base Sepolia testnet - get free USDC from faucet</li>
            <li>• AI generates a unique, custom joke just for you</li>
            <li>• x402-fetch handles all payment complexity behind the scenes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}