import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../data/products.ts';
import { useCart } from '../hooks/useCart.ts';
import { Button } from './ui/Button.tsx';
import { SmartImage } from './ui/SmartImage.tsx';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  // Lock scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#25231F]/50 backdrop-blur-none cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full max-w-4xl bg-[#F2EFE9] border border-[#B9AE9C] text-[#25231F] z-10 my-auto shadow-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="absolute top-4 right-4 z-20 w-10 h-10 border border-[#B9AE9C]/40 flex items-center justify-center text-[#25231F] hover:bg-[#E7E2D8] transition-colors rounded-none"
          >
            <X className="w-4 h-4 stroke-[1.25]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="bg-[#E7E2D8] p-6 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#B9AE9C]/40">
              <div className="w-full max-w-[340px]">
                <SmartImage
                  image={product.image}
                  priority={true}
                  revealOnScroll={false}
                  hoverScale={false}
                  className="border border-[#B9AE9C]/40"
                />
              </div>
            </div>

            {/* Right: Spec Sheet and Add to Cart */}
            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#B9AE9C]/40 pb-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B]">
                      {product.index} / {product.batchNumber}
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <h3 className="font-serif text-3xl lg:text-4xl text-[#25231F]">
                        {product.name}
                      </h3>
                      <span className="font-serif text-xl text-[#7A756B]/70 select-none">
                        {product.japaneseName}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xl tabular-nums text-[#25231F]">
                    ${product.price}
                  </span>
                </div>

                <p className="text-sm text-[#25231F] leading-relaxed mt-4 font-normal">
                  {product.description}
                </p>

                {/* Technical Specifications Matrix */}
                <div className="mt-6 border-t border-[#B9AE9C]/40 pt-4 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-[#B9AE9C]/20">
                    <span className="text-[#7A756B] uppercase tracking-wider">
                      Clay Body
                    </span>
                    <span className="text-[#25231F] text-right font-medium">
                      {product.clayBody}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#B9AE9C]/20">
                    <span className="text-[#7A756B] uppercase tracking-wider">
                      Firing
                    </span>
                    <span className="text-[#25231F] text-right font-medium">
                      {product.firingTemp}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#B9AE9C]/20">
                    <span className="text-[#7A756B] uppercase tracking-wider">
                      Glaze
                    </span>
                    <span className="text-[#25231F] text-right font-medium">
                      {product.glaze}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#B9AE9C]/20">
                    <span className="text-[#7A756B] uppercase tracking-wider">
                      Dimensions
                    </span>
                    <span className="text-[#25231F] text-right tabular-nums">
                      {product.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#7A756B] uppercase tracking-wider">
                      Weight
                    </span>
                    <span className="text-[#25231F] text-right tabular-nums">
                      {product.weight}
                    </span>
                  </div>
                </div>

                {/* Care Ritual */}
                <div className="mt-5 p-3.5 bg-[#E7E2D8] border border-[#B9AE9C]/40 text-xs text-[#7A756B] leading-relaxed">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#25231F] block mb-1">
                    Care & Patina
                  </span>
                  {product.care}
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="mt-8 pt-6 border-t border-[#B9AE9C]/40 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-[#25231F] bg-[#F2EFE9] px-2 py-1.5 h-11 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#E7E2D8] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[1.25]" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm tabular-nums text-[#25231F]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#E7E2D8] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[1.25]" />
                  </button>
                </div>

                <Button
                  variant="solid"
                  className="flex-1 h-11"
                  onClick={handleAddToCart}
                >
                  {justAdded ? (
                    <span className="inline-flex items-center gap-2 text-[#F2EFE9]">
                      <Check className="w-3.5 h-3.5 stroke-[1.5] text-[#B4532A]" />
                      Added to Atelier Bag
                    </span>
                  ) : (
                    `Add to Bag — $${product.price * quantity}`
                  )}
                </Button>

                {justAdded && (
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => {
                      onClose();
                      openCart();
                    }}
                  >
                    View Bag
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
