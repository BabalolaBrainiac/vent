import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const content = searchParams.get('content');
  const category = searchParams.get('category');

  if (!content) {
    return new Response('Missing content parameter', { status: 400 });
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
          backgroundColor: '#0F172A',
          padding: '40px',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '24px',
            padding: '40px',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#8B5CF6',
              }}
            >
              VentIT
            </span>
            {category && (
              <span
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  color: '#8B5CF6',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                }}
              >
                {category}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: '32px',
              lineHeight: '1.4',
              color: '#F8FAFC',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {content}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 