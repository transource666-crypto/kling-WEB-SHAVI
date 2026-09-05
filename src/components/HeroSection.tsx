import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'We see possibilities. We turn them into something unforgettable.';

export const HeroSection: React.FC = () => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative z-1 h-screen w-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Content container */}
      <div id="hero-content" className="w-full max-w-xl relative z-10 md:ml-auto md:self-end">
        {/* 1. Blurred intro label */}
        <div
          id="blurred-intro-label"
          className="pointer-events-none select-none mb-5 sm:mb-6 text-white font-normal"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </div>

        {/* 2. Typewriter text */}
        <p
          id="typewriter-paragraph"
          className="text-white mb-5 sm:mb-6 font-normal"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              id="typewriter-blinking-cursor"
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          id="action-pill-buttons"
          className={`flex flex-wrap gap-y-1 ${
            pillsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[8px]'
          }`}
          style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* White pill buttons */}
          <button
            id="pill-pitch-idea"
            type="button"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Pitch us an idea
          </button>

          <button
            id="pill-come-work-here"
            type="button"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Come work here
          </button>

          <button
            id="pill-send-hello"
            type="button"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Send a brief hello
          </button>

          <button
            id="pill-see-how-we-operate"
            type="button"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            See how we operate
          </button>
        </div>
      </div>

      {/* Scroll down indicator to TOONHUB section */}
      <a
        id="scroll-to-toonhub-indicator"
        href="#toonhub-section"
        aria-label="Scroll down to TOONHUB figurines"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer select-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/80">
          Scroll Down
        </span>
        <svg
          className="w-4 h-4 animate-bounce text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
};
