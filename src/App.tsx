import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ── Import your existing pages ──────────────────────────────
import Home from "./pages/Home";

// ── NAVBAR ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Mr Book & Fly logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span className="nav-logo-text">
            Mr <span>Book</span> & Fly
          </span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/flight-reservation">Flights</a>
          <a href="/hotel-booking">Hotels</a>
          <a href="/valuable-deals">Deals</a>
          <a href="/about-us">About</a>
          <a href="/contact">Contact</a>
        </div>

        <button className="nav-btn" onClick={() => window.location.href = "/flight-reservation"}>
          Book Now ✈
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu open">
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/flight-reservation" onClick={() => setMenuOpen(false)}>Flights</a>
          <a href="/hotel-booking" onClick={() => setMenuOpen(false)}>Hotels</a>
          <a href="/valuable-deals" onClick={() => setMenuOpen(false)}>Deals</a>
          <a href="/about-us" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </>
  );
}

// ── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <img src="/logo.png" alt="Mr Book & Fly"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span>Mr <span>Book</span> & Fly</span>
          </div>
          <p className="footer-desc">
            Your trusted travel companion. We make premium travel affordable
            for everyone — flights, hotels, visa support and more.
          </p>
          <div className="footer-socials">
            <a href="#" className="soc-btn" aria-label="Facebook">f</a>
            <a href="#" className="soc-btn" aria-label="Instagram">📷</a>
            <a href="#" className="soc-btn" aria-label="Twitter">𝕏</a>
            <a href="#" className="soc-btn" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/flight-reservation">Flight Booking</a></li>
            <li><a href="/hotel-booking">Hotel Booking</a></li>
            <li><a href="/visa-support">Visa Support</a></li>
            <li><a href="/health-insurance">Travel Insurance</a></li>
            <li><a href="/valuable-deals">Hot Deals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/dashboard">My Bookings</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/refund-policy">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Mr Book & Fly. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-of-service">Terms</a>
          <a href="/refund-policy">Refunds</a>
        </div>
      </div>
    </footer>
  );
}

// ── SCROLL REVEAL ────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── HOMEPAGE SECTIONS ────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">✈ Premium Travel Experience</div>
        <h1 className="hero-title">
          Your World,<br />
          <span className="gold">Fly Higher</span>
        </h1>
        <p className="hero-subtitle">
          Discover extraordinary destinations at unbeatable prices.
          Flights, hotels, visa support & curated packages — all in one place.
        </p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => window.location.href = "/flight-reservation"}>
            Book a Flight →
          </button>
          <button className="btn-outline" onClick={() => window.location.href = "/valuable-deals"}>
            View Deals
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}

