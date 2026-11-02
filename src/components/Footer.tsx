import React, { useState } from 'react';
import { useSmoothScroll } from '../providers/SmoothScroll.tsx';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { scrollTo } = useSmoothScroll();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid atelier dispatch email.');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  const handleNavClick = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) scrollTo(el as HTMLElement, { offset: -40 });
  };

  return (
    <footer className="w-full bg-[#25231F] text-[#F2EFE9] pt-20 lg:pt-32 pb-12 select-none">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Section: Newsletter & Editorial dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:pb-24 border-b border-[#F2EFE9]/15">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              DISPATCH NOTICES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] max-w-md">
              Receive private notices when each kiln draw is unsealed.
            </h3>
            <p className="text-sm text-[#E7E2D8]/70 leading-relaxed max-w-[45ch]">
              We fire four times per year. Subscribers receive 24-hour advance
              access to single-specimen vessels before public release.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <form onSubmit={handleSubscribe} className="w-full max-w-lg">
              <div className="flex items-end gap-4 border-b border-[#F2EFE9]/30 pb-2 focus-within:border-[#F2EFE9] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address for dispatch notices"
                  className="w-full bg-transparent text-sm sm:text-base text-[#F2EFE9] placeholder-[#E7E2D8]/40 focus:outline-none py-1"
                />
                <button
                  type="submit"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2EFE9] hover:text-[#B4532A] whitespace-nowrap transition-colors link-draw pb-1 focus-visible:outline-1"
                >
                  Subscribe
                </button>
              </div>

              {status === 'error' && (
                <p className="font-mono text-[11px] text-[#B4532A] mt-2">
                  {errorMessage}
                </p>
              )}
              {status === 'success' && (
                <p className="font-mono text-[11px] text-[#E7E2D8] mt-2">
                  Enrolled. You will receive private notice for Batch No. 15.
                </p>
              )}
            </form>
            <p className="font-mono text-[10px] text-[#B9AE9C]/60 mt-3 uppercase tracking-wider">
              No promotions. Dispatched quarterly only.
            </p>
          </div>
        </div>

        {/* 4 Navigation / Detail Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-16 border-b border-[#F2EFE9]/15 text-xs font-mono">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              COLLECTION
            </span>
            <ul className="space-y-2.5 text-[#E7E2D8]">
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleNavClick(e, '#collection')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Spring Batch No. 14
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleNavClick(e, '#collection')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Tableware & Bowls
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleNavClick(e, '#collection')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Architectural Vases
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleNavClick(e, '#collection')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Drinking Vessels
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              STUDIO
            </span>
            <ul className="space-y-2.5 text-[#E7E2D8]">
              <li>
                <a
                  href="#manifesto"
                  onClick={(e) => handleNavClick(e, '#manifesto')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Atelier Manifesto
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleNavClick(e, '#process')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Kiln Technology
                </a>
              </li>
              <li>
                <a
                  href="#studio"
                  onClick={(e) => handleNavClick(e, '#studio')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Kyoto Workshop
                </a>
              </li>
              <li>
                <a
                  href="#studio"
                  onClick={(e) => handleNavClick(e, '#studio')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Lisbon Atelier
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Journal */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              JOURNAL
            </span>
            <ul className="space-y-2.5 text-[#E7E2D8]">
              <li>
                <a
                  href="#journal"
                  onClick={(e) => handleNavClick(e, '#journal')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Wood Kiln Dynamics
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  onClick={(e) => handleNavClick(e, '#journal')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Shigaraki Geology
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  onClick={(e) => handleNavClick(e, '#journal')}
                  className="hover:text-[#B4532A] transition-colors"
                >
                  Stoneware Patina
                </a>
              </li>
              <li>
                <span className="text-[#7A756B]">Archive 2016–2026</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B9AE9C] block">
              CONTACT
            </span>
            <ul className="space-y-2.5 text-[#E7E2D8]">
              <li>
                <a
                  href="mailto:contact@kiln-atelier.com"
                  className="hover:text-[#B4532A] transition-colors"
                >
                  contact@kiln-atelier.com
                </a>
              </li>
              <li>
                <span className="text-[#B9AE9C]">+81 75 531 8842</span>
              </li>
              <li className="pt-2 flex gap-4 text-[11px]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B4532A] link-draw"
                >
                  Instagram
                </a>
                <a
                  href="https://are.na"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B4532A] link-draw"
                >
                  Are.na
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Huge KILN Wordmark */}
        <div className="py-12 lg:py-16 overflow-hidden">
          <div className="font-serif text-[clamp(5.5rem,19vw,17.5rem)] leading-[0.8] tracking-[-0.04em] text-[#3B3833] select-none hover:text-[#4A4640] transition-colors duration-500 text-center">
            KILN
          </div>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="pt-8 border-t border-[#F2EFE9]/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#B9AE9C]/70">
          <div>
            © 2016–2026 KILN ATELIER INC. ALL OBJECTS HAND-THROWN.
          </div>
          <div className="flex items-center gap-6">
            <span>TERMS OF CARE</span>
            <span>SHIPPING & EXPORT</span>
            <span>SPECIMEN REGISTRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
