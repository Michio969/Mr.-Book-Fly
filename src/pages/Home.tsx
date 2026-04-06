import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck, Clock, FileText, CheckCircle2, Star, Plane, Building,
  Calendar, Mail, ArrowRight, Lock, MessageCircle, Heart, Globe,
  Ticket, CalendarDays, BadgeCheck, Zap, Users, ChevronDown, ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// ─── TRANSLATIONS ────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "hi", label: "HI", flag: "🇮🇳" },
  { code: "ar", label: "AR", flag: "🇦🇪" },
  { code: "ur", label: "UR", flag: "🇵🇰" },
]

const T: Record<string, Record<string, string>> = {
  hero_badge:     { en: "100% Embassy Acceptable Documents", hi: "100% दूतावास स्वीकार्य दस्तावेज़", ar: "وثائق مقبولة 100% من السفارة", ur: "100% سفارت قبول شدہ دستاویزات" },
  hero_h1a:       { en: "Get Verified Visa Bookings in", hi: "मिनटों में सत्यापित वीज़ा बुकिंग पाएं", ar: "احصل على حجوزات فيزا موثقة في", ur: "منٹوں میں تصدیق شدہ ویزا بکنگ پائیں" },
  hero_h1b:       { en: "Minutes", hi: "मिनट", ar: "دقائق", ur: "منٹ" },
  hero_sub:       { en: "Trusted by 10,000+ visa applicants worldwide. Fast, secure, and fully compliant dummy tickets and hotel reservations.", hi: "दुनिया भर में 10,000+ वीज़ा आवेदकों द्वारा विश्वसनीय। तेज़, सुरक्षित और पूरी तरह अनुपालन करने वाले डमी टिकट।", ar: "موثوق به من قِبَل أكثر من 10,000 متقدم للتأشيرة حول العالم. حجوزات آمنة وسريعة.", ur: "دنیا بھر میں 10,000 سے زیادہ ویزا درخواست دہندگان کا اعتماد۔ تیز، محفوظ اور مکمل تعمیل۔" },
  book_now:       { en: "Book Now", hi: "अभी बुक करें", ar: "احجز الآن", ur: "ابھی بک کریں" },
  delivery_note:  { en: "Get your booking within 30 minutes", hi: "30 मिनट में बुकिंग पाएं", ar: "احصل على حجزك خلال 30 دقيقة", ur: "30 منٹ میں بکنگ حاصل کریں" },
  services_h:     { en: "Our Visa Support Services", hi: "हमारी वीज़ा सहायता सेवाएं", ar: "خدمات دعم التأشيرة لدينا", ur: "ہماری ویزا سپورٹ سروسز" },
  how_works_h:    { en: "How It Works", hi: "यह कैसे काम करता है", ar: "كيف يعمل", ur: "یہ کیسے کام کرتا ہے" },
  reviews_h:      { en: "What Our Clients Say", hi: "हमारे ग्राहक क्या कहते हैं", ar: "ماذا يقول عملاؤنا", ur: "ہمارے کلائنٹ کیا کہتے ہیں" },
  faq_h:          { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न", ar: "الأسئلة الشائعة", ur: "اکثر پوچھے گئے سوالات" },
  cta_h:          { en: "Need Your Documents Urgently?", hi: "क्या आपको दस्तावेज़ तुरंत चाहिए?", ar: "هل تحتاج وثائقك بشكل عاجل؟", ur: "کیا آپ کو فوری دستاویزات چاہئیں؟" },
  whatsapp:       { en: "Chat on WhatsApp", hi: "WhatsApp पर चैट करें", ar: "تحدث على واتساب", ur: "WhatsApp پر چیٹ کریں" },
  start_booking:  { en: "Start Booking Now", hi: "अभी बुकिंग शुरू करें", ar: "ابدأ الحجز الآن", ur: "ابھی بکنگ شروع کریں" },
}

function t(key: string, lang: string): string {
  return T[key]?.[lang] || T[key]?.["en"] || key
}

// ─── COUNTER ────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(end / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [end])
  return <span>{count.toLocaleString()}{suffix}</span>
}

