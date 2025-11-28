export interface ItineraryItem {
  time_block: string;
  place_name: string;
  category: string;
  description: string;
  approx_travel_time: string;
  approx_distance_km: number;
  estimated_cost_range_inr: string;
  safety_notes: string[];
  image_prompt?: string; 
}

export interface DayPlan {
  day: number;
  date?: string; 
  title: string;
  items: ItineraryItem[];
  day_estimated_cost_range_inr: string;
}

export interface HotelRecommendation {
  name: string;
  rating: string;
  approx_price: string;
  location_note: string; // e.g., "Near Airport"
  description: string;
}

export interface ItineraryResponse {
  language: string;
  summary_text: string;
  arrival_logistics?: {
    arrival_mode: string; // e.g. Airport, Train
    advice: string;
    recommended_hotels: HotelRecommendation[];
  };
  itinerary: DayPlan[];
  total_estimated_cost_range_inr: string;
  recommended_checklist: string[];
  general_safety_notes: string[];
  ui_suggestions: {
    show_save_button: boolean;
    show_create_new_button: boolean;
    tags: string[];
  };
  createdAt?: number;
  id?: string;
}

export interface UserInput {
  startDate: string;
  endDate: string;
  interests: string[];
  budgetType: "preset" | "custom";
  budgetLevel?: "low" | "mid" | "high";
  customBudgetMin?: number;
  customBudgetMax?: number;
  travellers: number;
  start_city: string;
  // language is now managed globally but passed to API
}

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}