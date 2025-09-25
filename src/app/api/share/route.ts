import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { storeJoke, getJoke } from '@/lib/redis';

// Store a joke and return share ID
export async function POST(request: NextRequest) {
  try {
    const { joke, topic } = await request.json();

    if (!joke) {
      return NextResponse.json({ error: 'Joke content is required' }, { status: 400 });
    }

    const shareId = nanoid(8); // Generate short unique ID
    
    await storeJoke(shareId, {
      joke,
      topic,
      timestamp: Date.now(),
    });

    return NextResponse.json({ 
      shareId,
      shareUrl: `${request.nextUrl.origin}/share/${shareId}`
    });
  } catch (error) {
    console.error('Error storing joke:', error);
    return NextResponse.json({ error: 'Failed to create share link' }, { status: 500 });
  }
}

// Retrieve a joke by share ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('id');

    if (!shareId) {
      return NextResponse.json({ error: 'Share ID is required' }, { status: 400 });
    }

    const jokeData = await getJoke(shareId);

    if (!jokeData) {
      return NextResponse.json({ error: 'Joke not found' }, { status: 404 });
    }

    return NextResponse.json(jokeData);
  } catch (error) {
    console.error('Error retrieving joke:', error);
    return NextResponse.json({ error: 'Failed to retrieve joke' }, { status: 500 });
  }
}