function SearchBox() {
  const [tab, setTab] = useState("flights");
  const tabs = [
    { id: "flights", icon: "✈", label: "Flights" },
    { id: "hotels", icon: "🏨", label: "Hotels" },
    { id: "visa", icon: "📋", label: "Visa" },
    { id: "insurance", icon: "🛡", label: "Insurance" },
  ];
  const routes: Record<string, string> = {
    flights: "/flight-reservation",
    hotels: "/hotel-booking",
    visa: "/visa-support",
    insurance: "/health-insurance",
  };
  return (
    <section className="search-section">
      <div className="search-box">
        <div className="search-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`stab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="search-fields">
          <div className="sfield">
            <label>From</label>
            <input type="text" className="sinput" placeholder="City or Airport" />
          </div>
          <div className="sfield">
            <label>To</label>
            <input type="text" className="sinput" placeholder="City or Airport" />
          </div>
          <div className="sfield">
            <label>Departure</label>
            <input type="date" className="sinput" />
          </div>
          <div className="sfield">
            <label>Return</label>
            <input type="date" className="sinput" />
          </div>
          <button className="sbtn" onClick={() => window.location.href = routes[tab]}>
            🔍 Search
          </button>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const data = [
    { val: "2M+", lbl: "Happy Travellers" },
    { val: "190+", lbl: "Destinations" },
    { val: "50K+", lbl: "Bookings Done" },
    { val: "4.9★", lbl: "Average Rating" },
  ];
  return (
    <div className="stats-bar">
      <div className="stats-grid">
        {data.map((s, i) => (
          <div key={i} className="reveal" style={{ textAlign: "center" }}>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const list = [
    { icon: "✈", title: "Flight Booking", desc: "Compare thousands of flights and find the cheapest fares with instant confirmation.", link: "/flight-reservation" },
    { icon: "🏨", title: "Hotel Booking", desc: "Browse 500,000+ hotels worldwide — from budget stays to luxury resorts.", link: "/hotel-booking" },
    { icon: "📋", title: "Visa Support", desc: "Complete visa assistance for all countries. Documentation, tracking and guidance.", link: "/visa-support" },
    { icon: "🛡", title: "Travel Insurance", desc: "Medical, cancellation and baggage protection. Travel with full confidence.", link: "/health-insurance" },
    { icon: "🎟", title: "Event Booking", desc: "Book tickets for concerts, sports events, shows and local experiences.", link: "/event-booking" },
    { icon: "💬", title: "24/7 Support", desc: "Our travel experts are available around the clock to help you anytime.", link: "/contact" },
  ];
  return (
    <section className="section section-bg">
      <div className="section-inner">
        <div className="sec-head reveal">
          <span className="sec-tag">Why Choose Us</span>
          <h2 className="sec-title">Travel Smarter,<br />Not Harder</h2>
          <p className="sec-desc">Everything you need for the perfect trip — under one roof.</p>
        </div>
        <div className="services-grid">
          {list.map((s, i) => (
            <div key={i} className={`svc-card reveal delay-${(i % 3) + 1}`} onClick={() => window.location.href = s.link}>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  const dests = [
    { country: "Japan", city: "Tokyo", price: "₹45,000", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
    { country: "UAE", city: "Dubai", price: "₹28,000", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
    { country: "France", city: "Paris", price: "₹52,000", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
    { country: "Indonesia", city: "Bali", price: "₹32,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
    { country: "USA", city: "New York", price: "₹65,000", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
  ];
  return (
    <section className="section">
      <div className="section-inner">
        <div className="sec-head reveal">
          <span className="sec-tag">Top Destinations</span>
          <h2 className="sec-title">Where Do You<br />Want to Go?</h2>
          <p className="sec-desc">Handpicked destinations loved by our travellers</p>
        </div>
        <div className="dest-grid reveal">
          {dests.map((d, i) => (
            <div key={i} className="dest-card" onClick={() => window.location.href = "/flight-reservation"}>
              <img src={d.img} alt={d.city} className="dest-img" loading="lazy" />
              <div className="dest-overlay" />
              <div className="dest-info">
                <div className="dest-country">{d.country}</div>
                <div className="dest-city">{d.city}</div>
                <div className="dest-price">From <strong>{d.price}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deals() {
  const deals = [
    { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Best Value", from: "Delhi", to: "Dubai", title: "Weekend Escape to Dubai", price: "₹28,499" },
    { img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", badge: "Limited Time", from: "Mumbai", to: "Tokyo", title: "Cherry Blossom Japan Tour", price: "₹89,999" },
    { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", badge: "Early Bird", from: "Bangalore", to: "Paris", title: "Paris Luxury Package", price: "₹1,10,000" },
  ];
  return (
    <section className="section section-bg">
      <div className="section-inner">
        <div className="sec-head reveal">
          <span className="sec-tag">Hot Deals</span>
          <h2 className="sec-title">Limited Time<br />Offers</h2>
          <p className="sec-desc">Grab these deals before they're gone — prices updated daily.</p>
        </div>
        <div className="deals-grid">
          {deals.map((d, i) => (
            <div key={i} className={`deal-card reveal delay-${i + 1}`}>
              <div className="deal-img">
                <img src={d.img} alt={d.title} loading="lazy" />
                <span className="deal-badge">{d.badge}</span>
              </div>
              <div className="deal-body">
                <div className="deal-route">{d.from} <em>✈</em> {d.to}</div>
                <div className="deal-name">{d.title}</div>
              </div>
              <div className="deal-foot">
                <div>
                  <div style={{ fontSize: "11px", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>From</div>
                  <div className="deal-price">{d.price} <small>/person</small></div>
                </div>
                <button className="deal-book" onClick={() => window.location.href = "/flight-reservation"}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const data = [
    { stars: 5, text: "Booked my Dubai trip in minutes. The prices were unbeatable and the support team was amazing. Highly recommended!", name: "Priya Sharma", loc: "Mumbai", init: "P" },
    { stars: 5, text: "Found a flight to Tokyo at half the price compared to other sites. The booking process was smooth and fast.", name: "Rahul Verma", loc: "Delhi", init: "R" },
    { stars: 5, text: "The Paris package was absolutely perfect. Everything arranged — hotels, flights, local experiences. 10/10!", name: "Ananya Patel", loc: "Bangalore", init: "A" },
  ];
  return (
    <section className="section section-dark">
      <div className="section-inner">
        <div className="sec-head reveal">
          <span className="sec-tag">Testimonials</span>
          <h2 className="sec-title">Loved by Thousands</h2>
          <p className="sec-desc">Real stories from real travellers</p>
        </div>
        <div className="reviews-grid">
          {data.map((r, i) => (
            <div key={i} className={`review-card reveal delay-${i + 1}`}>
              <div className="stars">{"★".repeat(r.stars)}</div>
              <p className="review-text">"{r.text}"</p>
              <div className="reviewer">
                <div className="reviewer-av">{r.init}</div>
                <div>
                  <div className="reviewer-name">{r.name}</div>
                  <div className="reviewer-loc">{r.loc}, India</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="cta-section">
      <div className="cta-inner reveal">
        <h2 className="cta-title">Ready for Your<br />Next Adventure?</h2>
        <p className="cta-desc">Join over 2 million happy travellers. Book today and save up to 40% on flights and hotels.</p>
        <button className="btn-dark" onClick={() => window.location.href = "/flight-reservation"}>
          Start Booking →
        </button>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="news-section">
      <div className="news-inner reveal">
        <span className="sec-tag">Newsletter</span>
        <h2 className="sec-title" style={{ fontSize: "34px" }}>Get Exclusive Deals</h2>
        <p className="sec-desc">Subscribe and be first to know about flash sales and secret fares.</p>
        {done ? (
          <div style={{ marginTop: "28px", padding: "18px", background: "#f0fdf4", borderRadius: "12px", color: "#166534", fontWeight: 600 }}>
            🎉 You're subscribed! Watch your inbox for deals.
          </div>
        ) : (
          <form className="news-form" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
            <input type="email" className="news-input" placeholder="Your email address" value={email}
              onChange={e => setEmail(e.target.value)} required />
            <button type="submit" className="news-btn">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── FULL PAGE LAYOUT ─────────────────────────────────────────
function HomePage() {
  useReveal();
  return (
    <>
      <Hero />
      <SearchBox />
      <Stats />
      <Services />
      <Destinations />
      <Deals />
      <Reviews />
      <CTABanner />
      <Newsletter />
    </>
  );
}

// ── APP WITH ROUTER ──────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}
