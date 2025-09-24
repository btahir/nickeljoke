import { NextResponse } from "next/server";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    
    const result = streamText({
      model: "google/gemini-2.0-flash-lite",
      prompt: `Generate a funny, clean joke about: ${topic || 'anything'}. Make it clever and original. Just return the joke, nothing else.`,
      maxTokens: 150,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Joke generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate joke' },
      { status: 500 }
    );
  }
}