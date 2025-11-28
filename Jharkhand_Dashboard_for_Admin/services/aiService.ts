import { GoogleGenAI } from "@google/genai";
import { DashboardMetrics } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDashboardInsights = async (metrics: DashboardMetrics): Promise<string> => {
  // Create a copy of categoryShare before sorting to avoid mutating read-only state
  const topCategory = [...metrics.categoryShare].sort((a, b) => b.value - a.value)[0]?.name;

  const prompt = `
    You are a senior tourism data analyst for the state of Jharkhand, India. 
    Analyze the following dashboard metrics and provide a concise, actionable executive summary (max 200 words) for tourism officials.
    
    Focus on:
    1. Visitor trends (growth/decline).
    2. High-performing destinations and categories.
    3. AI Assistant engagement usage.
    4. Recommendations to improve infrastructure or marketing.

    Data:
    - Total Visitors (Last 30 Days): ${metrics.totalVisitors}
    - "Get Directions" Clicks (Intent to visit): ${metrics.totalDirections}
    - AI Assistant Queries: ${metrics.totalAiQueries}
    - Average Visitor Rating: ${metrics.avgRating}/5
    - Top 3 Destinations: ${metrics.topDestinations.slice(0, 3).map(d => d.name).join(', ')}
    - Top Category: ${topCategory}
    
    Format the output as Markdown with clear bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "AI service currently unavailable. Please check your API key configuration.";
  }
};