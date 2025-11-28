
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Language, ChatMessage, Role } from "../types";

// Ensure API Key is available
if (!process.env.API_KEY) {
  console.error("API_KEY is missing from environment variables");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = async (historyMessages: ChatMessage[] = []): Promise<Chat> => {
  // Convert application messages to GenAI Content format
  const history: Content[] = historyMessages.map(msg => ({
    role: msg.role === Role.USER ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      tools: [{ googleSearch: {} }], // Enable Google Search for Weather/Grounding
    },
  });
};

export const sendMessage = async (
  chat: Chat, 
  message: string, 
  language: Language = 'English'
): Promise<string> => {
  try {
    // Append language instruction if not English to guide the model
    const effectiveMessage = language === 'English' 
      ? message 
      : `${message}\n\n(Please respond in ${language})`;

    const response = await chat.sendMessage({ message: effectiveMessage });
    
    let text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
