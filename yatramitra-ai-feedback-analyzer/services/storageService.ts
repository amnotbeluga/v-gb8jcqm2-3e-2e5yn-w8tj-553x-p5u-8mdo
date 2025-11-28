import { Feedback, AnalysisResult } from '../types';

const STORAGE_KEY = 'yatramitra_feedback_db_v1';

// Initial seed data to make the app look populated
const SEED_DATA: Feedback[] = [
  {
    id: 'fb_1',
    targetType: 'poi',
    targetId: 'ranchi_lake_01',
    targetName: 'Ranchi Lake',
    rating: 5,
    comment: "The boating experience was absolutely wonderful! The sunset view is mesmerizing. Highly recommend for families.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'analyzed',
    analysis: {
      detectedLanguage: 'en',
      sentimentLabel: 'POSITIVE',
      sentimentScore: 0.95,
      ratingInferred: 5,
      categories: ['Attraction', 'Experience', 'Scenery'],
      safetyFlags: { isSafetyIssue: false, isUrgent: false, notes: [] },
      improvementSuggestionsSystem: [],
      improvementSuggestionsVendor: ['Maintain boat cleanliness'],
      summaryForDashboard: 'User loved the boating and sunset view.',
      shouldRaiseAlert: false,
      alertReason: '',
      analyzedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  },
  {
    id: 'fb_2',
    targetType: 'vendor',
    targetId: 'taxi_service_05',
    targetName: 'City Cab Service',
    rating: 1,
    comment: "Driver was rude and drove very rashly. I felt unsafe during the entire trip from the airport.",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    status: 'analyzed',
    analysis: {
      detectedLanguage: 'en',
      sentimentLabel: 'NEGATIVE',
      sentimentScore: 0.1,
      ratingInferred: 1,
      categories: ['Transport', 'Safety', 'Service'],
      safetyFlags: { isSafetyIssue: true, isUrgent: true, notes: ['Rash driving reported', 'Rude behavior'] },
      improvementSuggestionsSystem: ['Flag driver for review'],
      improvementSuggestionsVendor: ['Driver training required'],
      summaryForDashboard: 'Serious safety complaint regarding rash driving.',
      shouldRaiseAlert: true,
      alertReason: 'Safety concern: Rash driving',
      analyzedAt: new Date(Date.now() - 43000000).toISOString(),
    }
  },
  {
    id: 'fb_3',
    targetType: 'poi',
    targetId: 'jagannath_temple',
    targetName: 'Jagannath Temple',
    rating: 4,
    comment: "Beautiful temple architecture. However, the washrooms were not very clean.",
    createdAt: new Date().toISOString(),
    status: 'pending',
    analysis: null
  }
];

export const getFeedback = (): Feedback[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(stored);
};

export const addFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status' | 'analysis'>): Feedback => {
  const allFeedback = getFeedback();
  const newFeedback: Feedback = {
    ...feedback,
    id: `fb_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    analysis: null,
  };
  const updated = [newFeedback, ...allFeedback];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newFeedback;
};

export const updateFeedbackAnalysis = (id: string, analysis: AnalysisResult): Feedback | null => {
  const allFeedback = getFeedback();
  const index = allFeedback.findIndex(f => f.id === id);
  if (index === -1) return null;

  allFeedback[index] = {
    ...allFeedback[index],
    status: 'analyzed',
    analysis,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFeedback));
  return allFeedback[index];
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};