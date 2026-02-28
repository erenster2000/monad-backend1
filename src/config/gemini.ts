import dotenv from 'dotenv';
dotenv.config();

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY || '',
  modelName: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7, // Yaratıcılık oranı
    topP: 0.8,
    maxOutputTokens: 20, // Tek kelime istediğimiz için fazla token harcamayalım
  }
};

if (!GEMINI_CONFIG.apiKey) {
  throw new Error("CRITICAL: GEMINI_API_KEY is missing in environment variables.");
}