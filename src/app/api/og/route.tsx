import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { getJoke } from '@/lib/redis';

// Ensure Node.js runtime so local font loading via fs works
export const runtime = 'nodejs';

// Fetch Caveat from Google Fonts for the requested text
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('\(opentype|truetype\)'\)/);
  // The official docs example uses a simpler pattern; broaden to common src lines as fallback
  const srcMatch = resource || css.match(/src: url\(([^)]+)\)/);
  if (srcMatch && srcMatch[1]) {
    const res = await fetch(srcMatch[1]);
    if (res.status === 200) {
      return await res.arrayBuffer();
    }
  }
  throw new Error('failed to load font data');
}

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
      const errorText = 'Missing joke parameter or invalid share ID';
      let errorFontData: ArrayBuffer | undefined;
      try {
        errorFontData = await loadGoogleFont('Caveat', errorText);
      } catch {}

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
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '70px',
                lineHeight: '1.4',
                color: '#b91c1c',
                textAlign: 'center',
                fontFamily: errorFontData ? 'Caveat' : 'system-ui',
              }}
            >
              {errorText}
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          ...(errorFontData && {
            fonts: [
              {
                name: 'Caveat',
                data: errorFontData,
                style: 'normal',
                weight: 400,
              },
            ],
          }),
        }
      );
    }

    // Try to load Caveat for the exact text; fall back silently on failure
    let fontData: ArrayBuffer | undefined;
    try {
      fontData = await loadGoogleFont('Caveat', joke);
    } catch {}

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
            padding: '20px',
          }}
        >
          <div
            style={{
              fontSize: '288px',
              lineHeight: '1.4',
              color: '#1f2937',
              textAlign: 'center',
              fontFamily: fontData ? 'Caveat' : 'system-ui',
            }}
          >
            {joke}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        ...(fontData && {
          fonts: [
            {
              name: 'Caveat',
              data: fontData,
              style: 'normal',
              weight: 400,
            },
          ],
        }),
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}