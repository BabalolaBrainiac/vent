'use client';

import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#EC4899]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl text-center space-y-8 relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text-animated mb-6">
            Welcome to VentIT
          </h1>
          <p className="text-xl text-[#94A3B8] leading-relaxed">
            Your safe space to express yourself freely. Share your thoughts, connect with understanding people, and find support - all without revealing your identity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <Link 
            href="/vent" 
            className="btn-primary px-8 py-3 flex items-center gap-2 animate-breathe"
          >
            Start Venting <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/resources" 
            className="btn-secondary px-8 py-3 flex items-center gap-2"
          >
            Mental Health Resources <Heart className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#94A3B8] animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass rounded-xl p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">100% Anonymous</h3>
            <p>Express yourself freely without revealing your identity</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-2xl mb-2">⏱️</div>
            <h3 className="font-semibold mb-1">Auto-Expiring Posts</h3>
            <p>Your vents automatically disappear after your chosen duration</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-2xl mb-2">💝</div>
            <h3 className="font-semibold mb-1">Supportive Community</h3>
            <p>Connect with understanding people who care</p>
          </div>
        </div>
      </div>
    </main>
  );
}
