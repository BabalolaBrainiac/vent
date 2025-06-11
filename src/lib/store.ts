import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vent, VentCategory, VentDuration } from './types';

interface VentStore {
  vents: Vent[];
  addVent: (vent: Omit<Vent, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
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
  }
};

export const useVentStore = create<VentStore>()(
  persist(
    (set, get) => ({
      vents: [],
      addVent: (vent) => set((state) => ({
        vents: [
          {
            ...vent,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: [],
          },
          ...state.vents,
        ],
      })),
      likeVent: (id) => {
        set((state) => ({
          vents: state.vents.map((vent) =>
            vent.id === id ? { ...vent, likes: vent.likes + 1 } : vent
          ),
        }));
      },
      addComment: (ventId, content) => set((state) => ({
        vents: state.vents.map((vent) =>
          vent.id === ventId
            ? {
                ...vent,
                comments: [
                  ...vent.comments,
                  {
                    id: Math.random().toString(36).substring(7),
                    content,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : vent
        ),
      })),
      getVent: (id) => get().vents.find(vent => vent.id === id),
      addReaction: (ventId) => set((state) => ({
        vents: state.vents.map((vent) =>
          vent.id === ventId ? { ...vent, likes: vent.likes + 1 } : vent
        ),
      })),
      addCommentReaction: (ventId, commentId, type) => {
        set((state) => ({
          vents: state.vents.map((vent) =>
            vent.id === ventId
              ? {
                  ...vent,
                  comments: vent.comments.map((comment) =>
                    comment.id === commentId
                      ? {
                          ...comment,
                          reactions: {
                            ...comment.reactions,
                            [type]: comment.reactions[type] + 1,
                          },
                        }
                      : comment
                  ),
                }
              : vent
          ),
        }));
      },
      cleanupExpiredVents: () => {
        const now = new Date();
        set((state) => ({
          vents: state.vents.filter((vent) => vent.expiresAt > now),
        }));
      },
    }),
    {
      name: 'vent-storage',
    }
  )
); 