// ─── FAQ ITEM ────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors" onClick={() => setOpen(!open)}>
        {q}
        {open ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <p className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAIN HOME ────────────────────────────────────────────────
export function Home() {
  const [lang, setLang] = useState("en")
  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    const names = ["Rahul from India 🇮🇳", "Sarah from UK 🇬🇧", "Ahmed from UAE 🇦🇪", "Maria from Brazil 🇧🇷", "Fatima from Pakistan 🇵🇰", "Chen from China 🇨🇳", "Kwame from Ghana 🇬🇭"]
    const services = ["Flight Reservation", "Hotel Booking", "Schengen Visa Package", "Health Insurance", "Event Booking"]
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      toast.success(`${name} just booked a ${service}!`, { description: "Verified for visa application.", icon: <ShieldCheck className="text-green-500" /> })
    }, 18000)
    return () => clearInterval(interval)
  }, [])

  const isRtl = lang === "ar" || lang === "ur"

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? "rtl" : "ltr"}>

      {/* ── Language Switcher ── */}
      <div className="bg-slate-900 py-1.5 border-b border-slate-700">
        <div className="container mx-auto px-4 flex justify-end">
          <div className="relative">
            <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors">
              <Globe className="w-4 h-4" />
              {LANGUAGES.find(l => l.code === lang)?.flag} {LANGUAGES.find(l => l.code === lang)?.label}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 min-w-[120px]">
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false) }} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${lang === l.code ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"}`}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center" />
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 py-1.5 px-4 text-sm bg-amber-500/20 text-amber-400 border-amber-500/40 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 mr-2" /> {t("hero_badge", lang)}
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                {t("hero_h1a", lang)}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{t("hero_h1b", lang)}</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t("hero_sub", lang)}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <Link to="/order-form">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl shadow-lg shadow-amber-500/30">
                    {t("book_now", lang)} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> {t("whatsapp", lang)}
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-12">
                <Clock className="w-4 h-4 text-amber-400" /> {t("delivery_note", lang)}
              </div>

              {/* Trust bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: <Star className="w-5 h-5 fill-amber-400 text-amber-400" />, val: "4.9/5", label: "Customer Rating" },
                  { icon: <Users className="w-5 h-5 text-blue-400" />, val: "10,000+", label: "Happy Clients" },
                  { icon: <ShieldCheck className="w-5 h-5 text-green-400" />, val: "100%", label: "Embassy Approved" },
                  { icon: <Zap className="w-5 h-5 text-purple-400" />, val: "30 Min", label: "Avg Delivery" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    {s.icon}
                    <span className="text-white font-bold text-lg">{s.val}</span>
                    <span className="text-slate-400 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-blue-600 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 10000, suffix: "+", label: "Bookings Completed" },
              { val: 98, suffix: "%", label: "Visa Success Rate" },
              { val: 50, suffix: "+", label: "Countries Covered" },
              { val: 24, suffix: "/7", label: "Customer Support" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-extrabold mb-1"><Counter end={s.val} suffix={s.suffix} /></div>
                <div className="text-blue-100 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("services_h", lang)}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need for your visa application — formatted to embassy standards and delivered fast.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Flight Reservations", desc: "Verifiable PNR-verified flight itineraries. Ready for Schengen, UK, US & more.", icon: <Plane className="w-7 h-7 text-blue-600" />, link: "/flight-reservation", price: "From $3 / ₹299", color: "blue" },
              { title: "Hotel Bookings", desc: "Confirmed hotel reservations in any destination worldwide. Embassy-safe.", icon: <Building className="w-7 h-7 text-green-600" />, link: "/hotel-booking", price: "From $6 / ₹499", color: "green" },
              { title: "Event Booking", desc: "Verifiable event tickets to prove purpose of visit to embassy.", icon: <Ticket className="w-7 h-7 text-purple-600" />, link: "/event-booking", price: "From $12 / ₹1199", color: "purple" },
              { title: "Health Insurance", desc: "Travel health insurance per day — add-on with any flight booking.", icon: <Heart className="w-7 h-7 text-red-500" />, link: "/flight-reservation", price: "$4 / ₹499 per day", color: "red" },
              { title: "Invitation Letters", desc: "Professionally drafted letters for tourist, business and family visas.", icon: <Mail className="w-7 h-7 text-amber-600" />, link: "/invitation-letter", price: "Contact WhatsApp", color: "amber" },
              { title: "Slot Booking", desc: "Embassy & VFS appointment slots for all major countries worldwide.", icon: <CalendarDays className="w-7 h-7 text-indigo-600" />, link: "/appointment-booking", price: "Contact WhatsApp", color: "indigo" },
              { title: "Valuable Deals", desc: "Complete visa file packages — flight, hotel, insurance, cover letter included.", icon: <BadgeCheck className="w-7 h-7 text-orange-600" />, link: "/valuable-deals", price: "From ₹24,999", color: "orange" },
              { title: "Flight + Hotel Bundle", desc: "Best value combo — flight itinerary + hotel reservation in one order.", icon: <Calendar className="w-7 h-7 text-teal-600" />, link: "/order-form", price: "From $5 / ₹449", color: "teal" },
            ].map((s, i) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 group-hover:bg-blue-100",
                green: "bg-green-50 group-hover:bg-green-100",
                purple: "bg-purple-50 group-hover:bg-purple-100",
                red: "bg-red-50 group-hover:bg-red-100",
                amber: "bg-amber-50 group-hover:bg-amber-100",
                indigo: "bg-indigo-50 group-hover:bg-indigo-100",
                orange: "bg-orange-50 group-hover:bg-orange-100",
                teal: "bg-teal-50 group-hover:bg-teal-100",
              }
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={s.link} className="group block h-full">
                    <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${colorMap[s.color]}`}>
                          {s.icon}
                        </div>
                        <CardTitle className="text-base">{s.title}</CardTitle>
                        <CardDescription className="text-sm">{s.desc}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-800">{s.price}</span>
                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("how_works_h", lang)}</h2>
            <p className="text-slate-600">Get your visa-ready documents in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            {[
              { step: "01", title: "Choose Service", desc: "Pick flight, hotel, insurance or any visa document you need.", icon: <FileText className="w-8 h-8 text-blue-600" />, color: "bg-blue-50 border-blue-200" },
              { step: "02", title: "Secure Payment", desc: "Pay via UPI, PayPal or WhatsApp. Fast and fully secure.", icon: <Lock className="w-8 h-8 text-green-600" />, color: "bg-green-50 border-green-200" },
              { step: "03", title: "Receive on WhatsApp", desc: "Get your verified documents delivered to your email & WhatsApp within minutes.", icon: <MessageCircle className="w-8 h-8 text-amber-600" />, color: "bg-amber-50 border-amber-200" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative flex flex-col items-center text-center z-10">
                <div className={`w-28 h-28 rounded-full ${s.color} border-2 flex items-center justify-center mb-4 shadow-sm`}>
                  {s.icon}
                </div>
                <div className="absolute top-0 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY CTA ── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta_h", lang)}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Our team processes your booking within 30 minutes to 2 hours. Don't risk your visa with unverified documents.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/order-form">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl shadow-lg">
                  {t("start_booking", lang)} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 h-14 px-8 rounded-xl font-bold">
                  <MessageCircle className="w-5 h-5 mr-2" /> {t("whatsapp", lang)}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ADDITIONAL SERVICES ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Visa Support Services</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Beyond bookings — comprehensive documentation to make your visa application bulletproof.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
            {[
              { emoji: "📝", title: "Cover Letter", desc: "Embassy-ready cover letters tailored to your visa type and destination.", wa: "I need a Cover Letter for my visa application." },
              { emoji: "🗺️", title: "Travel Itinerary", desc: "Detailed day-by-day travel plans showing your activities and accommodation.", wa: "I need a Travel Itinerary for my visa application." },
              { emoji: "📂", title: "Document Preparation", desc: "Complete visa checklist, file organisation and review service.", wa: "I need help with Document Preparation for my visa." },
              { emoji: "🌍", title: "Other Visa Services", desc: "Invitation letters, sponsorship letters, NOC letters, bank statement guidance.", wa: "I need other visa support services. Please guide me." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/12 transition-all border border-white/10 hover:border-white/20">
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">{s.desc}</p>
                <a href={`https://wa.me/447877679344?text=${encodeURIComponent("Hi! " + s.wa)}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors gap-1">
                  💬 Enquire on WhatsApp <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-8 rounded-xl">💬 {t("whatsapp", lang)}</Button>
            </a>
            <a href="mailto:92sweetflower@gmail.com">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold text-lg h-14 px-8 rounded-xl">📧 Email Us</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("reviews_h", lang)}</h2>
            <p className="text-slate-600">Trusted by thousands of travelers worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Anjali Sharma", loc: "New Delhi, India 🇮🇳", text: "The dummy ticket was accepted instantly for my Schengen visa. Saved me so much money and stress!", avatar: "AS", color: "bg-blue-600" },
              { name: "Kwame Mensah", loc: "Accra, Ghana 🇬🇭", text: "Fast and reliable service. I got my hotel booking in minutes and my UK visa was approved without issues.", avatar: "KM", color: "bg-green-600" },
              { name: "Elena Rodriguez", loc: "Sao Paulo, Brazil 🇧🇷", text: "Excellent support! They helped me with a custom invitation letter that was perfect for my US visa.", avatar: "ER", color: "bg-purple-600" },
              { name: "Fatima Al-Rashid", loc: "Dubai, UAE 🇦🇪", text: "Very professional service. Got my flight itinerary within 20 minutes. Highly recommended!", avatar: "FA", color: "bg-amber-600" },
              { name: "Ravi Kumar", loc: "Mumbai, India 🇮🇳", text: "Used for Canada visa. The team was so helpful on WhatsApp and documents were perfect. Got visa approved!", avatar: "RK", color: "bg-red-600" },
              { name: "James Osei", loc: "Nairobi, Kenya 🇰🇪", text: "Best service for visa documents. Cheap, fast and embassy-acceptable. Will use again for next trip.", avatar: "JO", color: "bg-indigo-600" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="flex flex-row items-center gap-4 pb-3">
                    <div className={`w-12 h-12 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{r.avatar}</div>
                    <div>
                      <CardTitle className="text-base">{r.name}</CardTitle>
                      <CardDescription className="text-xs">{r.loc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-amber-400 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <p className="text-slate-600 text-sm italic">"{r.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Mr. Book & Mrs. Fly Advantage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "100% Embassy Approved", desc: "Every document is formatted specifically to meet embassy requirements.", bg: "bg-blue-50" },
              { icon: <Zap className="w-8 h-8 text-amber-600" />, title: "30 Min to 2 Hour Delivery", desc: "We process your booking and deliver via email and WhatsApp fast.", bg: "bg-amber-50" },
              { icon: <Globe className="w-8 h-8 text-green-600" />, title: "50+ Countries Covered", desc: "Schengen, UK, USA, Canada, UAE and all major visa destinations.", bg: "bg-green-50" },
              { icon: <MessageCircle className="w-8 h-8 text-purple-600" />, title: "24/7 WhatsApp Support", desc: "Real humans available round the clock to help you with your booking.", bg: "bg-purple-50" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-center p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{s.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">FAQ</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("faq_h", lang)}</h2>
            <p className="text-slate-600">Everything you need to know about our visa support services.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Are these bookings acceptable by embassies?", a: "Yes. Our flight reservations and hotel bookings come with valid PNRs that can be verified on airline websites. They are designed to meet requirements for Schengen, UK, US, Canada and other visa applications." },
              { q: "Are these actual paid tickets?", a: "No. These are reserved itineraries (dummy tickets) made for visa purposes only. They hold a valid PNR reservation code but are not fully paid tickets. Do not use for actual travel." },
              { q: "How long are the bookings valid?", a: "Flight reservations range from 24 hours to 10 days depending on the validity plan you choose. Hotel bookings are valid until your check-out date. We recommend generating documents 1-2 days before your visa appointment." },
              { q: "How will I receive my documents?", a: "After payment confirmation, you share your UPI Transaction ID on WhatsApp. Our team delivers the verified documents to your email and WhatsApp within 30 minutes to 2 hours." },
              { q: "What payment methods do you accept?", a: "We accept UPI (Google Pay, PhonePe, Paytm), PayPal, and bank transfer. Payment details are confirmed via WhatsApp after booking." },
              { q: "What is your refund policy?", a: "We offer a full refund if your document is not delivered due to a technical issue on our end. Since we provide instant digital documents, refunds are not issued once a valid document has been delivered." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <p className="text-sm text-amber-800 font-medium">⚠️ Legal Disclaimer: Mr. Book & Mrs. Fly provides reservation itineraries strictly for visa application purposes. We do not sell actual travel tickets. Purchase real tickets after your visa is approved.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Visa Documents?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">Join 10,000+ satisfied customers. Fast delivery, embassy-approved, 24/7 support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order-form">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl">
                {t("book_now", lang)} <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-14 px-8 rounded-xl font-bold">
                View All Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
