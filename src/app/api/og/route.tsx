import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { getJoke } from '@/lib/redis';
import fs from 'fs';
import path from 'path';

// Ensure Node.js runtime so local font loading via fs works
export const runtime = 'nodejs';

// Load font data globally - only read once at startup
const fontPath = path.join(process.cwd(), 'public', 'Caveat-Regular.ttf');
let caveatFontData: Buffer | undefined;
try {
  const fontBuffer = fs.readFileSync(fontPath);
  caveatFontData = fontBuffer;
  console.log('Successfully loaded Caveat font, size:', caveatFontData.byteLength);
} catch (error) {
  console.error('Failed to load Caveat font:', error);
  caveatFontData = undefined;
}

// Define fonts array globally for caching (reuse the same object each request)
const fonts: any[] = caveatFontData
  ? [
      {
        name: 'Caveat',
        data: caveatFontData,
        weight: 400,
        style: 'normal',
      },
    ]
  : [];

// Define ImageResponse options globally for font caching
const imageResponseOptions = {
  width: 1200,
  height: 630,
  ...(fonts.length > 0 && { fonts }), // Add fonts only if available
};

export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    let joke: string | null = searchParams.get('joke');
    let topic: string | null = searchParams.get('topic');
    const shareId = searchParams.get('shareId');

    // If shareId is provided, fetch from Redis (but never fail the image)
    if (shareId) {
      try {
        const jokeData = await getJoke(shareId);
        if (jokeData) {
          joke = jokeData.joke;
          topic = jokeData.topic || null;
        } else {
          // Fallback when Redis has expired or shareId is invalid
          joke = "Looks like this joke died. lol.";
          topic = "expired";
        }
      } catch (e) {
        console.error('Redis error when fetching shareId', e);
        joke = "Looks like this joke died. lol.";
        topic = "expired";
      }
    }

    if (!joke) {
      return new Response('Missing joke parameter or invalid share ID', { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff8dc',
            padding: '60px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              lineHeight: '1.4',
              color: '#1f2937',
              textAlign: 'center',
              fontFamily: caveatFontData ? 'Caveat' : 'system-ui',
              maxWidth: '900px',
            }}
          >
            {joke}
          </div>
        </div>
      ),
      imageResponseOptions
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}