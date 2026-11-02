import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ATELIER_IMAGES } from '../data/images.ts';
import { SectionIndex } from './ui/SectionIndex.tsx';
import { SmartImage } from './ui/SmartImage.tsx';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

const MANIFESTO_TEXT =
  'We make fewer things, and we make them properly. Every bowl, vase, and cup begins as a lump of local clay and ends as something you will use for decades.';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  // Parallax for the beside image (subtle, max 8%)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const words = MANIFESTO_TEXT.split(' ');

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="w-full bg-[#F2EFE9] text-[#25231F] py-[clamp(80px,11vw,180px)] border-b border-[#B9AE9C]/40"
    >
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Index Header */}
        <SectionIndex number="01" title="Manifesto" tag="Principle" />

        {/* Editorial Text + Parallax Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Large Paragraph with Progressive Scroll Word Opacity */}
          <div className="lg:col-span-8 xl:col-span-8">
            <h2 className="font-serif text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-[#25231F]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;

                return (
                  <WordSpan
                    key={i}
                    word={word}
                    range={[start, end]}
                    progress={scrollYProgress}
                    reducedMotion={prefersReducedMotion}
                  />
                );
              })}
            </h2>

            <div className="mt-8 lg:mt-12 text-[#7A756B] text-[15px] leading-relaxed max-w-[56ch]">
              We reject scheduled obsolescence. Every vessel we fire is intended to
              outlive its maker, taking on tea stains, olive oil, and the natural
              softening that comes with daily domestic utility.
            </div>
          </div>

          {/* Beside: One small image with subtle parallax */}
          <div className="lg:col-span-4 xl:col-span-4">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: imageY }}
              className="w-full max-w-sm ml-auto"
            >
              <SmartImage
                image={ATELIER_IMAGES.manifesto}
                className="border border-[#B9AE9C]/40"
                hoverScale={true}
              />
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#7A756B]">
                <span>FIG. 01 — ARCHITECTURAL VESSEL</span>
                <span>STONEWARE</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Beneath: Three Plain Facts Separated by Hairlines. No Icons. */}
        <div className="mt-20 lg:mt-28 border-t border-b border-[#B9AE9C]/40 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#B9AE9C]/40">
          <div className="py-8 md:py-10 md:pr-8">
            <div className="font-serif text-4xl lg:text-5xl text-[#25231F] leading-none">
              4 potters
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] mt-3">
              Apprenticed in Mashiko & Kyoto
            </div>
          </div>

          <div className="py-8 md:py-10 md:px-8">
            <div className="font-serif text-4xl lg:text-5xl text-[#25231F] leading-none">
              1,260°C firing
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] mt-3">
              Dense vitrification cone 10
            </div>
          </div>

          <div className="py-8 md:py-10 md:pl-8">
            <div className="font-serif text-4xl lg:text-5xl text-[#25231F] leading-none">
              Est. 2016
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B] mt-3">
              Independent workshop Kyoto & Lisbon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface WordSpanProps {
  word: string;
  range: [number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  reducedMotion: boolean;
}

const WordSpan: React.FC<WordSpanProps> = ({
  word,
  range,
  progress,
  reducedMotion,
}) => {
  const opacity = useTransform(progress, range, [0.18, 1]);

  if (reducedMotion) {
    return <span className="mr-[0.28em] inline-block">{word}</span>;
  }

  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
};
