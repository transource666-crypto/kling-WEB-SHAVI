import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToonHubSection } from './components/ToonHubSection';
import { StudioDiscoverySection } from './components/StudioDiscoverySection';

export default function App() {
  return (
    <main id="mainframe-landing-page" className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Mouse-scrub controlled background video */}
      <BackgroundVideo />

      {/* Fixed top navigation bar */}
      <Navbar />

      {/* Full-screen hero section */}
      <HeroSection />

      {/* TOONHUB full-viewport character-figurine carousel */}
      <ToonHubSection />

      {/* Studio Discovery & Collaboration Finale (Last Page) */}
      <StudioDiscoverySection />
    </main>
  );
}

