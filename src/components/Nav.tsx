import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart.ts';
import { useSmoothScroll } from '../providers/SmoothScroll.tsx';

interface NavProps {
  onOpenCart?: () => void;
}

export const Nav: React.FC<NavProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openCart, lastAddedName } = useCart();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Process', href: '#process' },
    { label: 'Studio', href: '#studio' },
    { label: 'Journal', href: '#journal' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      scrollTo(target as HTMLElement, { offset: -40 });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F2EFE9] border-b border-[#B9AE9C]/40 py-3.5 shadow-none'
            : 'bg-transparent border-b border-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark (Left) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl lg:text-3xl tracking-[0.18em] text-[#25231F] hover:text-[#B4532A] transition-colors select-none"
          >
            KILN
          </a>

          {/* Desktop Nav Links (Center / Right) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] uppercase tracking-[0.14em] font-mono text-[#7A756B]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-[#25231F] transition-colors link-draw"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Far Right: Working Cart Count + Mobile Hamburger */}
          <div className="flex items-center gap-6">
            <button
              onClick={openCart}
              aria-label={`Shopping Cart with ${totalCount} items`}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#25231F] hover:text-[#B4532A] transition-colors relative py-1 focus-visible:outline-1"
            >
              <span>Cart ({totalCount})</span>
              {lastAddedName && (
                <span className="absolute -bottom-5 right-0 whitespace-nowrap text-[9px] font-mono tracking-widest text-[#B4532A] uppercase pointer-events-none">
                  + Added
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden text-[#25231F] p-1 focus-visible:outline-1"
            >
              <Menu className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Charcoal Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[110] bg-[#25231F] text-[#F2EFE9] flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-[#F2EFE9]/15 pb-6">
              <span className="font-serif text-2xl tracking-[0.18em] text-[#F2EFE9]">
                KILN
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-10 h-10 border border-[#F2EFE9]/20 flex items-center justify-center text-[#F2EFE9] hover:bg-[#F2EFE9]/10 transition-colors"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Staggered Serif Links */}
            <nav className="flex flex-col space-y-6 my-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + idx * 0.07,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="font-serif text-4xl sm:text-5xl text-[#F2EFE9] hover:text-[#B4532A] transition-colors block"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Info */}
            <div className="border-t border-[#F2EFE9]/15 pt-6 text-xs font-mono text-[#F2EFE9]/60 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="uppercase tracking-[0.14em] text-[#F2EFE9]">
                  Studio Kyoto & Lisbon
                </p>
                <p className="mt-1">Hand-thrown stoneware at 1,260°C</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="font-mono text-xs uppercase tracking-[0.14em] text-[#B4532A] text-left underline"
              >
                View Atelier Bag ({totalCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
