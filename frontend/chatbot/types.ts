
import { SUPPORTED_LANGUAGES } from './constants';

export enum Role {
  USER = 'user',
  ASSISTANT = 'model',
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  language: Language;
  updatedAt: number;
}

export interface PromptSuggestion {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}

export interface Itinerary {
  id: string;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number }; // Added coordinates
  duration: number; // in days
  interests: string[];
  description: string;
}

export type Language = typeof SUPPORTED_LANGUAGES[number];