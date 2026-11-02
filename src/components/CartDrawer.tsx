import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart.ts';
import { Button } from './ui/Button.tsx';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCartOpen) closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsCheckingOut(false);
      setOrderConfirmed(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `KLN-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmed(orderId);
    clearCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#25231F]/40 cursor-pointer"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="relative w-full max-w-[460px] bg-[#F2EFE9] h-full flex flex-col z-10 border-l border-[#B9AE9C]/40 text-[#25231F] shadow-none"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[#B9AE9C]/40 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B]">
                  ATELIER BAG
                </span>
                <h3 className="font-serif text-2xl text-[#25231F] mt-0.5">
                  Your Selection ({totalCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 border border-[#B9AE9C]/40 flex items-center justify-center text-[#25231F] hover:bg-[#E7E2D8] transition-colors rounded-none"
              >
                <X className="w-4 h-4 stroke-[1.25]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {orderConfirmed ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border border-[#25231F] flex items-center justify-center text-[#25231F]">
                    <Check className="w-6 h-6 stroke-[1.25] text-[#B4532A]" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B4532A]">
                    BATCH RESERVATION CONFIRMED
                  </span>
                  <h4 className="font-serif text-3xl text-[#25231F]">
                    Order #{orderConfirmed}
                  </h4>
                  <p className="text-sm text-[#7A756B] leading-relaxed max-w-sm mx-auto">
                    Your stoneware allocation is logged in Batch No. 14. Our potters
                    will inspect, hand-wrap, and dispatch your pieces in unbleached
                    cardboard with cedar shavings.
                  </p>
                  <div className="pt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOrderConfirmed(null);
                        closeCart();
                      }}
                    >
                      Return to Catalogue
                    </Button>
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B]">
                    BAG IS EMPTY
                  </span>
                  <p className="font-serif text-xl text-[#25231F] max-w-xs">
                    No ceramic specimens currently reserved.
                  </p>
                  <p className="text-xs text-[#7A756B] max-w-xs leading-relaxed">
                    Explore the Spring Batch No. 14 collection of hand-thrown stoneware
                    vessels.
                  </p>
                  <div className="pt-4">
                    <Button variant="solid" onClick={closeCart}>
                      Browse Collection
                    </Button>
                  </div>
                </div>
              ) : isCheckingOut ? (
                /* Simple Checkout Form */
                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="border-b border-[#B9AE9C]/40 pb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B]">
                      DISPATCH DESTINATION
                    </span>
                    <h4 className="font-serif text-xl text-[#25231F] mt-1">
                      Shipping Details
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        defaultValue="Isabella Vance"
                        className="w-full bg-[#E7E2D8] border border-[#B9AE9C]/60 px-3.5 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] mb-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        defaultValue="isabella@studio.co"
                        className="w-full bg-[#E7E2D8] border border-[#B9AE9C]/60 px-3.5 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] mb-1">
                        Delivery Address
                      </label>
                      <input
                        required
                        type="text"
                        defaultValue="84 Mercer Street, Suite 4B"
                        className="w-full bg-[#E7E2D8] border border-[#B9AE9C]/60 px-3.5 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] mb-1">
                          City
                        </label>
                        <input
                          required
                          type="text"
                          defaultValue="New York"
                          className="w-full bg-[#E7E2D8] border border-[#B9AE9C]/60 px-3.5 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#25231F]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B] mb-1">
                          Postal Code
                        </label>
                        <input
                          required
                          type="text"
                          defaultValue="10012"
                          className="w-full bg-[#E7E2D8] border border-[#B9AE9C]/60 px-3.5 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#25231F]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#E7E2D8] border border-[#B9AE9C]/40 text-xs text-[#7A756B] leading-relaxed">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#25231F] mb-1">
                      Batch Dispatch Note
                    </p>
                    All specimens are packed in custom die-cut unbleached cardboard.
                    Standard insured atelier delivery is complimentary on Batch 14.
                  </div>

                  <div className="pt-2 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      Back
                    </Button>
                    <Button type="submit" variant="solid" className="flex-1">
                      Complete Order (${subtotal})
                    </Button>
                  </div>
                </form>
              ) : (
                /* Item List */
                <div className="space-y-6">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 pb-6 border-b border-[#B9AE9C]/30 items-start"
                    >
                      <div className="w-20 h-24 bg-[#E7E2D8] overflow-hidden shrink-0 border border-[#B9AE9C]/40">
                        <img
                          src={product.image.url}
                          alt={product.name}
                          className="w-full h-full object-cover atelier-image"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A756B]">
                              {product.index} / {product.batchNumber}
                            </span>
                            <h4 className="font-serif text-lg text-[#25231F] leading-tight mt-0.5">
                              {product.name}
                            </h4>
                          </div>
                          <span className="font-mono text-sm tabular-nums text-[#25231F]">
                            ${product.price * quantity}
                          </span>
                        </div>

                        <p className="text-xs text-[#7A756B] mt-1 line-clamp-1">
                          {product.clayBody}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-[#B9AE9C]/60 bg-[#E7E2D8]">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#B9AE9C]/20 transition-colors"
                            >
                              <Minus className="w-3 h-3 stroke-[1.25]" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs tabular-nums text-[#25231F]">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#B9AE9C]/20 transition-colors"
                            >
                              <Plus className="w-3 h-3 stroke-[1.25]" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7A756B] hover:text-[#B4532A] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 text-[11px] text-[#7A756B] leading-relaxed">
                    Fired in small batches at 1,260°C. Dispatched in unbleached
                    cardboard with biodegradable cellulose cushions.
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && !isCheckingOut && !orderConfirmed && (
              <div className="p-6 md:p-8 border-t border-[#B9AE9C]/40 bg-[#E7E2D8]/50 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7A756B]">
                    SUBTOTAL (USD)
                  </span>
                  <span className="font-mono text-xl tabular-nums text-[#25231F]">
                    ${subtotal}
                  </span>
                </div>

                <div className="text-[11px] text-[#7A756B] flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-mono uppercase">Complimentary</span>
                </div>

                <Button
                  variant="solid"
                  className="w-full justify-between"
                  onClick={() => setIsCheckingOut(true)}
                  arrow="right"
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
