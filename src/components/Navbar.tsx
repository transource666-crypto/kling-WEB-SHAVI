import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ShoppingBag, Mail, X, ArrowUpRight, Check } from 'lucide-react';

interface QuickResult {
  title: string;
  category: string;
  targetId: string;
}

const QUICK_ITEMS: QuickResult[] = [
  { title: 'Z CREATION 3D Figurines', category: 'Showcase', targetId: 'toonhub-section' },
  { title: 'Interactive Mouse Scrub Video', category: 'Experience', targetId: 'hero-section' },
  { title: 'Design That Makes An Impact', category: 'Creative', targetId: 'toonhub-section' },
  { title: 'Figurine Carousel Navigation', category: '3D Works', targetId: 'toonhub-section' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (Global)');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setCartOpen(false);
        setLangOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setSearchOpen(false);
    closeMobileMenu();
  };

  const filteredResults = QUICK_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 w-full z-40 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-auto"
      >
        {/* Logo (left) */}
        <div id="navbar-logo" className="flex flex-row items-center gap-3">
          <a
            id="navbar-brand-name"
            href="#hero-section"
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none no-underline hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ZCREATIONS
          </a>
        </div>

        {/* Top Action Icons (Commonly used in top navigation) */}
        <div
          id="navbar-action-icons"
          className="flex items-center gap-1 sm:gap-2 text-white"
        >
          {/* 1. Search Icon */}
          <button
            id="nav-icon-search"
            type="button"
            aria-label="Search website"
            onClick={() => {
              setSearchOpen(true);
              setCartOpen(false);
              setLangOpen(false);
            }}
            className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
          >
            <Search className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
            <span className="hidden lg:inline text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors pr-1">
              Search
            </span>
          </button>

          {/* 2. Globe / Language & Region */}
          <div className="relative">
            <button
              id="nav-icon-globe"
              type="button"
              aria-label="Change language or region"
              onClick={() => {
                setLangOpen((prev) => !prev);
                setCartOpen(false);
              }}
              className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center"
            >
              <Globe className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
            </button>

            {langOpen && (
              <div
                id="nav-language-popover"
                className="absolute right-0 mt-2 w-48 bg-[#18181b]/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-white"
              >
                <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                  Region & Language
                </div>
                {[
                  'English (Global)',
                  'English (United States)',
                  'Japanese (日本語)',
                  'French (Français)',
                ].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Shopping Bag / Merch */}
          <div className="relative">
            <button
              id="nav-icon-shop"
              type="button"
              aria-label="View shopping bag"
              onClick={() => {
                setCartOpen((prev) => !prev);
                setLangOpen(false);
              }}
              className="relative p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center"
            >
              <ShoppingBag className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
              <span
                id="nav-cart-badge"
                className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-black"
              />
            </button>

            {cartOpen && (
              <div
                id="nav-cart-popover"
                className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#18181b]/95 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-white"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Art Collection Bag
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">
                    Edition 01
                  </span>
                </div>
                <div className="py-4 text-center">
                  <p className="text-sm font-medium text-white mb-1">
                    Limited Figurines Ready
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Exclusive hand-crafted 3D collectibles dropping in current release window.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTarget('toonhub-section');
                    setCartOpen(false);
                  }}
                  className="w-full py-2 px-3 bg-white text-black font-semibold text-xs rounded-lg hover:bg-white/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Explore Figurines</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 4. Mail / Contact */}
          <a
            id="nav-icon-mail"
            href="mailto:hello@zcreations.com"
            aria-label="Send email inquiry"
            className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center"
          >
            <Mail className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
          </a>

          {/* Mobile Hamburger (visible below md) */}
          <button
            id="navbar-mobile-hamburger"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
            className="md:hidden ml-1 flex flex-col justify-center items-center gap-[5px] w-9 h-9 p-1.5 focus:outline-none cursor-pointer z-20 rounded-full hover:bg-white/10"
          >
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div
          id="search-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div
            id="search-modal-card"
            className="w-full max-w-xl bg-[#141416] border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <Search className="w-5 h-5 text-white/60 shrink-0" />
              <input
                ref={searchInputRef}
                id="search-modal-input"
                type="text"
                placeholder="Search figurines, creations, experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-base sm:text-lg focus:outline-none placeholder:text-white/40"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick suggestions / filter results */}
            <div className="mt-4">
              <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-2">
                Quick Navigation & Works
              </p>
              <div className="space-y-1.5">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToTarget(item.targetId)}
                      className="w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <span className="text-sm font-medium text-white/90 group-hover:text-white">
                        {item.title}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/60 group-hover:text-white flex items-center gap-1">
                        {item.category}
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-white/50 py-4 text-center">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">ESC</kbd> to exit</span>
              <span>ZCREATIONS Live Studio</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay (z-index: 35) */}
      <div
        id="mobile-nav-overlay"
        className={`md:hidden fixed inset-0 z-35 bg-black/95 backdrop-blur-xl flex flex-col justify-between px-8 py-24 transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <button
            type="button"
            onClick={() => scrollToTarget('hero-section')}
            className="text-left text-[28px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            Interactive Experience
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('toonhub-section')}
            className="text-left text-[28px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            Z CREATION Figurines
          </button>
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              setSearchOpen(true);
            }}
            className="text-left text-[28px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-3"
          >
            <Search className="w-6 h-6" />
            <span>Search Works</span>
          </button>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col gap-3">
          <div className="flex items-center gap-4 text-white">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                setCartOpen(true);
              }}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <a
              href="mailto:hello@zcreations.com"
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-white/50">
            Selected Language: {selectedLang}
          </p>
        </div>
      </div>
    </>
  );
};
