import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
      >
        {/* Logo (left) */}
        <div id="navbar-logo" className="flex flex-row items-center gap-3">
          <span
            id="navbar-brand-name"
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            id="navbar-decorative-asterisk"
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop Nav Links (center, hidden below md) */}
        <div
          id="navbar-desktop-links"
          className="hidden md:flex flex-row items-center text-[23px] text-white"
        >
          <a
            id="nav-link-labs"
            href="#labs"
            className="hover:opacity-60 transition-opacity"
          >
            Labs
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            id="nav-link-studio"
            href="#studio"
            className="hover:opacity-60 transition-opacity"
          >
            Studio
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            id="nav-link-openings"
            href="#openings"
            className="hover:opacity-60 transition-opacity"
          >
            Openings
          </a>
          <span className="select-none">,&nbsp;</span>
          <a
            id="nav-link-shop"
            href="#shop"
            className="hover:opacity-60 transition-opacity"
          >
            Shop
          </a>
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <div id="navbar-desktop-cta" className="hidden md:block">
          <a
            id="nav-link-get-in-touch"
            href="mailto:hello@mainframe.co"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger (visible below md) */}
        <button
          id="navbar-mobile-hamburger"
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none cursor-pointer z-20"
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay (z-index: 9) */}
      <div
        id="mobile-nav-overlay"
        className={`md:hidden fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          id="mobile-nav-link-labs"
          href="#labs"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Labs
        </a>
        <a
          id="mobile-nav-link-studio"
          href="#studio"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Studio
        </a>
        <a
          id="mobile-nav-link-openings"
          href="#openings"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Openings
        </a>
        <a
          id="mobile-nav-link-shop"
          href="#shop"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Shop
        </a>
        <a
          id="mobile-nav-link-get-in-touch"
          href="mailto:hello@mainframe.co"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
};
