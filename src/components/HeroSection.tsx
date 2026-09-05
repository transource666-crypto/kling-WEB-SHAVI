import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'We see possibilities. We turn them into something unforgettable.';

export const HeroSection: React.FC = () => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setControlsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative z-10 min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-8 sm:pb-12 px-5 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Subtle bottom vignette to ensure high text contrast over video scrub */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main hero center-left content */}
      <div
        id="hero-content"
        className="relative z-20 w-full max-w-4xl my-auto"
      >
        {/* 1. Status tag matching ToonHub & Discovery pages */}
        <div
          id="hero-status-pill"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold">
            Z CREATION • 3D FIGURINES & SPATIAL CRAFT
          </span>
        </div>

        {/* 2. Bold display heading with Anton font matching the site */}
        <h1
          id="hero-main-title"
          className="uppercase tracking-tight text-white mb-4 sm:mb-6 leading-none select-none"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(46px, 8.5vw, 110px)',
            letterSpacing: '-0.02em',
          }}
        >
          TURNING VISIONS INTO UNFORGETTABLE 3D CRAFT.
        </h1>

        {/* 3. Typewriter paragraph */}
        <p
          id="typewriter-paragraph"
          className="text-white/80 text-base sm:text-xl lg:text-2xl font-normal leading-relaxed max-w-2xl mb-8 min-h-[58px]"
        >
          {displayed}
          {!done && (
            <span
              id="typewriter-blinking-cursor"
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
            />
          )}
        </p>

        {/* 4. Action buttons and scrub hint */}
        <div
          id="hero-action-container"
          className={`space-y-4 transition-all duration-500 ${
            controlsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              id="btn-hero-explore-figurines"
              href="#toonhub-section"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-bold uppercase text-xs sm:text-sm tracking-wider hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer group shadow-lg shadow-white/10"
            >
              <span>Explore Figurines</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              id="btn-hero-studio-inquiries"
              href="#discover"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase text-xs sm:text-sm tracking-wider active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-md"
            >
              <span>Studio Inquiries</span>
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </a>
          </div>

          <div
            id="hero-scrub-hint"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-[11px] text-white/60"
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Move cursor horizontally across screen to scrub timeline</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom anchor bar matching ToonHub bottom layout */}
      <div
        id="hero-bottom-bar"
        className="relative z-20 w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60"
      >
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-tight uppercase">EDITION 01</span>
          <span>•</span>
          <span className="uppercase tracking-wider">TOONHUB 3D ARCHIVE</span>
        </div>

        {/* Scroll indicator */}
        <a
          id="scroll-to-toonhub-indicator"
          href="#toonhub-section"
          aria-label="Scroll down to TOONHUB figurines"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer select-none uppercase tracking-widest font-semibold text-[11px]"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
        </a>

        {/* Jump link styled like DISCOVER IT */}
        <a
          id="hero-jump-carousel"
          href="#toonhub-section"
          className="hidden md:flex items-center gap-2 text-white font-bold tracking-tight uppercase hover:text-white/80 transition-colors"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: '18px',
            letterSpacing: '0.02em',
          }}
        >
          <span>VIEW COLLECTION</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
