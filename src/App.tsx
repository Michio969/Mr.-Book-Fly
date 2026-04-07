import { MessageCircle, Plane, ShieldCheck, ChevronDown, Globe, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden text-[#111827]">
      {/* Top Bar */}
      <div className="bg-[#1a202c] text-gray-300 text-sm py-2.5 px-4 md:px-8 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-[#22c55e]" />
          <span>Chat with us: +44 7877 679344</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium">
          <span>100% Embassy Acceptable</span>
          <span>Instant PDF Delivery</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white py-3.5 px-4 md:px-8 flex justify-between items-center border-b border-gray-100 shadow-sm w-full z-10">
        <div className="flex items-center gap-2">
          <Plane size={24} className="text-[#2563eb] rotate-[-15deg]" />
          <span className="text-[#1e3a8a] font-extrabold text-[22px] tracking-tight">Mr Book & Fly</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-[14.5px] font-medium text-gray-600">
          <a href="#" className="text-[#2563eb]">Home</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Hotels</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Flights</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Events</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Health Insurance</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Slot Booking</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Deals</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">About</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Contact</a>
        </div>

        <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-sm">
          Book Now
        </button>
      </nav>

      {/* Language Sub-bar */}
      <div className="bg-[#1e293b] py-2 px-4 md:px-8 flex justify-end items-center text-gray-300 text-xs w-full z-0">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <Globe size={14} />
          <span>GB English</span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="flex-grow relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 w-full"
        style={{
          backgroundColor: '#2b4c8d',
          backgroundImage: `linear-gradient(rgba(43, 76, 141, 0.85), rgba(43, 76, 141, 0.95)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center w-full z-10">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-[#f59e0b]/40 bg-[#1e3a8a]/30 backdrop-blur-sm rounded-full px-5 py-2">
            <ShieldCheck size={18} className="text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-sm md:text-[15px] font-semibold tracking-wide">100% Embassy Acceptable Documents</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-white leading-[1.1] mb-6">
            Get Verified Visa <br className="hidden md:block" />
            Bookings in <span className="text-[#f59e0b]">Minutes</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Trusted by 10,000+ visa applicants worldwide. Fast, secure, and fully compliant dummy tickets and hotel reservations.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
            <button className="bg-[#f59e0b] hover:bg-[#d97706] text-[#111827] font-bold rounded-lg px-8 py-4 flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-lg text-lg">
              Book Now
              <ArrowRight size={20} className="ml-1" />
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg px-8 py-4 flex items-center justify-center gap-3 transition-colors w-full sm:w-auto min-w-[200px] shadow-lg h-[60px]">
              <MessageCircle size={24} className="text-[#22c55e]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#22c55e] hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center z-50 group">
        <MessageCircle size={32} />
      </button>
    </div>
  );
}

export default App;
