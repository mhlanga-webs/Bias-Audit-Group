import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// The API key is now sourced from the window object, where it's set in index.html.
const apiKey = (window as any).GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please ensure it is set in index.html");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

/**
 * Generates an ethics framework for a loan approval AI model using the Gemini API.
 */
export const generateEthicsFramework = async (): Promise<string> => {
  try {
    const prompt = `
      Generate a concise ethics framework for deploying an AI-powered loan approval model.
      The framework should address key ethical principles like fairness, accountability, and transparency.
      Focus on practical steps for a financial institution to ensure responsible AI usage.
      The output should be formatted with markdown-like headers (e.g., '### Principle Name') and bullet points starting with '* '.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI model.");
    }
    return text;
  } catch (error) {
    console.error("Error generating ethics framework:", error);
    throw new Error("Failed to communicate with the Generative AI service. Please check your API key and network connection.");
  }
};

/**
 * Generates recommendations for improving a dataset to mitigate bias in a loan approval model.
 */
export const generateDatasetImprovements = async (): Promise<string> => {
  try {
    const prompt = `
      Provide concrete recommendations for improving a dataset used to train a loan approval model to mitigate bias.
      The model currently shows disparities between demographic groups. The recommendations should cover data collection,
      feature engineering, and representation.
      The output should be formatted with markdown-like headers (e.g., '### Recommendation Area') and bullet points starting with '* '.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
     if (!text) {
      throw new Error("Received an empty response from the AI model.");
    }
    return text;
  } catch (error) {
    console.error("Error generating dataset improvements:", error);
    throw new Error("Failed to communicate with the Generative AI service. Please check your API key and network connection.");
  }
};