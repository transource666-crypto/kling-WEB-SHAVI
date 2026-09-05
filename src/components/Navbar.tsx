import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ShoppingBag, Mail, X, ArrowUpRight, Check, Menu } from 'lucide-react';

interface QuickResult {
  title: string;
  category: string;
  targetId: string;
}

const QUICK_ITEMS: QuickResult[] = [
  { title: 'Z CREATION 3D Figurines', category: 'Showcase', targetId: 'toonhub-section' },
  { title: 'Interactive Mouse Scrub Video', category: 'Experience', targetId: 'hero-section' },
  { title: 'Studio Inquiries & Commissions', category: 'Discovery', targetId: 'discover' },
  { title: 'Design That Makes An Impact', category: 'Creative', targetId: 'toonhub-section' },
  { title: 'Brand Worlds & 3D Art', category: 'Discipline', targetId: 'discover' },
];

const MENU_ITEMS = [
  { id: 'hero-section', number: '01', label: 'EXPERIENCE', sub: 'Interactive Timeline' },
  { id: 'toonhub-section', number: '02', label: '3D FIGURINES', sub: 'Toy Collectibles' },
  { id: 'discover', number: '03', label: 'STUDIO & INQUIRIES', sub: 'Commissions & Disciplines' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (Global)');
  const [currentTime, setCurrentTime] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track scroll position to update active menu link and navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero-section', 'toonhub-section', 'discover'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update clock for menu overlay
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const filteredResults = QUICK_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 px-5 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center pointer-events-auto ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        {/* Logo (left) */}
        <div id="navbar-logo" className="flex items-center gap-3">
          <a
            id="navbar-brand-name"
            href="#hero-section"
            className="flex items-center gap-2.5 text-white select-none no-underline hover:opacity-85 transition-opacity"
          >
            <span
              id="navbar-brand-text"
              className="text-[24px] sm:text-[28px] uppercase leading-none tracking-[0.03em] font-normal"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              ZCREATIONS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
        </div>

        {/* Center Desktop Navigation Menu Bar */}
        <div
          id="navbar-desktop-menu"
          className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md shadow-inner"
        >
          {MENU_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-menu-item-${item.id}`}
                type="button"
                onClick={() => scrollToTarget(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-black shadow-md shadow-white/10 font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-white/40'}`}>
                  {item.number}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Icons & Explicit MENU Trigger */}
        <div
          id="navbar-action-icons"
          className="flex items-center gap-1.5 sm:gap-2 text-white"
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
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xl:inline text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors pr-1">
              Search
            </span>
          </button>

          {/* 2. Globe / Language & Region */}
          <div className="relative hidden sm:block">
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
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
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
                    {selectedLang === lang && <Check className="w-3.5 h-3.5 text-white" />}
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
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
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

          {/* 4. Explicit MENU Button Pill */}
          <button
            id="nav-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close site menu' : 'Open site menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
              menuOpen
                ? 'bg-white text-black border-white shadow-lg shadow-white/15'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            {menuOpen ? (
              <>
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>MENU</span>
                <Menu className="w-3.5 h-3.5" />
              </>
            )}
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

            <div className="mt-4 max-h-72 overflow-y-auto space-y-1">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToTarget(item.targetId)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-sm font-medium text-white group-hover:text-white block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-white/50">{item.category}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-white/40">
                  No matching results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Full-Screen Architectural Site Menu Overlay */}
      <div
        id="full-site-menu-overlay"
        className={`fixed inset-0 z-35 bg-[#070709]/95 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-6 sm:px-12 lg:px-20 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Menu Navigation Items */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Main Links */}
          <div className="lg:col-span-8 flex flex-col space-y-4 sm:space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
              NAVIGATION DIRECTORY
            </span>

            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`overlay-menu-item-${item.id}`}
                  type="button"
                  onClick={() => scrollToTarget(item.id)}
                  className="group flex items-baseline gap-4 sm:gap-6 text-left cursor-pointer transition-all duration-200"
                >
                  <span className="text-sm sm:text-base font-mono text-white/40 group-hover:text-emerald-400 transition-colors">
                    {item.number}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`uppercase tracking-tight leading-none transition-transform group-hover:translate-x-2 duration-300 ${
                        isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(36px, 6vw, 76px)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm text-white/50 tracking-wider font-normal mt-1">
                      {item.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Info Box inside Menu */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 text-white/80">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-white/50 block mb-1">
                Studio Communications
              </span>
              <a
                href="mailto:studio@zcreations.com"
                className="text-base font-mono text-white hover:text-emerald-400 transition-colors block"
              >
                studio@zcreations.com
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Master Clock</span>
                <span className="font-mono text-white">{currentTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Locations</span>
                <span className="text-white">Tokyo / New York</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Status</span>
                <span className="text-emerald-400 font-medium">Accepting Commissions</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Entire Archive</span>
            </button>
          </div>
        </div>

        {/* Bottom Menu Bar */}
        <div className="max-w-6xl w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">ZCREATIONS ARCHIVE</span>
            <span>•</span>
            <span>EDITION 01</span>
          </div>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </>
  );
};
