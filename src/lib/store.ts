import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vent, VentCategory } from './types';

export type VentDuration = '1h' | '6h' | '12h' | '24h' | '48h' | '1w';

interface VentStore {
  vents: Vent[];
  fetchVents: () => Promise<void>;
  addVent: (vent: Omit<Vent, 'id' | 'createdAt' | 'likes' | 'comments'>) => Promise<void>;
  likeVent: (id: string) => void;
  addComment: (ventId: string, content: string) => void;
  getVent: (id: string) => Vent | undefined;
  addReaction: (ventId: string) => void;
  addCommentReaction: (ventId: string, commentId: string, type: 'support' | 'relate' | 'hugs') => void;
  cleanupExpiredVents: () => void;
}

const calculateExpiryDate = (duration: VentDuration): Date => {
  const now = new Date();
  switch (duration) {
    case '1h':
      return new Date(now.getTime() + 60 * 60 * 1000);
    case '6h':
      return new Date(now.getTime() + 6 * 60 * 60 * 1000);
    case '12h':
      return new Date(now.getTime() + 12 * 60 * 60 * 1000);
    case '24h':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case '48h':
      return new Date(now.getTime() + 48 * 60 * 60 * 1000);
    case '1w':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000); // Default to 24h
  }
};

export const useVentStore = create<VentStore>()(
  persist(
    (set, get) => ({
      vents: [],
      fetchVents: async () => {
        const res = await fetch('/api/vents');
        if (res.ok) {
          let data = await res.json();
          data = data.map((v: any) => ({
            ...v,
            createdAt: v.created_at,
          }));
          set({ vents: data });
        }
      },
      addVent: async (vent) => {
        const res = await fetch('/api/vents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vent),
        });
        if (res.ok) {
          const newVent = await res.json();
          set((state) => ({ vents: [newVent, ...state.vents] }));
        }
      },
      likeVent: async (id) => {
        // Find the vent
        const vent = get().vents.find(v => v.id === id);
        if (!vent) return;
        // Increment likes in Supabase
        const res = await fetch(`/api/vents/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ likes: vent.likes + 1 }),
        });
        if (res.ok) {
          // Refresh vents
          await get().fetchVents();
        }
      },
      addComment: async (ventId, content) => {
        await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vent_id: ventId, content }),
        });
        // No need to update store here, handled in UI
      },
      getVent: (id) => get().vents.find(vent => vent.id === id),
      addReaction: (ventId) => {}, // To be implemented with API
      addCommentReaction: (ventId, commentId, type) => {}, // To be implemented with API
      cleanupExpiredVents: () => {}, // Not needed with persistent backend
    }),
    {
      name: 'vent-storage',
    }
  )
);