'use client';

import { useState, useEffect } from 'react';
import { useVentStore } from '@/lib/store';
import { VENT_CATEGORIES, VENT_DURATIONS, VentCategory, VentDuration } from '@/lib/types';
import { ChevronDown, Share2, Heart, MessageCircle, Link as LinkIcon, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function VentPage() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<VentCategory>('General');
  const [duration, setDuration] = useState<VentDuration>('24 hours');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState<string | null>(null);
  const addVent = useVentStore((state) => state.addVent);
  const fetchVents = useVentStore((state) => state.fetchVents);
  const vents = useVentStore((state) => state.vents);
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>({});
  const likeVent = useVentStore((state) => state.likeVent);
  const addComment = useVentStore((state) => state.addComment);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showCommentInput, setShowCommentInput] = useState<Record<string, boolean>>({});
  const [likedVents, setLikedVents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchVents();
  }, [fetchVents]);

  useEffect(() => {
    // Fetch comments for all vents
    const fetchComments = async () => {
      const map: Record<string, any[]> = {};
      await Promise.all(
        vents.map(async (vent) => {
          const res = await fetch(`/api/comments/${vent.id}`);
          if (res.ok) {
            const comments = await res.json();
            map[vent.id] = Array.isArray(comments) ? comments : [];
          } else {
            map[vent.id] = [];
          }
        })
      );
      setCommentsMap(map);
    };
    if (vents.length > 0) fetchComments();
  }, [vents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addVent({
      content: content.trim(),
      category,
      duration,
    });
    await fetchVents();
    setContent('');
  };

  const handleShare = (ventId: string, platform?: string) => {
    const vent = vents.find(v => v.id === ventId);
    if (!vent) return;

    const shareUrl = `${window.location.origin}/vent/${ventId}`;
    const shareText = vent.content;
    const shareTitle = 'A Vent on VentIT';

    if (platform) {
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'link':
          navigator.clipboard.writeText(shareUrl);
          // You might want to show a toast notification here
          break;
        case 'native':
          if (navigator.share) {
            navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            });
          }
          break;
      }
    }
    setShowShareOptions(null);
  };

  return (
    <main className="min-h-screen py-8 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        {/* Vent Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 animate-fade-in relative z-20">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 bg-[#1E293B]/50 border border-[#8B5CF6]/20 rounded-xl p-4 text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsDurationOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#1E293B]/50 border border-[#8B5CF6]/20 rounded-xl px-4 py-3 text-[#F8FAFC] hover:bg-[#1E293B]/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{VENT_CATEGORIES.find(c => c.value === category)?.emoji}</span>
                    <span>{VENT_CATEGORIES.find(c => c.value === category)?.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute z-30 w-full mt-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl shadow-lg overflow-hidden">
                    {VENT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setIsCategoryOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration Dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsDurationOpen(!isDurationOpen);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#1E293B]/50 border border-[#8B5CF6]/20 rounded-xl px-4 py-3 text-[#F8FAFC] hover:bg-[#1E293B]/70 transition-colors"
                >
                  <span>{VENT_DURATIONS.find(d => d.value === duration)?.label}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isDurationOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDurationOpen && (
                  <div className="absolute z-30 w-full mt-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl shadow-lg overflow-hidden">
                    {VENT_DURATIONS.map((dur) => (
                      <button
                        key={dur.value}
                        type="button"
                        onClick={() => {
                          setDuration(dur.value);
                          setIsDurationOpen(false);
                        }}
                        className="w-full px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors text-left"
                      >
                        {dur.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Share Your Vent
            </button>
          </div>
        </form>

        {/* Vents List */}
        <div className="space-y-4 relative z-10">
          {vents.map((vent) => (
            <div key={vent.id} className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-2 text-[#94A3B8] mb-4">
                <span className="px-3 py-1 rounded-full text-sm bg-[#8B5CF6]/10 text-[#8B5CF6]">
                  {VENT_CATEGORIES.find(c => c.value === vent.category)?.emoji} {vent.category}
                </span>
                <span className="text-sm">
                  Expires in {vent.duration}
                </span>
              </div>
              
              <p className="text-[#F8FAFC] whitespace-pre-wrap mb-4">
                {vent.content}
              </p>

              <div className="flex items-center justify-between text-[#94A3B8] text-sm">
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-1 transition-colors ${likedVents[vent.id] ? 'text-[#8B5CF6]' : 'hover:text-[#8B5CF6] text-[#94A3B8]'}`}
                    onClick={() => {
                      if (!likedVents[vent.id]) {
                        likeVent(vent.id);
                        setLikedVents((prev) => ({ ...prev, [vent.id]: true }));
                      }
                    }}
                  >
                    <Heart className="w-5 h-5" />
                    <span>{vent.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#8B5CF6] transition-colors" onClick={() => setShowCommentInput((prev) => ({ ...prev, [vent.id]: !prev[vent.id] }))}>
                    <MessageCircle className="w-5 h-5" />
                    <span>{commentsMap[vent.id]?.length ?? 0}</span>
                  </button>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowShareOptions(showShareOptions === vent.id ? null : vent.id)}
                    className="flex items-center gap-1 hover:text-[#8B5CF6] transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  {showShareOptions === vent.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl shadow-lg overflow-hidden z-20">
                      <button
                        onClick={() => handleShare(vent.id, 'native')}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share via...</span>
                      </button>
                      <button
                        onClick={() => handleShare(vent.id, 'twitter')}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare(vent.id, 'facebook')}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare(vent.id, 'linkedin')}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare(vent.id, 'link')}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              {commentsMap[vent.id] && commentsMap[vent.id].length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-[#94A3B8] text-sm font-semibold mb-1">Comments:</div>
                  {commentsMap[vent.id].map((comment) => (
                    <div key={comment.id} className="bg-[#1E293B]/40 rounded-lg px-4 py-2 text-[#F8FAFC] text-sm">
                      {comment.content}
                      <div className="text-xs text-[#94A3B8] mt-1">{new Date(comment.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              {showCommentInput[vent.id] && (
                <form
                  className="flex gap-2 mt-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!commentInputs[vent.id]?.trim()) return;
                    await addComment(vent.id, commentInputs[vent.id]);
                    setCommentInputs((prev) => ({ ...prev, [vent.id]: '' }));
                    // Refresh comments for this vent
                    const res = await fetch(`/api/comments/${vent.id}`);
                    if (res.ok) {
                      const comments = await res.json();
                      setCommentsMap((prev) => ({ ...prev, [vent.id]: comments }));
                    }
                  }}
                >
                  <input
                    type="text"
                    value={commentInputs[vent.id] || ''}
                    onChange={(e) => setCommentInputs((prev) => ({ ...prev, [vent.id]: e.target.value }))}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 rounded-lg bg-[#1E293B]/40 border border-[#8B5CF6]/20 text-[#F8FAFC] focus:outline-none"
                  />
                  <button type="submit" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-2 rounded-lg transition-colors">
                    Post
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 