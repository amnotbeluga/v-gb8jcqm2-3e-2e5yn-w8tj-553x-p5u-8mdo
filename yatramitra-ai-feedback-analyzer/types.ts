export type TargetType = 'poi' | 'vendor' | 'itinerary' | 'assistant' | 'other';
export type SentimentLabel = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED';

export interface SafetyFlags {
  isSafetyIssue: boolean;
  isUrgent: boolean;
  notes: string[];
}

export interface AnalysisResult {
  detectedLanguage: string;
  sentimentLabel: SentimentLabel;
  sentimentScore: number;
  ratingInferred: number | null;
  categories: string[];
  safetyFlags: SafetyFlags;
  improvementSuggestionsSystem: string[];
  improvementSuggestionsVendor: string[];
  summaryForDashboard: string;
  shouldRaiseAlert: boolean;
  alertReason: string;
  analyzedAt: string; // ISO Date string
}

export interface Feedback {
  id: string;
  userId?: string;
  targetType: TargetType;
  targetId: string;
  targetName: string; // Added for UI clarity
  rating?: number;
  comment: string;
  createdAt: string; // ISO Date string
  analysis: AnalysisResult | null;
  status: 'pending' | 'analyzed' | 'failed';
}

export interface DashboardMetrics {
  totalFeedback: number;
  pendingAnalysis: number;
  sentimentBreakdown: Record<SentimentLabel, number>;
  totalAlerts: number;
  urgentSafetyIssues: number;
}