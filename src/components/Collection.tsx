import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PRODUCTS, Product } from '../data/products.ts';
import { SectionIndex } from './ui/SectionIndex.tsx';
import { SmartImage } from './ui/SmartImage.tsx';
import { useCart } from '../hooks/useCart.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { useIsMobile } from '../hooks/useIsMobile.ts';

interface CollectionProps {
  onSelectProduct: (product: Product) => void;
}

export const Collection: React.FC<CollectionProps> = ({ onSelectProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate percentage to slide across all 6 panels
  // 6 cards of 380px width with margins
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-65%']
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const idx = Math.min(6, Math.max(1, Math.floor(latest * 6.2) + 1));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((current) => (current === product.id ? null : current));
    }, 1800);
  };

  return (
    <section id="collection" className="w-full bg-[#E7E2D8] text-[#25231F] border-b border-[#B9AE9C]/40">
      {/* If desktop and not reduced-motion: Tall 280vh horizontal pinned section */}
      {!isMobile && !prefersReducedMotion ? (
        <div ref={containerRef} className="relative h-[280vh]">
          <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden px-5 sm:px-8 lg:px-12 py-10 lg:py-12 max-w-[1520px] mx-auto w-full">
            {/* Top Index and Header */}
            <div className="w-full">
              <SectionIndex
                number="02"
                title="Collection"
                tag="Batch No. 14 — Available"
                className="mb-6 lg:mb-8"
              />

              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-4xl lg:text-5xl text-[#25231F] tracking-tight">
                    Spring <em>Specimens</em>
                  </h2>
                  <p className="font-mono text-xs text-[#7A756B] mt-1 uppercase tracking-[0.14em]">
                    Fired at 1,260°C — Wheel-turned stoneware
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#7A756B]">
                  <span>
                    {String(activeIndex).padStart(2, '0')} / 06
                  </span>
                  <div className="w-24 h-px bg-[#B9AE9C]/40 overflow-hidden relative">
                    <motion.div
                      style={{
                        scaleX: scrollYProgress,
                        transformOrigin: 'left',
                      }}
                      className="absolute inset-0 bg-[#25231F]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Moving Slider Stage */}
            <div className="w-full overflow-visible py-4">
              <motion.div
                style={{ x: xTranslate }}
                className="flex items-stretch gap-8 lg:gap-10 will-change-transform"
              >
                {PRODUCTS.map((product) => {
                  const isJustAdded = addedId === product.id;

                  return (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      data-cursor="view"
                      className="w-[340px] lg:w-[380px] shrink-0 bg-[#F2EFE9] border border-[#B9AE9C]/40 p-6 flex flex-col justify-between cursor-pointer group transition-colors duration-200 hover:border-[#25231F]"
                    >
                      <div>
                        {/* Image Container */}
                        <div className="relative overflow-hidden mb-6 bg-[#E7E2D8]">
                          <SmartImage
                            image={product.image}
                            hoverScale={true}
                            revealOnScroll={false}
                            className="aspect-[4/5]"
                          />
                          <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.14em] text-[#25231F] bg-[#F2EFE9] px-2 py-0.5 border border-[#B9AE9C]/40">
                            {product.index}
                          </span>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-baseline justify-between gap-2 border-b border-[#B9AE9C]/40 pb-3">
                          <h3 className="font-serif text-2xl text-[#25231F] group-hover:text-[#B4532A] transition-colors">
                            {product.name}
                          </h3>
                          <span className="font-mono text-sm tabular-nums text-[#25231F]">
                            ${product.price}
                          </span>
                        </div>

                        <p className="text-xs text-[#7A756B] mt-3 leading-relaxed line-clamp-2">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 mt-6 border-t border-[#B9AE9C]/30 flex items-center justify-between">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#25231F] hover:text-[#B4532A] link-draw transition-colors focus-visible:outline-1"
                        >
                          {isJustAdded ? 'Added to bag ✓' : '+ Add to cart'}
                        </button>

                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B]">
                          Spec Sheet →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom helper text */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#7A756B] pt-4 border-t border-[#B9AE9C]/40">
              <span>Scroll to navigate horizontal catalogue</span>
              <span className="uppercase tracking-[0.14em]">
                Edition limited to single kiln draw
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Mobile / Tablet / Reduced Motion Grid */
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 py-[clamp(60px,8vw,120px)]">
          <SectionIndex
            number="02"
            title="Collection"
            tag="Batch No. 14 — Available"
            className="mb-8"
          />

          <div className="mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#25231F]">
              Spring <em>Specimens</em>
            </h2>
            <p className="font-mono text-xs text-[#7A756B] mt-1 uppercase tracking-[0.14em]">
              Fired at 1,260°C — Wheel-turned stoneware
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => {
              const isJustAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-[#F2EFE9] border border-[#B9AE9C]/40 p-5 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative overflow-hidden mb-5 bg-[#E7E2D8]">
                      <SmartImage
                        image={product.image}
                        hoverScale={false}
                        className="aspect-[4/5]"
                      />
                      <span className="absolute top-2.5 left-2.5 font-mono text-[10px] tracking-[0.14em] text-[#25231F] bg-[#F2EFE9] px-2 py-0.5 border border-[#B9AE9C]/40">
                        {product.index}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 border-b border-[#B9AE9C]/40 pb-2.5">
                      <h3 className="font-serif text-xl text-[#25231F]">
                        {product.name}
                      </h3>
                      <span className="font-mono text-sm tabular-nums text-[#25231F]">
                        ${product.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#7A756B] mt-2.5 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#B9AE9C]/30 flex items-center justify-between">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#25231F] hover:text-[#B4532A] transition-colors"
                    >
                      {isJustAdded ? 'Added to bag ✓' : '+ Add to cart'}
                    </button>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B]">
                      View Spec →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
