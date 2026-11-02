import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../data/content.ts';
import { SectionIndex } from './ui/SectionIndex.tsx';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { useIsMobile } from '../hooks/useIsMobile.ts';

interface JournalProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export const Journal: React.FC<JournalProps> = ({ onSelectArticle }) => {
  const [hoveredArticle, setHoveredArticle] = useState<JournalArticle | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 24);
      mouseY.set(e.clientY - 120);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY, prefersReducedMotion]);

  return (
    <section
      id="journal"
      className="relative w-full bg-[#F2EFE9] text-[#25231F] py-[clamp(80px,11vw,180px)] border-b border-[#B9AE9C]/40"
    >
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionIndex number="05" title="Journal" tag="Atelier Essays" />

        <div className="mb-14 lg:mb-20">
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-tight text-[#25231F]">
            Notes on craft & <em>material</em>.
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7A756B] mt-3">
            Essays on mineral chemistry, combustion, and daily use
          </p>
        </div>

        {/* Three Editorial Entries as an Uneven List, NOT Cards */}
        <div className="border-t border-[#B9AE9C]/40 divide-y divide-[#B9AE9C]/40">
          {JOURNAL_ARTICLES.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              onMouseEnter={() => {
                if (!isMobile) setHoveredArticle(article);
              }}
              onMouseLeave={() => {
                if (!isMobile) setHoveredArticle(null);
              }}
              className="py-10 lg:py-14 cursor-pointer group transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-baseline">
                {/* Date & Reading time (Mono) */}
                <div className="lg:col-span-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] flex items-center gap-3">
                  <span>0{idx + 1}</span>
                  <span>/</span>
                  <span>{article.date}</span>
                </div>

                {/* Title (Serif) */}
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#25231F] group-hover:text-[#B4532A] transition-colors duration-200">
                    {article.title}
                  </h3>
                </div>

                {/* Excerpt & Thin Arrow */}
                <div className="lg:col-span-4 flex items-start justify-between gap-6">
                  <p className="text-sm text-[#7A756B] leading-relaxed max-w-[42ch]">
                    {article.excerpt}
                  </p>
                  <div className="w-9 h-9 shrink-0 border border-[#B9AE9C]/40 flex items-center justify-center text-[#25231F] group-hover:border-[#25231F] group-hover:bg-[#25231F] group-hover:text-[#F2EFE9] transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 stroke-[1.25] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Preview Image Following Cursor on Desktop */}
      <AnimatePresence>
        {!isMobile && !prefersReducedMotion && hoveredArticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="fixed top-0 left-0 w-64 aspect-[4/5] bg-[#E7E2D8] border border-[#25231F] overflow-hidden pointer-events-none z-50 shadow-none"
          >
            <img
              src={hoveredArticle.image.url}
              alt={hoveredArticle.title}
              className="w-full h-full object-cover atelier-image"
            />
            <div className="absolute bottom-2 left-2 bg-[#F2EFE9] border border-[#B9AE9C]/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#25231F]">
              {hoveredArticle.readingTime}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
