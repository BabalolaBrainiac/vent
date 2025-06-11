'use client';

import Link from 'next/link';
import { ArrowLeft, Phone, Globe, Heart } from 'lucide-react';

export default function Resources() {
  return (
    <main className="min-h-screen py-12 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-12">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text-animated mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl text-[#94A3B8]">
              Here are some helpful resources for your mental well-being. Remember, it's okay to ask for help.
            </p>
          </div>

          {/* Crisis Hotlines */}
          <div className="glass rounded-2xl p-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-[#8B5CF6]" />
              Crisis Hotlines
            </h2>
            <div className="grid gap-4">
              <div className="glass-strong rounded-xl p-4">
                <h3 className="font-semibold mb-2">National Suicide Prevention Lifeline</h3>
                <p className="text-[#94A3B8] mb-2">24/7 support for people in suicidal crisis or emotional distress</p>
                <a href="tel:988" className="text-[#8B5CF6] hover:text-[#7C3AED] font-medium">
                  988
                </a>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <h3 className="font-semibold mb-2">Crisis Text Line</h3>
                <p className="text-[#94A3B8] mb-2">24/7 text support for any type of crisis</p>
                <p className="text-[#8B5CF6] font-medium">Text HOME to 741741</p>
              </div>
            </div>
          </div>

          {/* Online Resources */}
          <div className="glass rounded-2xl p-8 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#8B5CF6]" />
              Online Resources
            </h2>
            <div className="grid gap-4">
              <a 
                href="https://www.nami.org/help" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-strong rounded-xl p-4 hover:scale-[1.02] transition-transform"
              >
                <h3 className="font-semibold mb-2">NAMI HelpLine</h3>
                <p className="text-[#94A3B8]">Free mental health support, resources, and referrals</p>
              </a>
              <a 
                href="https://www.samhsa.gov/find-help/national-helpline" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-strong rounded-xl p-4 hover:scale-[1.02] transition-transform"
              >
                <h3 className="font-semibold mb-2">SAMHSA's National Helpline</h3>
                <p className="text-[#94A3B8]">24/7 treatment referral and information service</p>
              </a>
            </div>
          </div>

          {/* Self-Care Tips */}
          <div className="glass rounded-2xl p-8 animate-slide-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#8B5CF6]" />
              Self-Care Tips
            </h2>
            <div className="grid gap-4">
              <div className="glass-strong rounded-xl p-4">
                <h3 className="font-semibold mb-2">Practice Mindfulness</h3>
                <p className="text-[#94A3B8]">Take a few minutes each day to focus on your breath and be present in the moment.</p>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <h3 className="font-semibold mb-2">Stay Connected</h3>
                <p className="text-[#94A3B8]">Reach out to friends and family, or join a support group to share your feelings.</p>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <h3 className="font-semibold mb-2">Maintain a Routine</h3>
                <p className="text-[#94A3B8]">Create a daily schedule that includes time for work, rest, and activities you enjoy.</p>
              </div>
            </div>
          </div>

          <div className="text-center text-[#94A3B8] mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="mb-4">Remember: You're not alone, and it's okay to ask for help.</p>
            <Link 
              href="/vent" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Venting
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 