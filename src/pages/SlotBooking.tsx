import { useState } from "react";
import { CalendarCheck, MessageCircle, Globe, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const COUNTRIES = [
  "Schengen Area (Europe)", "United Kingdom", "United States of America", "Canada",
  "Australia", "New Zealand", "UAE / Dubai", "Saudi Arabia", "Qatar", "Kuwait",
  "Bahrain", "Oman", "Malaysia", "Singapore", "Thailand", "Japan", "South Korea",
  "China", "Turkey", "Other (Specify on WhatsApp)",
];

const APPOINTMENT_TYPES = [
  { id: "visa", label: "Visa Interview Appointment", icon: "🛂" },
  { id: "vfs", label: "VFS Global Appointment", icon: "🏢" },
  { id: "biometric", label: "Biometric Submission", icon: "🤳" },
  { id: "embassy", label: "Embassy Direct Appointment", icon: "🏛️" },
  { id: "other", label: "Other / Custom Request", icon: "📋" },
];

const FAQS = [
  {
    q: "How does the slot booking service work?",
    a: "You share your preferred country, appointment type, and available dates with us via WhatsApp. Our team monitors availability and secures a slot on your behalf as soon as one becomes available.",
  },
  {
    q: "How long does it take to get a slot?",
    a: "This depends entirely on the country and appointment type. Slots for some countries may be available within 24–48 hours, while others may take longer. We always provide realistic timelines upfront.",
  },
  {
    q: "Is this service available for all countries?",
    a: "We cover appointments for most countries worldwide, subject to availability. If your specific country is not listed, please contact us and we will advise accordingly.",
  },
  {
    q: "What if no slots are available?",
    a: "We actively monitor for cancellations and newly opened slots on a priority basis. You will be notified the moment a suitable slot becomes available.",
  },
  {
    q: "Do I need to pay in advance?",
    a: "A small service fee applies, which is confirmed before we begin the search. Payment is made via UPI or WhatsApp discussion. We operate on complete transparency — no hidden charges.",
  },
];

export default function SlotBookingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappMsg = encodeURIComponent(
    `Hello Mr. Book & Fly! I am interested in your Slot Booking service.\n\nCountry: ${selectedCountry || "Please advise"}\nAppointment Type: ${selectedType || "Please advise"}\n\nKindly guide me on the next steps and slot availability.`
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <CalendarCheck size={16} /> Priority Slot Booking Service
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visa & Embassy Slot Booking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We understand how stressful it can be to secure a timely appointment for your visa or embassy visit. Our dedicated team assists you in obtaining confirmed slots across all major countries, based on real-time availability — so you can focus on your travel preparations with complete peace of mind.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            { icon: <MessageCircle className="text-purple-600" size={28} />, title: "1. Contact Us on WhatsApp", desc: "Share your country, appointment type, and preferred date range. Our team responds promptly." },
            { icon: <Globe className="text-blue-600" size={28} />, title: "2. We Monitor Availability", desc: "We actively track real-time slot availability across embassies, VFS, and official portals." },
            { icon: <CheckCircle className="text-green-600" size={28} />, title: "3. Slot Confirmed", desc: "Once a suitable slot is found, we confirm it for you and provide all booking details instantly." },
          ].map((step) => (
            <div key={step.title} className="bg-white rounded-2xl border p-6 text-center">
              <div className="flex justify-center mb-3">{step.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Inquiry Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-14 max-w-2xl mx-auto">
          <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> Slot availability is subject to the official embassy or consulate schedule and cannot be guaranteed in advance. However, our team works diligently to secure the earliest possible appointment for you.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-5">Quick Enquiry — Tell Us What You Need</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Country / Embassy</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="">-- Select a Country --</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
            <div className="grid sm:grid-cols-2 gap-2">
              {APPOINTMENT_TYPES.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedType(t.label)}
                  className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 cursor-pointer transition text-sm font-medium ${
                    selectedType === t.label ? "border-purple-600 bg-purple-50 text-purple-800" : "border-gray-200 text-gray-700 hover:border-purple-300"
                  }`}
                >
                  <span className="text-lg">{t.icon}</span> {t.label}
                </div>
              ))}
            </div>
          </div>

          <a
            href={`https://wa.me/447877679344?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl text-lg transition"
          >
            <MessageCircle size={20} />
            Contact Us on WhatsApp for Slot Booking
          </a>
          <p className="text-center text-sm text-gray-500 mt-3">
            Our team typically responds within <strong>15–30 minutes</strong> during business hours.
          </p>
        </div>

        {/* Countries We Cover */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Appointments Available for All Major Countries</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We provide slot booking and appointment assistance for embassies, consulates, VFS Global centres, and official visa application offices across the world. If your country is not listed below, please reach out — we are happy to advise on availability.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["🇬🇧 UK", "🇺🇸 USA", "🇨🇦 Canada", "🇦🇺 Australia", "🇩🇪 Germany", "🇫🇷 France", "🇮🇹 Italy", "🇳🇱 Netherlands", "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇶🇦 Qatar", "🇸🇬 Singapore", "🇯🇵 Japan", "🇲🇾 Malaysia", "🇳🇿 New Zealand", "🇹🇷 Turkey"].map((c) => (
              <span key={c} className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700">{c}</span>
            ))}
            <span className="bg-purple-50 border border-purple-200 rounded-full px-4 py-1.5 text-sm font-medium text-purple-700">+ Many More</span>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-2xl p-8 text-center text-white mb-14">
          <Clock className="mx-auto mb-3" size={32} />
          <h3 className="text-2xl font-bold mb-2">Don't Miss Your Window</h3>
          <p className="text-purple-100 mb-5 max-w-xl mx-auto">
            Visa slots fill up fast, especially during peak travel seasons. Get in touch with our team today and let us secure your appointment before it's too late.
          </p>
          <a
            href="https://wa.me/447877679344?text=Hello%20Mr.%20Book%20%26%20Fly!%20I%20need%20help%20with%20slot%20booking."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition"
          >
            <MessageCircle size={18} /> Book Your Slot Now
          </a>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center font-medium text-gray-800">
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openFaq === i && <p className="mt-2 text-sm text-gray-600">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
