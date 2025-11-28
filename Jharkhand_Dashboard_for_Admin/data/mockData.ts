import { VisitRecord, AiLog } from '../types';

const PLACES = [
  { id: 'P001', name: 'Hundru Falls', category: 'Waterfall', district: 'Ranchi' },
  { id: 'P002', name: 'Dassam Falls', category: 'Waterfall', district: 'Ranchi' },
  { id: 'P003', name: 'Jonha Falls', category: 'Waterfall', district: 'Ranchi' },
  { id: 'P004', name: 'Patratu Valley', category: 'Hill Viewpoint', district: 'Ramgarh' },
  { id: 'P005', name: 'Netarhat Hills', category: 'Hill Station', district: 'Latehar' },
  { id: 'P006', name: 'Betla National Park', category: 'Wildlife', district: 'Latehar' },
  { id: 'P007', name: 'Jubilee Park', category: 'City Park', district: 'East Singhbhum' },
  { id: 'P008', name: 'Dimna Lake', category: 'Lake', district: 'East Singhbhum' },
  { id: 'P009', name: 'Baidhyanath Dham', category: 'Temple', district: 'Deoghar' },
  { id: 'P010', name: 'Shikharji Parasnath', category: 'Temple', district: 'Giridih' },
  { id: 'P011', name: 'Maithon Dam', category: 'Lake/Dam', district: 'Dhanbad' },
  { id: 'P012', name: 'Hazaribagh Lake', category: 'Lake', district: 'Hazaribagh' },
];

const STATES = ['Jharkhand', 'Bihar', 'West Bengal', 'Odisha', 'Uttar Pradesh', 'Other'];
const SOURCES = ['Organic', 'Direct', 'Social', 'Referral', 'Paid'];
const DEVICES = ['Mobile', 'Desktop', 'Tablet'];

export const generateMockData = (count: number): VisitRecord[] => {
  const data: VisitRecord[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const place = PLACES[Math.floor(Math.random() * PLACES.length)];
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Last 30 days
    
    const age = 15 + Math.floor(Math.random() * 55);
    const aiQueries = Math.floor(Math.random() * 5); // 0 to 4 queries
    const gotDirections = Math.random() > 0.6; // 40% chance
    
    let rating: number | null = null;
    let sentiment: any = null;
    if (Math.random() > 0.7) {
      rating = 3 + Math.floor(Math.random() * 3); // 3, 4, or 5
      sentiment = rating >= 4 ? 'Positive' : rating === 3 ? 'Neutral' : 'Negative';
    }

    data.push({
      visit_id: `V${1000 + i}-${Date.now()}`, // Ensure uniqueness on refresh
      user_id: `U${2000 + i}`,
      visit_date: date.toISOString().split('T')[0],
      district: place.district,
      origin_state: STATES[Math.floor(Math.random() * STATES.length)],
      place_id: place.id,
      place_name: place.name,
      place_category: place.category,
      age,
      sex: Math.random() > 0.5 ? 'Male' : 'Female',
      landing_page: Math.random() > 0.3 ? 'Home' : 'Place Detail',
      traffic_source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
      device_type: DEVICES[Math.floor(Math.random() * DEVICES.length)],
      ai_queries: aiQueries,
      got_directions: gotDirections,
      rating,
      sentiment,
      estimated_spend_inr: Math.floor(Math.random() * 5000),
      session_duration_sec: 30 + Math.floor(Math.random() * 600),
      is_peak_season: Math.random() > 0.5,
    });
  }
  
  // sort by date
  return data.sort((a, b) => new Date(a.visit_date).getTime() - new Date(b.visit_date).getTime());
};

const AI_QUESTIONS = [
  "Best time to visit Netarhat?",
  "Are there hotels near Hundru Falls?",
  "Bus timings from Ranchi to Deoghar?",
  "Is it safe to travel at night?",
  "Entry fee for Betla National Park",
  "Vegetarian restaurants near Jagannath Temple",
  "Taxi fare from airport",
  "Local festivals in November",
  "Wheelchair accessibility at Dasham Falls",
  "Camping spots in Patratu"
];

const AI_CATEGORIES: ('Travel' | 'Stay' | 'Food' | 'Events' | 'Safety')[] = ['Travel', 'Stay', 'Travel', 'Safety', 'Travel', 'Food', 'Travel', 'Events', 'Travel', 'Stay'];

export const generateMockAiLogs = (count: number): AiLog[] => {
  return Array.from({ length: count }).map((_, i) => {
    const qIndex = Math.floor(Math.random() * AI_QUESTIONS.length);
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 48));
    
    return {
      id: `LOG-${i}-${Date.now()}`,
      query: AI_QUESTIONS[qIndex],
      category: AI_CATEGORIES[qIndex],
      timestamp: date.toLocaleString(),
      status: Math.random() > 0.1 ? 'Resolved' : 'Unresolved',
      sentiment: Math.random() > 0.8 ? 'Negative' : Math.random() > 0.4 ? 'Neutral' : 'Positive'
    };
  });
};

export const processData = (data: VisitRecord[]) => {
  const totalVisitors = data.length;
  const totalDirections = data.filter(r => r.got_directions).length;
  const totalAiQueries = data.reduce((acc, curr) => acc + curr.ai_queries, 0);
  
  const ratings = data.filter(r => r.rating !== null).map(r => r.rating as number);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 'N/A';

  // Visits over time
  const dateMap = new Map<string, number>();
  data.forEach(r => {
    dateMap.set(r.visit_date, (dateMap.get(r.visit_date) || 0) + 1);
  });
  const visitsOverTime = Array.from(dateMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Top Destinations
  const destMap = new Map<string, { visits: number; directions: number; category: string; district: string }>();
  data.forEach(r => {
    const curr = destMap.get(r.place_name) || { visits: 0, directions: 0, category: r.place_category, district: r.district };
    destMap.set(r.place_name, {
      visits: curr.visits + 1,
      directions: curr.directions + (r.got_directions ? 1 : 0),
      category: r.place_category,
      district: r.district
    });
  });
  const topDestinations = Array.from(destMap.entries())
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 8);

  // Category Share
  const catMap = new Map<string, number>();
  data.forEach(r => {
    catMap.set(r.place_category, (catMap.get(r.place_category) || 0) + 1);
  });
  const categoryShare = Array.from(catMap.entries()).map(([name, value]) => ({ name, value }));

  // District Traffic
  const distMap = new Map<string, number>();
  data.forEach(r => {
    distMap.set(r.district, (distMap.get(r.district) || 0) + 1);
  });
  const districtTraffic = Array.from(distMap.entries()).map(([district, visits]) => ({ district, visits })).sort((a,b) => b.visits - a.visits);

  // Sentiment Trend
  const sentimentMap = new Map<string, { Positive: number; Neutral: number; Negative: number }>();
  data.forEach(r => {
    if (!sentimentMap.has(r.visit_date)) {
      sentimentMap.set(r.visit_date, { Positive: 0, Neutral: 0, Negative: 0 });
    }
    const curr = sentimentMap.get(r.visit_date)!;
    
    if (r.sentiment === 'Positive') curr.Positive++;
    else if (r.sentiment === 'Neutral') curr.Neutral++;
    else if (r.sentiment === 'Negative') curr.Negative++;
  });
  
  const sentimentTrend = Array.from(sentimentMap.entries())
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    totalVisitors,
    totalDirections,
    totalAiQueries,
    avgRating: Number(avgRating) || 0,
    visitsOverTime,
    topDestinations,
    categoryShare,
    districtTraffic,
    sentimentTrend
  };
};