import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, Feedback } from "../types";

// NOTE: In a real production app, this key should be proxied through a backend.
// For this frontend-only demo, we use the env variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    detectedLanguage: { type: Type.STRING, description: "Language code e.g., 'en', 'hi'" },
    sentimentLabel: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL", "MIXED"] },
    sentimentScore: { type: Type.NUMBER, description: "Float between 0 and 1" },
    ratingInferred: { type: Type.NUMBER, description: "Inferred rating 1-5" },
    categories: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Tags like 'Cleanliness', 'Staff', 'Price', 'Safety'"
    },
    safetyFlags: {
      type: Type.OBJECT,
      properties: {
        isSafetyIssue: { type: Type.BOOLEAN },
        isUrgent: { type: Type.BOOLEAN },
        notes: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["isSafetyIssue", "isUrgent", "notes"]
    },
    improvementSuggestionsSystem: { type: Type.ARRAY, items: { type: Type.STRING } },
    improvementSuggestionsVendor: { type: Type.ARRAY, items: { type: Type.STRING } },
    summaryForDashboard: { type: Type.STRING, description: "Brief summary under 15 words" },
    shouldRaiseAlert: { type: Type.BOOLEAN },
    alertReason: { type: Type.STRING }
  },
  required: [
    "detectedLanguage", 
    "sentimentLabel", 
    "sentimentScore", 
    "categories", 
    "safetyFlags", 
    "summaryForDashboard", 
    "shouldRaiseAlert"
  ]
};

export const analyzeFeedbackWithGemini = async (feedback: Feedback): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Analyze the following tourism feedback for the 'YatraMitra' platform.
      
      Target Name: ${feedback.targetName}
      Target Type: ${feedback.targetType}
      User Rating: ${feedback.rating || 'Not provided'}
      Comment: "${feedback.comment}"

      Provide a detailed sentiment analysis, safety check, and actionable suggestions.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an AI analyst for a tourism platform. Your job is to extract sentiment, safety risks, and business intelligence from user feedback.",
        temperature: 0.1, // Low temperature for consistent analysis
      }
    });

    const rawText = response.text;
    if (!rawText) throw new Error("No response from Gemini");

    const result = JSON.parse(rawText);
    
    // Enrich with timestamp
    return {
      ...result,
      analyzedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};