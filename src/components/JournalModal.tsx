import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft } from 'lucide-react';
import { JournalArticle } from '../data/content.ts';
import { SmartImage } from './ui/SmartImage.tsx';

interface JournalModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  article,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && article) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#25231F]/50 cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full max-w-3xl bg-[#F2EFE9] border border-[#B9AE9C] text-[#25231F] z-10 max-h-[90vh] flex flex-col shadow-none"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-[#B9AE9C]/40 flex items-center justify-between shrink-0">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] hover:text-[#25231F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.25]" />
              <span>Back to Journal</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close article"
              className="w-9 h-9 border border-[#B9AE9C]/40 flex items-center justify-center text-[#25231F] hover:bg-[#E7E2D8] transition-colors"
            >
              <X className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>

          {/* Scrollable Article Content */}
          <div className="overflow-y-auto p-6 md:p-10 lg:p-14 space-y-8">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] mb-3">
                <span>{article.date}</span>
                <span>/</span>
                <span>{article.readingTime}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#25231F] leading-[1.05] tracking-tight">
                {article.title}
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#B4532A] mt-4">
                By {article.author}
              </p>
            </div>

            <div className="border-t border-b border-[#B9AE9C]/40 py-6 my-6">
              <p className="font-serif italic text-lg md:text-xl text-[#3B3833] leading-relaxed">
                "{article.excerpt}"
              </p>
            </div>

            <div className="w-full">
              <SmartImage
                image={article.image}
                priority={true}
                revealOnScroll={false}
                className="border border-[#B9AE9C]/40"
              />
            </div>

            <div className="space-y-5 text-[15px] md:text-base leading-[1.7] text-[#25231F] max-w-[62ch]">
              {article.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="p-6 bg-[#E7E2D8] border border-[#B9AE9C]/40 mt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] block mb-1">
                Atelier Principle
              </span>
              <p className="font-serif text-lg text-[#25231F]">
                {article.takeaway}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
