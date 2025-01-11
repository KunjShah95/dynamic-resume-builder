import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      resumeBuilder: 'ResumeAI Builder',
      export: 'Export PDF',
      share: 'Share',
      language: 'Language',
      atsScore: 'ATS Score',
      score: 'Score',
      createPerfectResume: 'Create Your Perfect Resume',
      aiPoweredBuilder: 'AI-Powered Resume Builder for Professional Success',
      getStarted: 'Get Started',
      home: 'Home',
      templates: 'Templates',
      aiAssistant: 'AI Assistant',
      settings: 'Settings',
    },
  },
  es: {
    translation: {
      resumeBuilder: 'Constructor de CV IA',
      export: 'Exportar PDF',
      share: 'Compartir',
      language: 'Idioma',
      atsScore: 'Puntuación ATS',
      score: 'Puntuación',
      createPerfectResume: 'Crea tu CV Perfecto',
      aiPoweredBuilder: 'Constructor de CV con IA para el Éxito Profesional',
      getStarted: 'Comenzar',
      home: 'Inicio',
      templates: 'Plantillas',
      aiAssistant: 'Asistente IA',
      settings: 'Ajustes',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;