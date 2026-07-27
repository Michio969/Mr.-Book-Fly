import React, { useState } from 'react';
import {
  Menu,
  X,
  Globe,
  CheckCircle2,
  Plane,
  Compass,
  ShieldCheck,
  Clock,
  FileCheck,
  Star,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Lock,
  Send,
  HelpCircle,
} from 'lucide-react';

// Video asset path (placed in /public/background.mp4)
const BACKGROUND_VIDEO_URL = '/background.mp4';

// Types
interface Destination {
  id: string;
  name: string;
  region: 'europe' | 'asia' | 'americas' | 'middle-east';
  image: string;
  approvalRate: string;
  processingTime: string;
  price: string;
  featured?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

// Data Arrays
const NAV_LINKS = [
  'Destinations',
  'Services',
  'How It Works',
  'Testimonials',
  'FAQ',
];

const STATS = [
  '99.4% Visa Success Rate',
  '180+ Worldwide Destinations',
  '24/7 Express Concierge',
  'Guaranteed Flight Itineraries',
];

const DESTINATIONS: Destination[] = [
  {
    id: 'schengen',
    name: 'Schengen Visa (Europe)',
    region: 'europe',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    approvalRate: '99.2%',
    processingTime: '3-5 Days',
    price: '$79',
    featured: true,
  },
  {
    id: 'japan',
    name: 'Japan Tourist eVisa',
    region: 'asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    approvalRate: '99.8%',
    processingTime: '24 Hours',
    price: '$49',
    featured: true,
  },
  {
    id: 'uae',
    name: 'Dubai / UAE Express',
    region: 'middle-east',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    approvalRate: '99.9%',
    processingTime: '12 Hours',
    price: '$59',
  },
  {
    id: 'usa',
    name: 'USA B1/B2 Appointment',
    region: 'americas',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800',
    approvalRate: '98.5%',
    processingTime: 'Fast Slot',
    price: '$129',
    featured: true,
  },
  {
    id: 'uk',
    name: 'United Kingdom Standard',
    region: 'europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    approvalRate: '99.1%',
    processingTime: '5-7 Days',
    price: '$89',
  },
  {
    id: 'singapore',
    name: 'Singapore Fast eVisa',
    region: 'asia',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
    approvalRate: '99.7%',
    processingTime: '24 Hours',
    price: '$39',
  },
];

const FAQS: FAQItem[] = [
  {
    question: 'Are the flight itineraries accepted by embassies for visa applications?',
    answer:
      'Yes, 100%. We issue genuine, verifiable flight reservations with live PNR numbers that embassies and consulates accept for Schengen, UK, US, and worldwide visa applications.',
  },
  {
    question: 'How fast can I get my visa processed through mrbookandflty.shop?',
    answer:
      'We offer express processing ranging from 12 hours for eVisas (e.g., UAE, Singapore) up to 3–5 business days for embassy sticker visas. Emergency expedited options are available.',
  },
  {
    question: 'What happens if my visa gets rejected?',
    answer:
      'Our visa review team pre-checks all your documents with AI and certified agents to ensure 99.4% approval. In the rare case of rejection, we re-apply for free or refund our service fee.',
  },
  {
    question: 'Can I book dummy flight and hotel vouchers for visa proof without buying full tickets?',
    answer:
      'Absolutely! Our platform specializes in providing official, holdable flight and hotel itinerary vouchers for embassy submissions without requiring full payment upfront.',
  },
];

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  // Filtered destinations
  const filteredDestinations =
    selectedRegion === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === selectedRegion);

  return (
    <div className="w-full bg-black text-white font-sans-ui overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (FULLSCREEN VIDEO + LIQUID GLASS NAVBAR + SEARCH)         */}
      {/* ========================================================================= */}
      <section className="relative w-full h-screen overflow-hidden select-none">
        
        {/* BACKGROUND VIDEO LAYER */}
        <div className="absolute inset-0 z-0">
          <video
            src={BACKGROUND_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/90 pointer-events-none" />
        </div>

        {/* OVERLAY LAYER - Transparent PNG with train-bob */}
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          <img
            src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
            alt="Vignette Overlay"
            className="w-full h-full object-cover animate-train-bob"
          />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-2 w-full h-full flex flex-col justify-between px-6 sm:px-12 py-6">
          
          {/* Top Navbar */}
          <header className="w-full max-w-7xl mx-auto flex items-center justify-between">
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
              <a
                href="#destinations"
                className="ml-2 px-5 py-1.5 text-sm text-black font-medium bg-white rounded-full hover:bg-white/90 transition-colors shadow-lg active:scale-95 transform duration-150"
              >
                Apply Now
              </a>
            </nav>

            {/* Mobile Hamburger */}
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

          {/* Hero Main Content */}
          <main className="w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto px-4 py-4">
            <div className="liquid-glass rounded-full px-4 py-1.5 mb-6 text-xs sm:text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 opacity-80" />
                Global Horizons Travel • Fast Visas & Express Flight Booking
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl tracking-tight mb-4 text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Fly Beyond Horizons <br className="hidden sm:inline" />
              Borderless Visas & Skyways
            </h1>

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-white/85 mb-8">
              Fast-track visa approvals, flight reservations, and luxury travel concierge services. Powered by Global Horizons Travel & mrbookandflty.shop.
            </p>

            {/* Input Search Pill */}
            <form
              onSubmit={handleFormSubmit}
              className="w-full max-w-[320px] sm:max-w-sm rounded-full p-1.5 flex items-center gap-2 mb-6 liquid-glass"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Destination or Visa Type..."
                className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all cursor-pointer whitespace-nowrap shadow-md active:scale-95"
              >
                Get Fast Visa
              </button>
            </form>

            {submitted && (
              <div className="mb-4 text-xs sm:text-sm px-4 py-2 rounded-full inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Request received! Our travel concierge will reach out in under 15 minutes.
              </div>
            )}
          </main>

          {/* Bottom Stats Row */}
          <footer className="w-full max-w-6xl mx-auto pt-4 pb-2">
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
      </section>

      {/* ========================================================================= */}
      {/* 2. POPULAR DESTINATIONS & VISA DIRECTORY SECTION                          */}
      {/* ========================================================================= */}
      <section id="destinations" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto relative">
        {/* Background glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white/80 inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Worldwide Visa Catalog</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl text-white tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Popular Destinations & <span className="italic text-white/80">Approval Rates</span>
            </h2>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-2 liquid-glass p-1.5 rounded-full self-start md:self-auto">
            {['all', 'europe', 'asia', 'americas', 'middle-east'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-1.5 text-xs sm:text-sm rounded-full capitalize transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-white text-black font-medium shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {region === 'all' ? 'All Visas' : region.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="liquid-glass rounded-2xl overflow-hidden group hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-emerald-400 font-medium flex items-center gap-1 border border-white/10">
                  <CheckCircle2 className="w-3 h-3" />
                  {dest.approvalRate} Success
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl text-white mb-2"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-white/70 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 opacity-70" /> {dest.processingTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 opacity-70 text-blue-400" /> Embassy Verified
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/50 block">Processing Fee</span>
                    <span className="text-xl font-semibold text-white">{dest.price}</span>
                  </div>
                  <button
                    onClick={() => alert(`Starting visa application for ${dest.name}`)}
                    className="liquid-glass hover:bg-white hover:text-black px-4 py-2 rounded-full text-xs font-medium text-white transition-all flex items-center gap-1.5 group-hover:px-5 cursor-pointer"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE SERVICES SECTION (4 PILLARS)                                      */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 px-6 sm:px-12 bg-white/[0.01] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white/80 inline-flex items-center gap-2 mb-3">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Full-Spectrum Travel Concierge</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl text-white tracking-tight mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Designed for <span className="italic text-white/80">Flawless Journeys</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              From diplomatic embassy processing to instant verifiable flight reservations, we eliminate travel bureaucracy so you focus on the horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="liquid-glass p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center mb-6 text-amber-300">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Express Visa Approvals
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Fast-track submission for eVisas and embassy appointments with document pre-verification to ensure zero rejection risk.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pre-embassy AI document check</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24-48h expedited options</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="liquid-glass p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center mb-6 text-blue-400">
                  <Plane className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Flight Reservations (PNR)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Genuine verifiable airline flight itineraries required for embassy visa proof without committing to full ticket purchases.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Embassy compliant</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live PNR on airline websites</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="liquid-glass p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center mb-6 text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Hotel Vouchers & Stays
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Confirmed hotel accommodation proof for visa applications with flexible date changes and instant PDF confirmation vouchers.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant PDF delivery</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free date modifications</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="liquid-glass p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center mb-6 text-emerald-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  24/7 Global VIP Concierge
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Direct priority WhatsApp & Telegram access to senior visa specialists for real-time tracking and emergency flight changes.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Direct WhatsApp support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multilingual travel agents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS (4-STEP PROCESS TIMELINE)                                 */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white/80 inline-flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>Effortless 4-Step Process</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl text-white tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How <span className="italic text-white/80">mrbookandflty.shop</span> Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Select Destination',
              desc: 'Choose your desired country or visa type from our global directory.',
            },
            {
              step: '02',
              title: 'Upload Documents',
              desc: 'Securely submit your passport copy and photo through our encrypted portal.',
            },
            {
              step: '03',
              title: 'Consular Review',
              desc: 'Our visa officers perform AI verification and submit directly to consulates.',
            },
            {
              step: '04',
              title: 'Receive & Fly',
              desc: 'Download your approved eVisa or flight vouchers and head straight to the airport.',
            },
          ].map((item, idx) => (
            <div key={item.step} className="liquid-glass p-6 rounded-2xl relative flex flex-col justify-between">
              <div>
                <span
                  className="text-4xl text-white/30 block mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-amber-300">
                <Sparkles className="w-3 h-3" /> Step {idx + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TESTIMONIALS / PROOF OF SUCCESS                                         */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-24 px-6 sm:px-12 bg-white/[0.01] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white/80 inline-flex items-center gap-2 mb-3">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Verified Traveler Reviews</span>
              </div>
              <h2
                className="text-4xl sm:text-5xl text-white tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Trusted by Over <span className="italic text-white/80">50,000 Explorers</span>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white block">4.9 / 5.0</span>
              <span className="text-xs text-white/60">Based on 12,400+ TrustPilot reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Elena Rostova',
                role: 'Digital Nomad',
                review:
                  'I needed a Schengen visa flight itinerary in under 2 hours for an urgent Paris meeting. mrbookandflty.shop delivered a live verifiable PNR immediately. Schengen approved in 4 days!',
                country: 'France Schengen Approved',
              },
              {
                name: 'David Chen',
                role: 'Frequent Business Traveler',
                review:
                  'The Japan eVisa service is insanely smooth. Saved me 3 trips to the embassy in London. Highly recommended for anyone wanting fast-track approvals.',
                country: 'Japan eVisa Approved',
              },
              {
                name: 'Sarah & Marcus',
                role: 'Honeymooners',
                review:
                  'We had a complex multi-country Asia trip. Their team handled our Singapore, Dubai, and Thailand visas seamlessly with flight itineraries included.',
                country: 'Multi-Destination Approved',
              },
            ].map((item, idx) => (
              <div key={idx} className="liquid-glass p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-300 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed mb-6">
                    "{item.review}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <span className="text-[10px] text-white/50">{item.role}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {item.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ ACCORDION SECTION                                                  */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white/80 inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Got Questions?</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl text-white tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Frequently Asked <span className="italic text-white/80">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg text-white font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GRAND CTA BANNER                                                        */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="liquid-glass rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden border border-white/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="text-4xl sm:text-6xl text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Ready to Explore <span className="italic text-white/80">The World?</span>
            </h2>
            <p className="text-xs sm:text-base text-white/80 mb-8 leading-relaxed">
              Get your fast-track visa or flight reservation issued in minutes. Experience stress-free travel with mrbookandflty.shop today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => alert('Opening instant application portal...')}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-xl cursor-pointer active:scale-95"
              >
                Start Visa Application
              </button>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium liquid-glass text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER SECTION                                                          */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-black/80 py-16 px-6 sm:px-12 text-xs text-white/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <span
              className="text-white text-2xl italic block mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              mrbookandflty.shop
            </span>
            <p className="text-white/60 leading-relaxed mb-4">
              Your premier gateway for fast-track visas, embassy-verifiable flight itineraries, and global travel concierge services.
            </p>
            <span className="text-[11px] text-white/40 block">
              © 2026 Global Horizons Travel Ltd. All rights reserved.
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Visa Services</h4>
            <ul className="space-y-2.5">
              <li><a href="#destinations" className="hover:text-white transition-colors">Schengen Europe Visa</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Japan Tourist eVisa</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">USA B1/B2 Appointments</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">UAE & Dubai 30-Day Express</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Flight & Stay</h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="hover:text-white transition-colors">Flight Reservation for Visa (PNR)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hotel Booking Confirmation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Travel Insurance Proof</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">24/7 VIP Concierge</a></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Security & Support</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              256-Bit SSL Encrypted. Certified partner for global consulates and airlines.
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <Lock className="w-4 h-4 text-emerald-400" /> Secure Checkout Guaranteed
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MOBILE OVERLAY DRAWER                                                      */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden flex flex-col items-center justify-center px-6 transition-all duration-500">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 liquid-glass p-2.5 rounded-full text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-6 text-center">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-3xl font-light hover:opacity-80 transition-all"
              >
                {link}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                alert('Opening application portal...');
              }}
              className="mt-4 px-8 py-3 text-base text-black font-medium bg-white rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-xl"
            >
              Apply For Visa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
