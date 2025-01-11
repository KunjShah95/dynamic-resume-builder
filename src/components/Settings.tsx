import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../store/useResumeStore';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, language, aiModel, setTheme, setLanguage, setAIModel } = useResumeStore();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8">
        {/* Theme Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            {t('appearance')}
          </h3>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg ${
                theme === 'light'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {t('light')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {t('dark')}
            </motion.button>
          </div>
        </div>

        {/* Language Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {t('language')}
          </h3>
          <div className="flex gap-4">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 py-2 rounded-lg ${
                  language === lang.code
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {lang.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Model Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {t('aiModel')}
          </h3>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAIModel('openai')}
              className={`px-4 py-2 rounded-lg ${
                aiModel === 'openai'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              OpenAI
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAIModel('gemini')}
              className={`px-4 py-2 rounded-lg ${
                aiModel === 'gemini'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              Gemini
            </motion.button>
          </div>
        </div>

        {/* API Keys */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('apiKeys')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gemini API Key</label>
              <input
                type="password"
                placeholder="AI..."
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};