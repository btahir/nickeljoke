"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  joke: string;
  topic?: string;
}

export function ShareButton({ joke, topic }: ShareButtonProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateShareUrl = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          joke,
          topic,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create share link');
      }

      const data = await response.json();
      
      // Auto-copy to clipboard
      await navigator.clipboard.writeText(data.shareUrl);
      setLinkCopied(true);
    } catch (error) {
      console.error('Error generating share URL:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (linkCopied) {
    return (
      <Button
        disabled
        className="bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
      >
        ✓ Link copied
      </Button>
    );
  }

  return (
    <Button
      onClick={generateShareUrl}
      disabled={isGenerating}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {isGenerating ? "Generating..." : "Share Joke"}
    </Button>
  );
}