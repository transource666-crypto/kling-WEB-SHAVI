import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

export default function App() {
  return (
    <main id="mainframe-landing-page" className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Mouse-scrub controlled background video */}
      <BackgroundVideo />

      {/* Fixed top navigation bar */}
      <Navbar />

      {/* Full-screen hero section */}
      <HeroSection />
    </main>
  );
}

