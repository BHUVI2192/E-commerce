import { useState } from 'react';
import { CartProvider } from './providers/CartProvider.tsx';
import { SmoothScrollProvider } from './providers/SmoothScroll.tsx';
import { Nav } from './components/Nav.tsx';
import { Hero } from './components/Hero.tsx';
import { Manifesto } from './components/Manifesto.tsx';
import { Collection } from './components/Collection.tsx';
import { Process } from './components/Process.tsx';
import { Studio } from './components/Studio.tsx';
import { Journal } from './components/Journal.tsx';
import { Footer } from './components/Footer.tsx';
import { Cursor } from './components/Cursor.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';
import { JournalModal } from './components/JournalModal.tsx';
import { Product } from './data/products.ts';
import { JournalArticle } from './data/content.ts';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <CartProvider>
      <SmoothScrollProvider>
        {/* Desktop-only custom cursor */}
        <Cursor />

        <div className="relative min-h-screen bg-[#F2EFE9] text-[#25231F] font-sans selection:bg-[#B4532A]/20 selection:text-[#25231F]">
          {/* Main Navigation */}
          <Nav />

          {/* Page Sections */}
          <main>
            <Hero />
            <Manifesto />
            <Collection onSelectProduct={(p) => setSelectedProduct(p)} />
            <Process />
            <Studio />
            <Journal onSelectArticle={(a) => setSelectedArticle(a)} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Modals & Drawers */}
          <CartDrawer />
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
          <JournalModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        </div>
      </SmoothScrollProvider>
    </CartProvider>
  );
}
