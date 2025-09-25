import { NextResponse } from "next/server";
import { streamText } from "ai";
import { generateUniqueJokePrompt } from "@/lib/joke-generator";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    
    // Generate a unique prompt using the random elements system
    const uniquePrompt = generateUniqueJokePrompt(topic || 'anything');
    
    console.log('Generated unique prompt:', uniquePrompt);
    
    const result = streamText({
      model: "xai/grok-4-fast-non-reasoning",
      prompt: uniquePrompt,
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