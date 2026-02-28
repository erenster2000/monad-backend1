import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getTopicFromTweets = async (posts: string[]): Promise<any> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `
    Analyze the following tweets and account description to identify the single most dominant theme or interest.
    Return five English words that represent this theme. No punctuation, no sentences.
    Tweets: ${posts.join(" ")}
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;

  if (!response) {
    throw new Error("Gemini API'den geçerli bir yanıt alınamadı.");
  }

  const text = response.text();

  if (!text) {
    throw new Error("Gemini metin içeriği boş döndü.");
  }
  const firstWord = text.trim().split(" ")[0];
  if (!firstWord) {
    throw new Error("No valid word extracted from response.");
  }
  return { firstWord: firstWord.replace(/[^a-zA-Z]/g, "") , fullResponse: text };
};