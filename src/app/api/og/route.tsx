import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { getJoke } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let joke: string | null = searchParams.get('joke');
    let topic: string | null = searchParams.get('topic');
    const shareId = searchParams.get('shareId');

    // If shareId is provided, fetch from Redis
    if (shareId) {
      const jokeData = await getJoke(shareId);
      if (jokeData) {
        joke = jokeData.joke;
        topic = jokeData.topic || null;
      } else {
        // Fallback when Redis has expired or shareId is invalid
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fef7e7',
            backgroundImage: 'linear-gradient(45deg, #fef7e7 0%, #fde68a 100%)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '50%',
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                }}
              >
                😄
              </div>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                }}
              >
                NickelJoke
              </h1>
            </div>
            <div
              style={{
                fontSize: '24px',
                lineHeight: '1.5',
                color: '#374151',
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              {joke}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}