import React from 'react';
import { motion } from 'motion/react';
import { ATELIER_IMAGES } from '../data/images.ts';
import { Button } from './ui/Button.tsx';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { useSmoothScroll } from '../providers/SmoothScroll.tsx';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  const handleShopClick = () => {
    const el = document.querySelector('#collection');
    if (el) scrollTo(el as HTMLElement, { offset: -40 });
  };

  const handleStudioClick = () => {
    const el = document.querySelector('#studio');
    if (el) scrollTo(el as HTMLElement, { offset: -40 });
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#F2EFE9] border-b border-[#B9AE9C]/40 flex flex-col justify-between pt-20 lg:pt-0">
      <div className="max-w-[1520px] mx-auto w-full px-5 sm:px-8 lg:px-12 flex-1 flex flex-col lg:grid lg:grid-cols-12 items-stretch">
        {/* Left Column (5 cols on lg): Editorial Typography & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between py-12 lg:py-24 lg:pr-12 xl:pr-16 z-10">
          {/* Top Mono Label */}
          <div>
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7A756B] flex items-center gap-2 mb-6 lg:mb-12"
            >
              <span className="w-1.5 h-1.5 bg-[#B4532A]" />
              <span>Studio — Kyoto & Lisbon</span>
            </motion.div>

            {/* Display Headline: "Made slowly.\nMeant to last." */}
            <div className="overflow-hidden">
              <motion.h1
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }
                }
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.2,
                }}
                className="font-serif text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.93] tracking-[-0.025em] text-[#25231F] text-balance"
              >
                Made <em>slowly</em>.
                <br />
                Meant to last.
              </motion.h1>
            </div>

            {/* Descriptive Body Copy */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.4,
              }}
              className="text-[#25231F] text-[15px] lg:text-[16px] leading-[1.65] max-w-[48ch] mt-6 lg:mt-8 font-normal"
            >
              Hand-thrown stoneware, fired at 1,260°C in small batches. Each piece
              carries the mark of the hand that made it.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.55,
              }}
              className="flex flex-wrap items-center gap-6 mt-8 lg:mt-12"
            >
              <Button
                variant="solid"
                theme="light"
                onClick={handleShopClick}
                arrow="right"
              >
                Shop the collection
              </Button>
              <Button
                variant="text"
                theme="light"
                onClick={handleStudioClick}
              >
                Visit the studio
              </Button>
            </motion.div>
          </div>

          {/* Bottom-left Mono Batch Specifier */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-10 lg:pt-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] flex items-center justify-between border-t lg:border-t-0 border-[#B9AE9C]/40"
          >
            <span>Spring Batch No. 14 — 36 pieces</span>
            <span className="hidden sm:inline text-[#25231F]">01 / 06</span>
          </motion.div>
        </div>

        {/* Right Column (7 cols on lg): Full-Height Ceramic Still Life */}
        <div className="lg:col-span-7 relative h-[50vh] sm:h-[60vh] lg:h-full lg:min-h-[100svh] border-t lg:border-t-0 lg:border-l border-[#B9AE9C]/40 overflow-hidden bg-[#E7E2D8]">
          <motion.div
            className="w-full h-full relative"
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src={ATELIER_IMAGES.hero.url}
              alt={ATELIER_IMAGES.hero.alt}
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover atelier-image"
            />
          </motion.div>

          {/* Architectural hairline framing detail */}
          <div className="absolute bottom-4 right-4 bg-[#F2EFE9] border border-[#B9AE9C]/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#25231F] hidden sm:block">
            FIG. 00 — KYOTO ATELIER SERIES
          </div>
        </div>
      </div>
    </section>
  );
};
