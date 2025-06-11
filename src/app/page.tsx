'use client';

import { useState } from 'react';

const categories = [
  { name: 'General', emoji: '💭' },
  { name: 'Work', emoji: '💼' },
  { name: 'Relationships', emoji: '💕' },
  { name: 'Health', emoji: '🏥' },
  { name: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { name: 'Education', emoji: '📚' },
  { name: 'Other', emoji: '🌟' }
];

const expirationTimes = [
  { value: 1, label: '1 hour', emoji: '⏰' },
  { value: 3, label: '3 hours', emoji: '⌛' },
  { value: 6, label: '6 hours', emoji: '🕕' },
  { value: 12, label: '12 hours', emoji: '🕛' },
  { value: 24, label: '24 hours', emoji: '🌙' }
];

export default function Home() {
  const [ventText, setVentText] = useState('');
  const [category, setCategory] = useState('General');
  const [expirationTime, setExpirationTime] = useState(24);
  const [vents, setVents] = useState<Array<{
    id: string;
    text: string;
    category: string;
    timestamp: number;
    expirationTime: number;
    comments: Array<{
      id: string;
      text: string;
      timestamp: number;
    }>;
  }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ventText.trim()) return;

    const newVent = {
      id: Math.random().toString(36).substr(2, 9),
      text: ventText,
      category,
      timestamp: Date.now(),
      expirationTime,
      comments: []
    };

    setVents([newVent, ...vents]);
    setVentText('');
  };

  const addComment = (ventId: string, commentText: string) => {
    if (!commentText.trim()) return;

    setVents(vents.map(vent => {
      if (vent.id === ventId) {
        return {
          ...vent,
          comments: [...vent.comments, {
            id: Math.random().toString(36).substr(2, 9),
            text: commentText,
            timestamp: Date.now()
          }]
        };
      }
      return vent;
    }));
  };

  // Filter out expired vents
  const filteredVents = vents.filter(vent => 
    Date.now() - vent.timestamp < vent.expirationTime * 60 * 60 * 1000
  );

  const getCategoryEmoji = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName)?.emoji || '💭';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-12 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <div className="animate-bounce-slow inline-block mb-6">
          <div className="text-6xl">🌟</div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-animated">
          Welcome to Vent.Help
        </h1>
        <p className="text-text-secondary text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          A safe space to share your thoughts anonymously. Express yourself freely, 
          connect with others, and find support. Choose how long your post stays visible.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="glass rounded-2xl px-6 py-3">
            <span className="text-accent-purple font-semibold">🔒 Anonymous</span>
          </div>
          <div className="glass rounded-2xl px-6 py-3">
            <span className="text-accent-blue font-semibold">⏱️ Custom Duration</span>
          </div>
          <div className="glass rounded-2xl px-6 py-3">
            <span className="text-accent-pink font-semibold">💚 Safe Space</span>
          </div>
        </div>
      </div>

      {/* Vent Form */}
      <div className="card p-8">
        <h2 className="section-title">Share Your Thoughts</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="category" className="block text-lg font-semibold mb-4 text-text-secondary">
              Choose a Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    category === cat.name
                      ? 'border-accent-purple bg-accent-purple/20 text-accent-purple'
                      : 'border-accent-purple/20 hover:border-accent-purple/40 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="text-sm font-medium">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4 text-text-secondary">
              How long should this post stay visible?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {expirationTimes.map((time) => (
                <button
                  key={time.value}
                  type="button"
                  onClick={() => setExpirationTime(time.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    expirationTime === time.value
                      ? 'border-accent-blue bg-accent-blue/20 text-accent-blue'
                      : 'border-accent-blue/20 hover:border-accent-blue/40 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <div className="text-2xl mb-2">{time.emoji}</div>
                  <div className="text-sm font-medium">{time.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="vent" className="block text-lg font-semibold mb-4 text-text-secondary">
              What's on your mind?
            </label>
            <textarea
              id="vent"
              rows={6}
              value={ventText}
              onChange={(e) => setVentText(e.target.value)}
              className="input-field w-full p-4 text-lg"
              placeholder="Share your thoughts, feelings, or experiences anonymously..."
            />
            <div className="mt-2 text-right text-sm text-text-secondary">
              {ventText.length}/1000 characters
            </div>
          </div>
          <button
            type="submit"
            disabled={!ventText.trim()}
            className="btn-primary w-full py-4 px-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🚀 Share Your Thoughts
          </button>
        </form>
      </div>

      {/* Vents Feed */}
      <div className="space-y-8">
        {filteredVents.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4 animate-pulse-slow">💭</div>
            <h3 className="text-2xl font-semibold text-text-secondary mb-2">
              No vents yet
            </h3>
            <p className="text-text-secondary">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          filteredVents.map((vent, index) => (
            <div 
              key={vent.id} 
              className="card p-8 animate-slide-in hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="tag">
                    <span className="mr-2">{getCategoryEmoji(vent.category)}</span>
                    {vent.category}
                  </div>
                  <div className="text-sm text-text-secondary bg-secondary/30 px-3 py-1 rounded-full">
                    ⏱️ {vent.expirationTime} hours
                  </div>
                </div>
                <span className="text-sm text-text-secondary bg-secondary/30 px-3 py-1 rounded-full">
                  {new Date(vent.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-text-primary mb-8 leading-relaxed text-lg">{vent.text}</p>
              
              <div className="space-y-6">
                {vent.comments.map((comment, commentIndex) => (
                  <div 
                    key={comment.id} 
                    className="glass rounded-xl p-6 border border-accent-blue/20 animate-fade-in"
                    style={{ animationDelay: `${commentIndex * 100}ms` }}
                  >
                    <p className="text-text-primary mb-3 leading-relaxed">{comment.text}</p>
                    <span className="text-xs text-text-secondary">
                      💬 {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('comment') as HTMLInputElement;
                    addComment(vent.id, input.value);
                    input.value = '';
                  }}
                  className="flex gap-4"
                >
                  <input
                    type="text"
                    name="comment"
                    placeholder="Add a supportive comment..."
                    className="input-field flex-1 p-4"
                  />
                  <button
                    type="submit"
                    className="btn-secondary px-6 py-4 text-sm font-semibold"
                  >
                    💬 Comment
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
