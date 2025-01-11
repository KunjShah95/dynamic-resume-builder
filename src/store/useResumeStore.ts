import { create } from 'zustand';
import { ResumeSection } from '../types/resume';

interface ResumeStore {
  sections: ResumeSection[];
  atsScore: number;
  activeSection: string;
  aiModel: 'openai' | 'gemini';
  language: string;
  theme: 'light' | 'dark';
  setSections: (sections: ResumeSection[]) => void;
  updateSection: (id: string, content: any) => void;
  calculateATSScore: () => void;
  setActiveSection: (section: string) => void;
  setAIModel: (model: 'openai' | 'gemini') => void;
  setLanguage: (lang: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  sections: [],
  atsScore: 0,
  activeSection: 'home',
  aiModel: 'openai',
  language: 'en',
  theme: 'light',
  setSections: (sections) => set({ sections }),
  updateSection: (id, content) => {
    const sections = get().sections.map((section) =>
      section.id === id ? { ...section, content } : section
    );
    set({ sections });
  },
  calculateATSScore: () => {
    const sections = get().sections;
    let score = 0;
    
    sections.forEach((section) => {
      switch (section.type) {
        case 'personal':
          if (section.content.summary?.length > 50) score += 10;
          break;
        case 'experience':
          score += 20;
          break;
        case 'skills':
          score += 15;
          break;
      }
    });
    
    set({ atsScore: Math.min(100, score) });
  },
  setActiveSection: (section) => set({ activeSection: section }),
  setAIModel: (model) => set({ aiModel: model }),
  setLanguage: (lang) => set({ language: lang }),
  setTheme: (theme) => set({ theme: theme }),
}));