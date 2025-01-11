import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateImprovement = async (content: string, type: string, model: 'openai' | 'gemini') => {
  try {
    if (model === 'openai') {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `You are a professional resume expert. Improve the following ${type}:`
        }, {
          role: "user",
          content
        }],
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `As a professional resume expert, improve the following ${type}: ${content}`
      );
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error('Error generating improvement:', error);
    throw error;
  }
};

export const analyzeResume = async (resume: string, model: 'openai' | 'gemini') => {
  try {
    if (model === 'openai') {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "Analyze this resume and provide ATS optimization suggestions:"
        }, {
          role: "user",
          content: resume
        }],
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Analyze this resume and provide ATS optimization suggestions: ${resume}`
      );
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};