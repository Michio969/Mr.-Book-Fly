import { Link, Outlet, useLocation } from "react-router-dom"
import { Plane, Menu, X, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"
import { AnimatePresence, motion } from "motion/react"

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotel-booking" },
    { name: "Flights", path: "/flight-reservation" },
    { name: "Events", path: "/event-booking" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 relative">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 text-xs sm:text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400 transition-colors">
              <MessageCircle className="w-4 h-4 mr-1.5 text-green-500" />
              <span className="font-medium">Chat with us:</span>
              <span className="ml-1">+44 7877 679344</span>
            </a>
          </div>
          <div className="flex space-x-4">
            <span>100% Embassy Acceptable</span>
            <span className="hidden sm:inline">Instant PDF Delivery</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-blue-700">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Mr Book & Fly</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/order-form">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Book Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link to="/order-form" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 text-white">Book Now</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">Mr Book & Fly</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">Providing verified, embassy-acceptable dummy bookings for visas. Fast, secure, and reliable.</p>
            <p className="text-xs text-slate-500">Disclaimer: Bookings are for visa purposes only.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/flight-reservation" className="hover:text-white transition-colors">Flight Reservations</Link></li>
              <li><Link to="/hotel-booking" className="hover:text-white transition-colors">Hotel Bookings</Link></li>
              <li><Link to="/event-booking" className="hover:text-white transition-colors">Event Bookings</Link></li>
              <li><Link to="/invitation-letter" className="hover:text-white transition-colors">Invitation Letters</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/visa-support" className="hover:text-white transition-colors">Visa Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} Mr Book & Fly. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>

      <Toaster position="bottom-left" />
    </div>
  )
}
