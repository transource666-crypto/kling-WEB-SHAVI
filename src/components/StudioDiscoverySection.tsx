import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Copy, Check, Sparkles, Clock, Globe, Send } from 'lucide-react';

interface Discipline {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'discipline-3d',
    number: '01',
    title: '3D ART & FIGURINES',
    subtitle: 'Physical & Digital Collectibles',
    tags: ['Toy Design', 'Digital Sculpting', 'High-Res Textures', 'Limited Drops'],
    description:
      'From conceptual character sketches to hyper-detailed 3D toy figurines and collectible sculptures, we craft forms that resonate with collectors worldwide.',
  },
  {
    id: 'discipline-interactive',
    number: '02',
    title: 'INTERACTIVE EXPERIENCES',
    subtitle: 'Spatial Motion & Web Systems',
    tags: ['Mouse Scrubbing', 'WebGL Systems', 'Sound Design', 'Storytelling'],
    description:
      'We engineer web experiences that break standard grid norms — synchronizing video scrub, real-time lighting, and cinematic transitions.',
  },
  {
    id: 'discipline-brand',
    number: '03',
    title: 'BRAND WORLDS & DIRECTION',
    subtitle: 'Bold Visual Identity & Impact',
    tags: ['Art Direction', 'Typography', 'Custom Packaging', 'Worldbuilding'],
    description:
      'We build entire visual universes for ambitious brands, elevating product launches with iconic typographic direction and uncompromising aesthetics.',
  },
];

export const StudioDiscoverySection: React.FC = () => {
  const [activeChip, setActiveChip] = useState('3D Figurine');
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

  const handleCopyEmail = async () => {
    const email = 'studio@zcreations.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="discover"
      className="relative w-full bg-[#050507] text-white pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 sm:px-10 lg:px-16 overflow-hidden border-t border-white/10"
      style={{ zIndex: 20 }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* 1. Header Section */}
        <div id="studio-header" className="mb-16 sm:mb-24">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span
              id="studio-status-tag"
              className="text-xs uppercase tracking-widest text-white/60 font-semibold"
            >
              Creative Studio • Accepting New Commissions
            </span>
          </div>

          <h2
            id="studio-main-heading"
            className="uppercase tracking-tight text-white mb-6 leading-none"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(44px, 8vw, 120px)',
              letterSpacing: '-0.02em',
            }}
          >
            LET’S CREATE THE REMARKABLE.
          </h2>

          <p
            id="studio-main-subtext"
            className="text-white/70 max-w-2xl text-base sm:text-lg lg:text-xl font-normal leading-relaxed"
          >
            We merge 3D craft, tactile collectibles, and responsive digital storytelling to build
            experiences people never forget.
          </p>
        </div>

        {/* 2. Disciplines & Capabilities */}
        <div id="studio-disciplines-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {DISCIPLINES.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="group relative bg-[#0d0d10] border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-white/40 mb-8">
                  <span className="text-xs font-mono tracking-widest uppercase">{item.number}</span>
                  <Sparkles className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-emerald-400 transition-all duration-300" />
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2"
                  style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.01em' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">
                  {item.subtitle}
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/70 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Interactive Collaboration & Direct Reach */}
        <div
          id="studio-connect-container"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-0 bg-[#0a0a0d] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12"
        >
          {/* Left Column: Direct Info & Location */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-emerald-400 block mb-2">
                Fast Track Inquiries
              </span>
              <h3
                className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight mb-4"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                START A CONVERSATION
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8">
                Got an idea for a custom character, collectible drop, or full digital experience? Reach
                out directly or use our inquiry form.
              </p>

              {/* Direct email pill */}
              <div className="mb-8">
                <p className="text-xs uppercase font-medium tracking-wider text-white/40 mb-2">
                  Direct Studio Contact
                </p>
                <button
                  id="btn-copy-studio-email"
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-sm transition-all duration-200 cursor-pointer group"
                >
                  <Mail className="w-4 h-4 text-white/70 group-hover:text-white" />
                  <span>studio@zcreations.com</span>
                  {emailCopied ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-sans font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Hub locations */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs text-white/60">
                <div>
                  <span className="text-white font-semibold block text-sm mb-0.5">TOKYO</span>
                  <span>Shibuya Creative Hub</span>
                </div>
                <div>
                  <span className="text-white font-semibold block text-sm mb-0.5">NEW YORK</span>
                  <span>SoHo Design Loft</span>
                </div>
              </div>
            </div>

            {/* Time badge */}
            <div className="flex items-center gap-2 text-xs text-white/50 pt-6">
              <Clock className="w-3.5 h-3.5" />
              <span>Studio Master Clock: {currentTime}</span>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8">
            {formSubmitted ? (
              <div
                id="form-success-state"
                className="py-12 px-4 text-center flex flex-col items-center justify-center animate-in fade-in duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h4
                  className="text-2xl sm:text-3xl font-bold uppercase text-white mb-2"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  TRANSMISSION RECEIVED
                </h4>
                <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
                  Thank you for reaching out. A creative director from ZCREATIONS will review your vision
                  and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="text-xs uppercase tracking-wider font-semibold text-white/60 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form id="studio-inquiry-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="project-scope"
                    className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2.5"
                  >
                    Select Project Focus
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['3D Figurine', 'Interactive Web', 'Brand Identity', 'Limited Toy Drop'].map(
                      (chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setActiveChip(chip)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                            activeChip === chip
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {chip}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-name-input"
                      className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="form-name-input"
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-email-input"
                      className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="form-email-input"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="form-message-input"
                    className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-1.5"
                  >
                    Vision & Goals
                  </label>
                  <textarea
                    id="form-message-input"
                    rows={4}
                    required
                    placeholder="Tell us about your project, timeline, or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/30 transition-colors resize-none"
                  />
                </div>

                <button
                  id="btn-submit-inquiry"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-white/90 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
