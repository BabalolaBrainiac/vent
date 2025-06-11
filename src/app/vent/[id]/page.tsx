import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useVentStore } from '@/lib/store';

// Generate metadata for the vent
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const vent = useVentStore.getState().getVent(params.id);
  
  if (!vent) {
    return {
      title: 'Vent Not Found - VentIT',
    };
  }

  return {
    title: `Vent by Anonymous - VentIT`,
    description: vent.content.length > 100 ? `${vent.content.substring(0, 100)}...` : vent.content,
    openGraph: {
      title: 'A Vent on VentIT',
      description: vent.content.length > 100 ? `${vent.content.substring(0, 100)}...` : vent.content,
      type: 'article',
      siteName: 'VentIT',
      images: [
        {
          url: `/api/og?content=${encodeURIComponent(vent.content)}&category=${vent.category}`,
          width: 1200,
          height: 630,
          alt: 'VentIT Share Card',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'A Vent on VentIT',
      description: vent.content.length > 100 ? `${vent.content.substring(0, 100)}...` : vent.content,
      images: [`/api/og?content=${encodeURIComponent(vent.content)}&category=${vent.category}`],
    },
  };
}

export default function VentPage({ params }: { params: { id: string } }) {
  const vent = useVentStore.getState().getVent(params.id);

  if (!vent) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="glass rounded-2xl p-8 animate-fade-in">
          <div className="flex items-center gap-2 text-[#94A3B8] mb-4">
            <span className="px-3 py-1 rounded-full text-sm bg-[#8B5CF6]/10 text-[#8B5CF6]">
              {vent.category}
            </span>
            <span className="text-sm">
              Expires in {vent.duration}
            </span>
          </div>
          
          <p className="text-lg text-[#F8FAFC] whitespace-pre-wrap mb-6">
            {vent.content}
          </p>

          <div className="flex items-center justify-between text-[#94A3B8] text-sm">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-[#8B5CF6] transition-colors">
                <span>❤️</span>
                <span>{vent.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-[#8B5CF6] transition-colors">
                <span>💭</span>
                <span>{vent.comments.length}</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  navigator.share({
                    title: 'A Vent on VentIT',
                    text: vent.content,
                    url: window.location.href,
                  });
                }}
                className="hover:text-[#8B5CF6] transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 