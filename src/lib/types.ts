export type VentCategory = 'General' | 'Anxiety' | 'Depression' | 'Relationships' | 'Work' | 'Family' | 'Other';
export type VentDuration = '1 hour' | '6 hours' | '12 hours' | '24 hours' | '3 days' | '1 week';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface Vent {
  id: string;
  content: string;
  category: VentCategory;
  duration: VentDuration;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export const VENT_CATEGORIES: { value: VentCategory; label: string; emoji: string }[] = [
  { value: 'General', label: 'General', emoji: '💭' },
  { value: 'Anxiety', label: 'Anxiety', emoji: '😰' },
  { value: 'Depression', label: 'Depression', emoji: '😔' },
  { value: 'Relationships', label: 'Relationships', emoji: '❤️' },
  { value: 'Work', label: 'Work', emoji: '💼' },
  { value: 'Family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { value: 'Other', label: 'Other', emoji: '✨' },
];

export const VENT_DURATIONS: { value: VentDuration; label: string }[] = [
  { value: '1 hour', label: '1 Hour' },
  { value: '6 hours', label: '6 Hours' },
  { value: '12 hours', label: '12 Hours' },
  { value: '24 hours', label: '24 Hours' },
  { value: '3 days', label: '3 Days' },
  { value: '1 week', label: '1 Week' },
]; 