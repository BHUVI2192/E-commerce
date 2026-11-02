import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

export const Cursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorType, setCursorType] = useState<'default' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, precise non-bouncy spring
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch-only screen
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isCoarse);
    if (isCoarse || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  const isView = cursorType === 'view';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          width: isView ? 56 : 8,
          height: isView ? 56 : 8,
          backgroundColor: isView ? '#F2EFE9' : '#25231F',
          borderWidth: isView ? 1 : 0,
          borderColor: '#25231F',
        }}
        transition={{
          duration: 0.22,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="rounded-full flex items-center justify-center overflow-hidden"
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#25231F] select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
