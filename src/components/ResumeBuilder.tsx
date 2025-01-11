import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useResumeStore } from '../store/useResumeStore';
import { Download, Share2, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePDF } from 'react-to-pdf';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { AIAssistant } from './AIAssistant';
import { TemplateShowcase } from './TemplateShowcase';
import { Navbar } from './Navbar';

export const ResumeBuilder = () => {
  const { t } = useTranslation();
  const { sections, atsScore, setSections, activeSection } = useResumeStore();
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over.id);
      const newSections = [...sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);
      setSections(newSections);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            {/* Hero Section with 3D Animation */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center"
              >
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t('createPerfectResume')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  {t('aiPoweredBuilder')}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold shadow-lg"
                >
                  {t('getStarted')}
                </motion.button>
              </motion.div>
            </div>
            <TemplateShowcase />
          </>
        );
      case 'templates':
        return <TemplateShowcase />;
      case 'aiAssistant':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">{t('aiAssistant')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI Features */}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">{t('settings')}</h2>
            {/* Settings Content */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">
        {renderSection()}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-8"
            >
              <div ref={targetRef} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                    {/* Render sortable sections here */}
                  </SortableContext>
                </DndContext>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-4"
            >
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('atsScore')}
                </h2>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                        {t('score')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {atsScore}%
                      </span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${atsScore}%` }}
                    className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200"
                  >
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};