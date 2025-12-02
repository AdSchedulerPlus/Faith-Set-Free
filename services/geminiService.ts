import { GoogleGenAI, Type } from "@google/genai";
import { GiftType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDetailedGiftAnalysis = async (gift: GiftType): Promise<{
    summary: string;
    biblicalRoleModels: string[];
    potentialPitfalls: string[];
    growthPlan: string;
}> => {
    // Schema for structured output
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING, description: "A deep dive summary of what this gift looks like in maturity." },
            biblicalRoleModels: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 Biblical characters who exemplified this gift." },
            potentialPitfalls: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 common weaknesses or temptations associated with this gift." },
            growthPlan: { type: Type.STRING, description: "A specific actionable plan to develop this gift over the next week." }
        },
        required: ["summary", "biblicalRoleModels", "potentialPitfalls", "growthPlan"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the spiritual gift of ${gift}. Provide a deep dive analysis.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });

        const jsonText = response.text || "{}";
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Analysis Service Error", error);
        return {
            summary: "Analysis unavailable.",
            biblicalRoleModels: ["Unavailable"],
            potentialPitfalls: ["Unavailable"],
            growthPlan: "Please try again later."
        };
    }
}