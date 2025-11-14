
import { GoogleGenAI } from "@google/genai";
import { GeminiModel, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. Please set your API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY_HERE' });

interface GeminiResponse {
    text: string;
    groundingChunks?: GroundingChunk[];
}

export const askGemini = async (prompt: string, model: GeminiModel): Promise<GeminiResponse> => {
    try {
        let config: any = {};
        let tools: any[] = [];
        let effectiveModel: string = model;

        switch (model) {
            case GeminiModel.PRO_THINKING:
                effectiveModel = 'gemini-2.5-pro';
                config = { thinkingConfig: { thinkingBudget: 32768 } };
                break;
            case GeminiModel.FLASH_SEARCH:
                 effectiveModel = 'gemini-2.5-flash';
                tools = [{ googleSearch: {} }];
                break;
            case GeminiModel.FLASH_LITE:
                effectiveModel = 'gemini-2.5-flash-lite';
                break;
        }

        const response = await ai.models.generateContent({
            model: effectiveModel,
            contents: prompt,
            ...(Object.keys(config).length > 0 && { config }),
            ...(tools.length > 0 && { config: { ...config, tools } }),
        });
        
        const text = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

        let groundingChunks: GroundingChunk[] = [];
        if (groundingMetadata?.groundingChunks) {
             groundingChunks = groundingMetadata.groundingChunks.filter(chunk => chunk.web).map(chunk => ({
                web: {
                    uri: chunk.web.uri,
                    title: chunk.web.title || chunk.web.uri,
                }
            }));
        }

        return { text, groundingChunks };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return { text: `An error occurred: ${error.message}` };
        }
        return { text: "An unknown error occurred while contacting the AI assistant." };
    }
};
