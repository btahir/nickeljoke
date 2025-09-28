import { NextResponse } from "next/server";
import { getRandomJoke } from "@/lib/joke-generator";

export async function POST(request: Request) {
  try {
    const joke = getRandomJoke();
    
    return new Response(joke, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Joke generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate joke' },
      { status: 500 }
    );
  }
}