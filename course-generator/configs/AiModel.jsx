import { GoogleGenAI } from '@google/genai'

export const GenerateCourseLayout_AI = {
  async sendMessage(prompt) {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    })
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      config: { responseMimeType: 'application/json' },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    })
    let result = ''
    for await (const chunk of response) {
      result += chunk.text || ''
    }
    return result
  },
}
