import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
];

const GRAIN_DATA_URI =
  'data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.08"/></svg>';

export const ToonHubSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Track window resize for mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRoleStyle = (index: number) => {
    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex + 3) % 4;
    const isRight = index === (activeIndex + 1) % 4;

    if (isCenter) {
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0%',
      };
    }
    if (isLeft) {
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }
    if (isRight) {
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }
    // back item
    return {
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 1,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
    };
  };

  const itemTransition =
    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <div
      id="toonhub-section"
      className="relative z-20 w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        id="toonhub-viewport-container"
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {/* 1. Grain overlay */}
        <div
          id="toonhub-grain-overlay"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url('${GRAIN_DATA_URI}')`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
          }}
        />

        {/* 2. Giant ghost text "Z CREATION" */}
        <div
          id="toonhub-ghost-title"
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(65px, 20vw, 320px)',
            fontWeight: 900,
            color: '#ffffff',
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          Z CREATION
        </div>



        {/* 4. Carousel */}
        <div id="toonhub-carousel" className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => {
            const roleStyle = getRoleStyle(index);
            return (
              <div
                key={index}
                id={`toonhub-item-${index}`}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition: itemTransition,
                  willChange: 'transform, filter, opacity',
                  ...roleStyle,
                }}
              >
                <img
                  id={`toonhub-img-${index}`}
                  src={item.src}
                  alt={`Figurine ${index + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          id="toonhub-bottom-controls"
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: '380px' }}
        >
          <p
            id="toonhub-headline"
            className="font-bold uppercase tracking-wider mb-2 sm:mb-3 text-base sm:text-[20px] text-white"
            style={{ opacity: 0.95, letterSpacing: '0.02em', lineHeight: 1.25 }}
          >
            DESIGN THAT MAKES AN IMPACT
          </p>
          <p
            id="toonhub-description"
            className="text-xs sm:text-sm text-white mb-4 sm:mb-5"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            Powerful visuals, thoughtful design, and flawless creativity. crafted to make your brand stand out.
            <br className="hidden sm:inline" /> Your idea. Our creativity. Let’s create something remarkable.
          </p>

          <div id="toonhub-nav-buttons" className="flex items-center gap-3 sm:gap-4">
            <button
              id="toonhub-btn-prev"
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-transparent border-2 border-white text-white cursor-pointer transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              id="toonhub-btn-next"
              type="button"
              onClick={() => navigate('next')}
              aria-label="Next figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-transparent border-2 border-white text-white cursor-pointer transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <a
          id="toonhub-discover-link"
          href="#discover"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-3 text-white uppercase no-underline transition-opacity duration-200 hover:opacity-100"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
};
