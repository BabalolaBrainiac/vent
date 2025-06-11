"use client";

import { useState, useEffect } from "react";
import { useVentStore } from "@/lib/store";
import { VENT_CATEGORIES, VentCategory } from "@/lib/types";
import { ChevronDown, Filter } from "lucide-react";

export default function VentsPage() {
  const vents = useVentStore((state) => state.vents);
  const fetchVents = useVentStore((state) => state.fetchVents);
  const [category, setCategory] = useState<VentCategory | "All">("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sort, setSort] = useState<"recent" | "expiring">("recent");
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchVents();
  }, [fetchVents]);

  useEffect(() => {
    // Fetch comment counts for all vents
    const fetchCounts = async () => {
      const counts: Record<string, number> = {};
      await Promise.all(
        vents.map(async (vent) => {
          const res = await fetch(`/api/comments/${vent.id}`);
          if (res.ok) {
            const comments = await res.json();
            counts[vent.id] = Array.isArray(comments) ? comments.length : 0;
          } else {
            counts[vent.id] = 0;
          }
        })
      );
      setCommentCounts(counts);
    };
    if (vents.length > 0) fetchCounts();
  }, [vents]);

  // Filter and sort vents
  const filteredVents = vents
    .filter((vent) => category === "All" || vent.category === category)
    .sort((a, b) => {
      if (sort === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        // For expiring soon, sort by createdAt + duration (not implemented, fallback to createdAt)
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <main className="min-h-screen py-8 px-4 relative">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold gradient-text-animated">Explore Vents</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Category Filter */}
            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsCategoryOpen((v) => !v)}
                className="flex items-center gap-2 bg-[#1E293B]/50 border border-[#8B5CF6]/20 rounded-xl px-4 py-2 text-[#F8FAFC] hover:bg-[#1E293B]/70 transition-colors w-full sm:w-auto"
              >
                <Filter className="w-4 h-4" />
                <span>{category === "All" ? "All Categories" : VENT_CATEGORIES.find((c) => c.value === category)?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute z-30 w-full mt-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl shadow-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("All");
                      setIsCategoryOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                  >
                    <span>🌈</span>
                    <span>All Categories</span>
                  </button>
                  {VENT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setCategory(cat.value);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-[#F8FAFC] hover:bg-[#8B5CF6]/10 transition-colors"
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Sort Filter */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "expiring")}
              className="bg-[#1E293B]/50 border border-[#8B5CF6]/20 rounded-xl px-4 py-2 text-[#F8FAFC] focus:outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="expiring">Expiring Soon</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {filteredVents.length === 0 ? (
            <div className="text-center text-[#94A3B8]">No vents found for this filter.</div>
          ) : (
            filteredVents.map((vent) => (
              <div key={vent.id} className="glass rounded-2xl p-6 animate-fade-in">
                <div className="flex items-center gap-2 text-[#94A3B8] mb-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    {VENT_CATEGORIES.find((c) => c.value === vent.category)?.emoji} {vent.category}
                  </span>
                  <span className="text-sm">{new Date(vent.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-[#F8FAFC] whitespace-pre-wrap mb-4">{vent.content}</p>
                <div className="flex items-center gap-6 text-[#94A3B8] text-sm">
                  <span>❤️ {vent.likes}</span>
                  <span>💬 {commentCounts[vent.id] ?? 0}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 