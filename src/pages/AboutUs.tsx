import { ShieldCheck, Users, Globe, Award, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSEO } from "@/lib/seo"

export function AboutUs() {
  useSEO({
    title: "About Us",
    description: "Learn about Mr. Book & Fly, trusted by 10,000+ customers for embassy-acceptable dummy flight tickets and hotel bookings for visa applications worldwide.",
    path: "/about",
  })

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Mr. Book & Mrs. Fly</h1>
          <p className="text-xl text-slate-600">
            Your trusted partner for visa application success.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Applying for a visa can be a stressful and uncertain process. Many embassies require proof of travel and accommodation before they will even consider your application. However, buying non-refundable tickets before your visa is approved is a huge financial risk.
          </p>
          <p className="text-slate-600 leading-relaxed">
            That's where Mr. Book & Mrs. Fly comes in. Our mission is to provide visa applicants with verifiable, embassy-acceptable dummy bookings that fulfill application requirements without the financial risk of purchasing actual tickets. We believe everyone deserves a fair chance to travel the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Legitimate</h3>
            <p className="text-slate-600">
              Our bookings are made through actual reservation systems and come with valid PNR codes that embassies can verify.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">10,000+ Happy Clients</h3>
            <p className="text-slate-600">
              We've helped thousands of travelers successfully obtain their Schengen, UK, US, and Canadian visas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
            <p className="text-slate-600">
              No matter where you are applying from or where you are going, our documents are formatted to meet international standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
            <p className="text-slate-600">
              Our team ensures you get your documents within 30 minutes to 2 hours after payment, 24/7.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { val: "10,000+", label: "Happy Clients" },
            { val: "98%", label: "Visa Success Rate" },
            { val: "50+", label: "Countries Covered" },
            { val: "24/7", label: "Support Available" },
          ].map((s, i) => (
            <div key={i} className="bg-blue-600 text-white rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold mb-1">{s.val}</div>
              <div className="text-blue-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order-form">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg font-bold">
                Book Now
              </Button>
            </Link>
            <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 h-12 px-8 text-lg font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
