import { Link } from "react-router-dom"
import { CheckCircle2, ShieldCheck, MessageCircle, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import { useSEO } from "@/lib/seo"

const WHATSAPP_NUMBER = "447877679344"

const DEALS = [
  {
    id: 1,
    flag: "🇪🇺",
    name: "Schengen Visa Plan",
    countries: "All Schengen Countries",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–48 hours",
    popular: true,
    color: "blue",
    services: [
      "Appointment Confirmation",
      "Visa Application Form",
      "Cover Letter (personalised)",
      "Travel Itinerary",
      "Flight Reservation (PNR-verified)",
      "Hotel Booking (verifiable)",
      "Health & Travel Insurance",
    ],
    description: "Complete Schengen visa package. Everything your embassy needs — prepared, reviewed and delivered within 24–48 hours.",
  },
  {
    id: 2,
    flag: "🇺🇸",
    name: "USA Tourist Visa Plan",
    countries: "United States of America",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–48 hours",
    popular: false,
    color: "red",
    services: [
      "Appointment Confirmation",
      "DS-160 Form Assistance",
      "Cover Letter",
      "Travel Itinerary",
      "Flight & Hotel Booking",
      "Financial Proof Guidance",
      "Interview Preparation Tips",
    ],
    description: "Complete USA B1/B2 tourist visa file including DS-160 assistance and appointment support.",
  },
  {
    id: 3,
    flag: "🇨🇦",
    name: "Canada Tourist Visa Plan",
    countries: "Canada",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–48 hours",
    popular: false,
    color: "red",
    services: [
      "Appointment Confirmation",
      "Complete Application File",
      "Cover Letter",
      "Travel Itinerary",
      "Flight & Hotel Booking",
      "Health & Travel Insurance",
      "Financial Guidance",
    ],
    description: "End-to-end Canada visitor visa package with all required documents for a strong application.",
  },
  {
    id: 4,
    flag: "🇬🇧",
    name: "UK Tourist Visa Plan",
    countries: "United Kingdom",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–48 hours",
    popular: false,
    color: "blue",
    services: [
      "Appointment Confirmation",
      "Complete Application File",
      "Cover Letter",
      "Travel Itinerary",
      "Flight & Hotel Booking",
      "Health & Travel Insurance",
      "Bank Statement Guidance",
    ],
    description: "Complete UK Standard Visitor Visa package tailored to UKVI requirements.",
  },
  {
    id: 5,
    flag: "🇦🇺",
    name: "Australia / New Zealand Visa Plan",
    countries: "Australia & New Zealand",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–48 hours",
    popular: false,
    color: "green",
    services: [
      "Appointment Confirmation",
      "Complete Application File",
      "Cover Letter",
      "Travel Itinerary",
      "Flight & Hotel Booking",
      "Health & Travel Insurance",
      "Sponsor Letter (if needed)",
    ],
    description: "Comprehensive visa package for Australia and New Zealand visitor applications.",
  },
  {
    id: 6,
    flag: "🌍",
    name: "All Other Countries Plan",
    countries: "Any Country Worldwide",
    price: "₹24,999",
    note: "Excluding embassy fees",
    delivery: "24–72 hours",
    popular: false,
    color: "purple",
    services: [
      "Appointment Confirmation",
      "Complete Application File",
      "Cover Letter (customised)",
      "Travel Itinerary",
      "Flight & Hotel Booking",
      "Health & Travel Insurance",
      "Country-specific requirements met",
    ],
    description: "Full visa documentation service for any country — we customise every file to your destination's specific requirements.",
  },
]

const colorMap: Record<string, string> = {
  blue: "border-blue-400 bg-blue-50",
  red: "border-red-400 bg-red-50",
  green: "border-green-400 bg-green-50",
  purple: "border-purple-400 bg-purple-50",
}

const badgeMap: Record<string, string> = {
  blue: "bg-blue-600 text-white",
  red: "bg-red-600 text-white",
  green: "bg-green-600 text-white",
  purple: "bg-purple-600 text-white",
}

export default function ValuableDeals() {
  useSEO({
    title: "Valuable Deals & Visa Plans",
    description: "Complete visa document packages at fixed prices. Flight reservation, hotel booking, and insurance bundled together. Embassy fees not included.",
    path: "/valuable-deals",
  })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-amber-500/20 text-amber-700 border-amber-500/50 py-1 px-3 text-sm">
            <Star className="w-4 h-4 mr-2" /> Best Value Packages
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Valuable Deals & Visa Plans
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get your complete visa file done by professionals. One fixed price — everything included.
            Embassy fees are <strong>not included</strong>.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-6 py-3 text-amber-800 font-semibold text-lg">
            <span className="text-2xl font-extrabold">₹24,999</span>
            <span className="text-sm text-amber-600 font-normal">all-inclusive file (excl. embassy fees)</span>
          </div>
        </div>

        {/* What's included banner */}
        <div className="mb-12 bg-white border border-slate-200 rounded-2xl p-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-center text-lg font-bold text-slate-900 mb-5">Every Plan Includes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "📋", label: "Appointment Confirmation" },
              { icon: "✈️", label: "Flight Reservation (PNR)" },
              { icon: "🏨", label: "Hotel Booking" },
              { icon: "💊", label: "Health Insurance" },
              { icon: "📝", label: "Cover Letter" },
              { icon: "🗺️", label: "Travel Itinerary" },
              { icon: "📞", label: "WhatsApp Support" },
              { icon: "⚡", label: "24–48 hr Delivery" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-slate-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {DEALS.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className={`relative flex flex-col h-full border-2 ${colorMap[deal.color]} shadow-md hover:shadow-xl transition-shadow`}>
                {deal.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <CardHeader className="pb-3 pt-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{deal.flag}</span>
                    <div>
                      <CardTitle className="text-xl leading-tight">{deal.name}</CardTitle>
                      <p className="text-sm text-slate-500 mt-0.5">{deal.countries}</p>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 text-sm">{deal.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  {/* Price */}
                  <div className="bg-white rounded-xl p-4 text-center border border-slate-100">
                    <div className="text-3xl font-extrabold text-slate-900">{deal.price}</div>
                    <div className="text-xs text-red-500 font-medium">{deal.note}</div>
                    <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-green-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Delivered in {deal.delivery}
                    </div>
                  </div>

                  {/* Services */}
                  <ul className="space-y-2">
                    {deal.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 pb-6 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I want to get the ${deal.name} package for ₹24,999. Please guide me on the next steps.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button size="lg" className={`w-full ${badgeMap[deal.color]} hover:opacity-90`}>
                      <MessageCircle className="w-4 h-4 mr-2" /> Get This Plan on WhatsApp
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-slate-900 text-white rounded-2xl p-10 max-w-4xl mx-auto">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to Get Your Visa File?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Our experts handle your entire application documentation. All files are 100% embassy acceptable and delivered on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg h-14 px-8">
                <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold text-lg h-14 px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-slate-500 max-w-2xl mx-auto">
          * Embassy fees, visa application fees, biometric fees and any government charges are <strong>not included</strong> in the package price. All plans are for documentation preparation only.
        </div>
      </div>
    </div>
  )
}
