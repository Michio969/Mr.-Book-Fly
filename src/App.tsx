import React, { useState } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, Globe, Plane, ShieldCheck } from 'lucide-react';

interface VideoOption {
  id: number;
  url: string;
  label: string;
}

const VIDEOS: VideoOption[] = [
  {
    id: 0,
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'Golden Hour',
  },
  {
    id: 1,
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Still Water',
  },
  {
    id: 2,
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Deep Woods',
  },
  {
    id: 3,
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'Quiet Dawn',
  },
];

const NAV_LINKS = [
  'Visa Services',
  'Flight Deals',
  'Hotel Packages',
  'Track Application',
];

const STATS = [
  '99.4% Visa Success Rate',
  '150+ Countries Covered',
  '24/7 Express Support',
  'Fast-Track 24h Processing',
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Switch video background with a 1000ms cooldown matching opacity transition
  const handleVideoSelect = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Video #3 ("Deep Woods", index 2) triggers dark color mode (#182C41) for hero text content
  const isDarkModeActive = activeVideo === 2;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND VIDEO LAYER (4 Stacked Videos with Opacity Fade)     */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        {VIDEOS.map((vid, idx) => (
          <video
            key={vid.id}
            src={vid.url}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* OVERLAY LAYER (z-index 1) - PNG with train-bob oscillation    */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
          alt="Atmospheric Vignette Overlay"
          className="w-full h-full object-cover animate-train-bob"
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTENT LAYER (z-index 2) - Flex Column Layout                 */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-2 w-full h-full flex flex-col justify-between px-6 sm:px-12 py-6">
        
        {/* TOP NAVIGATION BAR */}
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-white text-xl sm:text-2xl italic tracking-wide drop-shadow-md hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            mrbookandflty.shop
          </a>

          {/* Desktop Nav Pill */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full liquid-glass font-sans-ui">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-1.5 text-sm text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => alert('Starting your application process...')}
              className="ml-2 px-5 py-1.5 text-sm text-black font-medium bg-white rounded-full hover:bg-white/90 transition-colors cursor-pointer shadow-lg active:scale-95 transform duration-150"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button with Animated Crossfade Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="liquid-glass p-2.5 rounded-full text-white cursor-pointer relative w-10 h-10 flex items-center justify-center focus:outline-none"
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 transform ${
                  mobileMenuOpen
                    ? 'rotate-90 scale-75 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 transform ${
                  mobileMenuOpen
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-75 opacity-0'
                }`}
              />
            </button>
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* HERO CONTENT (Centered, Theme transitions to #182C41 on Video 3) */}
        {/* ------------------------------------------------------------- */}
        <main className="w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto px-4 py-6">
          
          {/* Badge */}
          <div
            className={`liquid-glass rounded-full px-4 py-1.5 mb-6 text-xs sm:text-sm font-sans-ui transition-colors duration-700 ${
              isDarkModeActive ? 'liquid-glass-dark text-[#182C41]' : 'text-white/90'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 inline-block opacity-80" />
              Over 50,000+ Visas Approved & Global Flights Booked
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl tracking-tight mb-4 transition-colors duration-700 ${
              isDarkModeActive ? 'text-[#182C41]' : 'text-white'
            }`}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Seamless Visas & Skyways <br className="hidden sm:inline" />
            For Every Journey
          </h1>

          {/* Subtext */}
          <p
            className={`max-w-xl text-sm sm:text-base leading-relaxed font-sans-ui mb-8 transition-colors duration-700 ${
              isDarkModeActive ? 'text-[#182C41]/85' : 'text-white/80'
            }`}
          >
            Fast-track visa approvals, guaranteed flight reservations, and tailored travel experiences for globetrotters worldwide. One platform, infinite destinations.
          </p>

          {/* Input CTA Pill */}
          <form
            onSubmit={handleFormSubmit}
            className={`w-full max-w-[320px] sm:max-w-sm rounded-full p-1.5 flex items-center gap-2 mb-8 transition-colors duration-700 ${
              isDarkModeActive
                ? 'liquid-glass-dark border border-[#182C41]/20'
                : 'liquid-glass'
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Your Travel Destination or Visa Type..."
              className={`flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm font-sans-ui focus:outline-none transition-colors duration-700 ${
                isDarkModeActive
                  ? 'text-[#182C41] placeholder-[#182C41]/50'
                  : 'text-white placeholder-white/60'
              }`}
            />
            <button
              type="submit"
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-sans-ui font-medium rounded-full transition-all cursor-pointer whitespace-nowrap shadow-md active:scale-95 ${
                isDarkModeActive
                  ? 'bg-[#182C41] text-white hover:bg-[#182C41]/90'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              Get Fast Visa
            </button>
          </form>

          {/* Form submission toast message */}
          {submitted && (
            <div
              className={`mb-6 text-xs sm:text-sm font-sans-ui px-4 py-2 rounded-full inline-flex items-center gap-2 transition-all ${
                isDarkModeActive
                  ? 'bg-[#182C41] text-white'
                  : 'bg-white/20 backdrop-blur-md text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Inquiry sent! Our visa specialists will contact you immediately.
            </div>
          )}

          {/* Video Switcher Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 font-sans-ui text-xs sm:text-sm">
            {VIDEOS.map((vid, idx) => {
              const isActive = activeVideo === idx;
              return (
                <button
                  key={vid.id}
                  onClick={() => handleVideoSelect(idx)}
                  disabled={isTransitioning}
                  className={`pb-1 transition-all duration-700 border-b-2 cursor-pointer ${
                    isActive
                      ? isDarkModeActive
                        ? 'border-[#182C41] text-[#182C41] font-medium'
                        : 'border-white text-white font-medium'
                      : isDarkModeActive
                      ? 'border-transparent text-[#182C41]/50 hover:text-[#182C41]/80'
                      : 'border-transparent text-white/50 hover:text-white/80'
                  }`}
                >
                  {vid.label}
                </button>
              );
            })}
          </div>
        </main>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM STATS FOOTER (Always White, System-UI font)            */}
        {/* ------------------------------------------------------------- */}
        <footer className="w-full max-w-6xl mx-auto pt-4 pb-2 font-sans-ui">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-white/70 text-xs sm:text-sm text-center">
            {STATS.map((stat, idx) => (
              <React.Fragment key={stat}>
                <span className="hover:text-white transition-colors">{stat}</span>
                {idx < STATS.length - 1 && (
                  <span className="hidden sm:inline text-white/30">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </footer>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE MENU OVERLAY (Fixed z-50, Staggered Entrance)          */}
      {/* ------------------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex flex-col items-center justify-center px-6 transition-all duration-500">
          {/* Close button top right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 liquid-glass p-2.5 rounded-full text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Staggered Nav Links */}
          <div className="flex flex-col items-center gap-6 text-center font-sans-ui">
            {NAV_LINKS.map((link, idx) => {
              const delayMs = 100 + idx * 50; // 100ms, 150ms, 200ms, 250ms
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${delayMs}ms`,
                    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="text-white text-3xl font-light hover:opacity-80 transition-all duration-500 transform translate-y-0 animate-[fadeInUp_500ms_ease-out_forwards]"
                >
                  {link}
                </a>
              );
            })}

            {/* Mobile CTA Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                alert('Redirecting to Mr. Book & Fly application portal...');
              }}
              style={{
                animationDelay: '300ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="mt-4 px-8 py-3 text-base text-black font-medium bg-white rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-xl active:scale-95 animate-[fadeInUp_500ms_ease-out_forwards]"
            >
              Apply For Visa
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
