import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ATELIER_IMAGES } from '../data/images.ts';
import { STUDIO_INFO } from '../data/content.ts';
import { SectionIndex } from './ui/SectionIndex.tsx';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

export const Studio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: textProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start 0.8', 'center center'],
  });

  // Scale 1 to 1.1
  const imageScale = useTransform(imageProgress, [0, 1], [1, 1.1]);

  const quoteWords = STUDIO_INFO.quote.split(' ');

  return (
    <section
      id="studio"
      ref={containerRef}
      className="w-full bg-[#25231F] text-[#F2EFE9] py-[clamp(80px,11vw,180px)] border-b border-[#F2EFE9]/15"
    >
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionIndex
          number="04"
          title="Studio"
          tag="Kyoto & Lisbon Spaces"
          dark={true}
        />

        {/* Full-width Image of Studio Interior with Scroll-Linked Scale 1 to 1.1 */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] border border-[#F2EFE9]/15 overflow-hidden bg-[#3B3833] flex items-center justify-center"
        >
          <motion.div
            style={prefersReducedMotion ? undefined : { scale: imageScale }}
            className="w-full h-full relative"
          >
            <img
              src={ATELIER_IMAGES.studioWide.url}
              alt={ATELIER_IMAGES.studioWide.alt}
              className="w-full h-full object-cover atelier-image brightness-[0.78] contrast-[1.08]"
            />
          </motion.div>

          {/* Overlay in Paper-Colored Serif with Words Fading in by Scroll Progress */}
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-[#25231F]/35">
            <h3 className="font-serif text-[clamp(1.75rem,4.5vw,4.25rem)] text-[#F2EFE9] leading-[1.1] max-w-3xl text-balance">
              {quoteWords.map((word, i) => {
                const isAfternoon = word.toLowerCase().includes('afternoon');
                const start = i / quoteWords.length;
                const end = start + 1 / quoteWords.length;

                return (
                  <StudioWordSpan
                    key={i}
                    word={word}
                    isItalic={isAfternoon}
                    range={[start, end]}
                    progress={textProgress}
                    reducedMotion={prefersReducedMotion}
                  />
                );
              })}
            </h3>
          </div>
        </div>

        {/* Two-Column Layout Below Image */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Short Studio Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              ATELIER PHILOSOPHY
            </span>
            <p className="font-serif text-2xl lg:text-3xl text-[#F2EFE9] leading-[1.25]">
              Vessels conceived through touch, fire, and quiet patience.
            </p>
            <p className="text-[15px] text-[#E7E2D8]/80 leading-relaxed max-w-[46ch] font-normal">
              {STUDIO_INFO.subtext}
            </p>

            <div className="pt-4 border-t border-[#F2EFE9]/15">
              <span className="font-mono text-xs text-[#B4532A] uppercase tracking-[0.14em]">
                Kiln Calendar: Autumn Anagama Firing Nov 18–21
              </span>
            </div>
          </div>

          {/* Right Column: Opening Hours & Locations in Mono */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t lg:border-t-0 border-[#F2EFE9]/15 pt-8 lg:pt-0">
            {STUDIO_INFO.locations.map((loc) => (
              <div
                key={loc.city}
                className="p-6 bg-[#3B3833]/40 border border-[#F2EFE9]/15 space-y-4 font-mono text-xs"
              >
                <div>
                  <span className="text-[10px] text-[#B4532A] uppercase tracking-[0.14em] block">
                    Permanent Location
                  </span>
                  <h4 className="font-serif text-2xl text-[#F2EFE9] mt-1 normal-case font-normal">
                    {loc.city}
                  </h4>
                  <p className="text-[#B9AE9C] text-[11px] mt-0.5 uppercase tracking-wider">
                    {loc.neighborhood}
                  </p>
                </div>

                <div className="space-y-1 text-[#E7E2D8] border-t border-[#F2EFE9]/10 pt-3">
                  <p>{loc.address}</p>
                  <p className="text-[#B9AE9C]">{loc.postal}</p>
                </div>

                <div className="border-t border-[#F2EFE9]/10 pt-3">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#B9AE9C] block mb-1">
                    Atelier Hours
                  </span>
                  <p className="text-[#F2EFE9] font-medium">{loc.hours}</p>
                </div>

                <div className="border-t border-[#F2EFE9]/10 pt-3 flex flex-col gap-1 text-[11px] text-[#B9AE9C]">
                  <span>{loc.phone}</span>
                  <span className="text-[#E7E2D8] underline">{loc.email}</span>
                </div>

                <div className="pt-2 text-[10px] text-[#B9AE9C]/80 leading-normal border-t border-[#F2EFE9]/10">
                  {loc.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StudioWordSpanProps {
  word: string;
  isItalic: boolean;
  range: [number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  reducedMotion: boolean;
}

const StudioWordSpan: React.FC<StudioWordSpanProps> = ({
  word,
  isItalic,
  range,
  progress,
  reducedMotion,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  if (reducedMotion) {
    return (
      <span className="mr-[0.3em] inline-block">
        {isItalic ? <em>{word}</em> : word}
      </span>
    );
  }

  return (
    <span className="mr-[0.3em] inline-block">
      <motion.span style={{ opacity }}>
        {isItalic ? <em>{word}</em> : word}
      </motion.span>
    </span>
  );
};
