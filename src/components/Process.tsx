import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STEPS } from '../data/content.ts';
import { SectionIndex } from './ui/SectionIndex.tsx';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="process"
      className="w-full bg-[#F2EFE9] text-[#25231F] py-[clamp(80px,11vw,180px)] border-b border-[#B9AE9C]/40"
    >
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionIndex number="03" title="Process" tag="Atelier Methodology" />

        <div className="mb-14 lg:mb-20">
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-tight text-[#25231F]">
            From clay to <em>kiln</em>.
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7A756B] mt-3">
            Four sequential transformations — 45 days per production cycle
          </p>
        </div>

        {/* 2-Column Sticky Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Stage with Cross-Fading Photographic Specimens */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28 h-[calc(100vh-140px)] max-h-[720px] min-h-[500px] border border-[#B9AE9C]/40 bg-[#E7E2D8] overflow-hidden">
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={PROCESS_STEPS[activeStep].image.url}
                    alt={PROCESS_STEPS[activeStep].image.alt}
                    className="w-full h-full object-cover atelier-image"
                  />
                  {/* Overlay technical index badge */}
                  <div className="absolute top-4 left-4 bg-[#F2EFE9] border border-[#B9AE9C]/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#25231F]">
                    STAGE {PROCESS_STEPS[activeStep].number} —{' '}
                    {PROCESS_STEPS[activeStep].stage}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#F2EFE9] border border-[#B9AE9C]/40 p-4 font-mono text-[11px] text-[#25231F] flex items-center justify-between">
                    <span>{PROCESS_STEPS[activeStep].duration}</span>
                    <span className="text-[#B4532A]">
                      {PROCESS_STEPS[activeStep].temperature}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: 4 Scrolling Step Text Blocks */}
          <div className="lg:col-span-6 space-y-24 lg:space-y-36 lg:py-12">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-40 lg:opacity-35'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-baseline gap-4 border-b border-[#B9AE9C]/40 pb-4">
                    <span className="font-mono text-sm tracking-[0.14em] text-[#B4532A]">
                      {step.number}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#25231F]">
                      {step.title}
                    </h3>
                    <span className="font-serif text-xl text-[#7A756B]/60 ml-auto select-none">
                      {step.japaneseTitle}
                    </span>
                  </div>

                  {/* Mobile-only Image Preview */}
                  <div className="lg:hidden mt-6 mb-6 aspect-[4/3] bg-[#E7E2D8] border border-[#B9AE9C]/40 overflow-hidden">
                    <img
                      src={step.image.url}
                      alt={step.image.alt}
                      className="w-full h-full object-cover atelier-image"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#25231F] mt-6 max-w-[50ch]">
                    {step.description}
                  </p>

                  {/* Specific Technical Detail Note */}
                  <div className="mt-6 p-4 sm:p-5 bg-[#E7E2D8] border border-[#B9AE9C]/40 text-xs sm:text-[13px] text-[#3B3833] leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] block mb-1.5">
                      Technical Observation
                    </span>
                    {step.technicalNote}
                  </div>

                  {/* Spec Row */}
                  <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-[#7A756B] uppercase tracking-[0.14em]">
                    <span>Stage: {step.stage}</span>
                    <span>Peak: {step.temperature}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
