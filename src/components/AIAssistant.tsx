import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send, X, Loader, Bot } from 'lucide-react';
import { generateImprovement, analyzeResume } from '../services/ai';
import { useResumeStore } from '../store/useResumeStore';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { aiModel } = useResumeStore();

  const suggestions = [
    'Improve my resume summary',
    'Suggest skills for my role',
    'Make my experience more impactful',
    'Optimize for ATS',
    'Generate cover letter',
    'Analyze resume keywords',
    'Improve job descriptions',
    'Suggest action verbs'
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      setMessages((prev: Array<{role: 'user' | 'assistant', content: string}>) => [...prev, { role: 'user', content: message }]);
      
      let response;
      if (message.toLowerCase().includes('improve')) {
        response = await generateImprovement(message, 'improvement', aiModel);
      } else {
        response = await analyzeResume(message, aiModel);
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response || 'No suggestions available.' 
      }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure your API key is set correctly.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="fixed bottom-4 right-4 z-50"
    >
      {/* AI Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-16 right-0 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl"
        >
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                AI Assistant
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <Bot className="h-4 w-4" />
                <span>{aiModel === 'openai' ? 'OpenAI' : 'Gemini'}</span>
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            {/* Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setMessage(suggestion)}
                    className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {messages.map((msg: {role: 'user' | 'assistant', content: string}, index: number) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-indigo-100 dark:bg-indigo-900 ml-8'
                      : 'bg-gray-100 dark:bg-gray-800 mr-8'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <Loader className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask AI for help..."
                className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};