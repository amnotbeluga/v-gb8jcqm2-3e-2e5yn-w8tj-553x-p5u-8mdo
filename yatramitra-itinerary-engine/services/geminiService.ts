import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, LANGUAGES } from "../constants";
import { UserInput, ItineraryResponse } from "../types";

// Helper function to prevent creating multiple instances in dev
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing from environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateItinerary = async (input: UserInput): Promise<ItineraryResponse> => {
  const ai = getAIClient();

  // Construct a prompt that explains the specific date and budget requirements clearly
  const budgetString = input.budgetType === 'custom' 
    ? `Custom Budget between ₹${input.customBudgetMin} and ₹${input.customBudgetMax} per person`
    : `Budget Level: ${input.budgetLevel}`;

  const promptDetails = {
    ...input,
    calculatedDays: Math.ceil((new Date(input.endDate).getTime() - new Date(input.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
    budgetDescription: budgetString
  };

  const userPrompt = JSON.stringify(promptDetails);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a Jharkhand itinerary for this request: ${userPrompt}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.4, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const data: ItineraryResponse = JSON.parse(text);
    
    // Enrich with client-side metadata
    data.createdAt = Date.now();
    data.id = crypto.randomUUID();
    
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const askQuestionAboutItinerary = async (itinerary: ItineraryResponse, question: string): Promise<string> => {
  const ai = getAIClient();
  
  // Create a condensed version of the itinerary context to save tokens
  const context = JSON.stringify({
    summary: itinerary.summary_text,
    days: itinerary.itinerary.map(d => ({
      day: d.day,
      title: d.title,
      places: d.items.map(i => i.place_name)
    })),
    safety: itinerary.general_safety_notes
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Context: The user has a travel itinerary for Jharkhand: ${context}. 
      
      User Question: ${question}
      
      Answer the question specifically based on the itinerary context provided. Keep it helpful, concise (max 2-3 sentences), and friendly. If the answer isn't in the itinerary, use your general knowledge about the location but mention that it's not explicitly in the plan.`,
      config: {
        systemInstruction: "You are a helpful travel assistant for Jharkhand Tourism.",
      },
    });
    return response.text || "I couldn't generate an answer.";
  } catch (error) {
    console.error("Gemini Chat Error", error);
    throw error;
  }
};