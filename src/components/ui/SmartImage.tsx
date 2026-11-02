import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AtelierImage } from '../../data/images.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface SmartImageProps {
  image: AtelierImage;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  revealOnScroll?: boolean;
  hoverScale?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  customAspect?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  image,
  className = '',
  imgClassName = '',
  priority = false,
  revealOnScroll = true,
  hoverScale = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  customAspect,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(image.url);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  const handleImageError = () => {
    if (currentSrc === image.url && image.fallbackUrl && image.fallbackUrl !== image.url) {
      setCurrentSrc(image.fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  const aspectClass = customAspect
    ? customAspect
    : image.aspectRatio === '4:5'
    ? 'aspect-[4/5]'
    : image.aspectRatio === '3:4'
    ? 'aspect-[3/4]'
    : image.aspectRatio === '1:1'
    ? 'aspect-square'
    : image.aspectRatio === '16:9'
    ? 'aspect-[16/9]'
    : 'aspect-[16/10]';

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden w-full ${aspectClass} select-none ${className}`}
      style={{ backgroundColor: image.placeholderColor }}
    >
      {!hasError ? (
        <motion.div
          className="w-full h-full"
          initial={
            prefersReducedMotion || !revealOnScroll
              ? { opacity: 0 }
              : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }
          }
          whileInView={
            prefersReducedMotion || !revealOnScroll
              ? { opacity: 1 }
              : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
          }
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.95,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <motion.img
            src={currentSrc}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            whileHover={
              hoverScale && !prefersReducedMotion
                ? { scale: 1.03 }
                : undefined
            }
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className={`w-full h-full object-cover atelier-image transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </motion.div>
      ) : (
        /* Resilient Zero-Broken-Image fallback container */
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ backgroundColor: image.placeholderColor }}
        >
          <div className="w-12 h-12 mb-3 border border-[#7A756B]/30 flex items-center justify-center text-[#7A756B]">
            <svg
              className="w-6 h-6 stroke-[1.25]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 9c0 5 3 9 7 9s7-4 7-9V6H5v3z" />
              <path d="M12 18v3" />
              <path d="M8 21h8" />
            </svg>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7A756B]">
            KILN — ARCHIVE SPECIMEN
          </span>
          <span className="font-serif italic text-sm text-[#25231F] mt-1 max-w-[200px]">
            {image.alt}
          </span>
        </div>
      )}
    </div>
  );
};
