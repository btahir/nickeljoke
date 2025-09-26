import { ImageResponse } from 'next/og';
import { BASE_URL } from '@/lib/constants';

export const runtime = 'edge';
export const alt = 'NickelJoke - Shared Joke';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { id: string };
}) {
  try {
    const ogUrl = `${BASE_URL}/api/og?shareId=${params.id}`;
    const response = await fetch(ogUrl);
    
    if (response.ok) {
      return response;
    }
    
    // Fallback to generic image if joke not found
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
                fontSize: '32px',
                lineHeight: '1.5',
                color: '#374151',
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              Check out this hilarious joke! 🎭
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#6b7280',
                marginTop: '20px',
              }}
            >
              Click to see the full joke
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}