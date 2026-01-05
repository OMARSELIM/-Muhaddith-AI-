import { GoogleGenAI, Type } from "@google/genai";
import { HadithAnalysis } from "../types";

export const analyzeHadithText = async (text: string): Promise<HadithAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    أنت عالم حديث متخصص في علم الرجال والجرح والتعديل.
    مهمتك هي تحليل نص الحديث أو السند المقدم، واستخراج سلسلة الرواة، والحكم على كل راوٍ بناءً على أقوال علماء الجرح والتعديل (مثل ابن حجر في التقريب، أو الذهبي في الميزان).
    في النهاية، قدم حكمًا عامًا على صحة السند.
    
    يجب أن تكون المخرجات دقيقة علميًا قدر الإمكان.
    إذا كان الراوي مجهولًا، اذكره.
    
    For statusColor:
    - 'green' for Thiqah (ثقة) or Sahih related statuses.
    - 'yellow' for Saduq (صدوق) or Hasan related statuses.
    - 'red' for Da'if (ضعيف), Matruk (متروك), or Kathzab (كذاب).
    - 'gray' for Majhul (مجهول) or unknown.
    
    For verdictColor: same logic applied to the overall Hadith verdict.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: text,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hadithText: { type: Type.STRING, description: "The recognized text of the Hadith or Isnad" },
          overallVerdict: { type: Type.STRING, description: "The final ruling (e.g., Sahih, Hasan, Da'if)" },
          verdictColor: { type: Type.STRING, enum: ['green', 'yellow', 'red', 'gray'] },
          verdictExplanation: { type: Type.STRING, description: "A summary explaining why this verdict was reached" },
          narrators: {
            type: Type.ARRAY,
            description: "Ordered list of narrators from the source (Prophet PBUH) down to the author, or vice versa based on input.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                role: { type: Type.STRING, description: "Generation/Role e.g., Sahabi, Tabi'i, Tabaqat 5" },
                status: { type: Type.STRING, description: "Jarh wa Ta'dil status e.g., Thiqah, Da'if" },
                statusColor: { type: Type.STRING, enum: ['green', 'yellow', 'red', 'gray'] },
                deathYear: { type: Type.STRING, description: "Approximate year of death if known" },
                bio: { type: Type.STRING, description: "Brief biography or notes on their narration quality" },
                teachers: { type: Type.ARRAY, items: { type: Type.STRING } },
                students: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['id', 'name', 'status', 'statusColor', 'bio']
            }
          }
        },
        required: ['hadithText', 'overallVerdict', 'verdictColor', 'verdictExplanation', 'narrators']
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(response.text) as HadithAnalysis;
  } catch (e) {
    console.error("Failed to parse JSON", response.text);
    throw new Error("Failed to parse analysis result");
  }
};