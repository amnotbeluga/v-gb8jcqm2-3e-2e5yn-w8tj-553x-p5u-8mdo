export interface VisitRecord {
  visit_id: string;
  user_id: string;
  visit_date: string;
  district: string;
  origin_state: string;
  place_id: string;
  place_name: string;
  place_category: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  landing_page: string;
  traffic_source: string;
  device_type: string;
  ai_queries: number;
  got_directions: boolean;
  rating: number | null;
  sentiment: 'Positive' | 'Neutral' | 'Negative' | null;
  estimated_spend_inr: number;
  session_duration_sec: number;
  is_peak_season: boolean;
}

export interface DashboardMetrics {
  totalVisitors: number;
  totalDirections: number;
  totalAiQueries: number;
  avgRating: number;
  visitsOverTime: { date: string; count: number }[];
  topDestinations: { name: string; category: string; district: string; visits: number; directions: number }[];
  categoryShare: { name: string; value: number }[];
  sentimentTrend: { date: string; Positive: number; Neutral: number; Negative: number }[];
  districtTraffic: { district: string; visits: number }[];
}

export interface AiLog {
  id: string;
  query: string;
  category: 'Travel' | 'Stay' | 'Food' | 'Events' | 'Safety';
  timestamp: string;
  status: 'Resolved' | 'Unresolved';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export type ViewType = 'overview' | 'destinations' | 'ai-logs' | 'settings';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}