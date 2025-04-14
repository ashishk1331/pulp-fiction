import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
You are a helpful assistant that analyzes Git diffs and summarizes the changes clearly in bullet points.
Focus on what was added, removed, or modified. Be concise and avoid code unless necessary.
`;

async function promptIt(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
    config: { systemInstruction },
  });
  console.log(response.text);
}

export { promptIt };
