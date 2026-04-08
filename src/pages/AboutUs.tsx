import { ShieldCheck, Users, Globe, Award } from "lucide-react"

export function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Mr. Book & Fly</h1>
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
            That's where Mr. Book & Fly comes in. Our mission is to provide visa applicants with verifiable, embassy-acceptable dummy bookings that fulfill application requirements without the financial risk of purchasing actual tickets. We believe everyone deserves a fair chance to travel the world.
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
              Our automated system ensures you get your PDF documents instantly after payment, 24/7.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <a href="/flight-reservation" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
            Book Your Flight Now
          </a>
        </div>
      </div>
    </div>
  )
}
<SEO 
  title="About Us - MrBookAndFly"
  description="Learn about MrBookAndFly, your trusted travel partner for flights, 
  hotels, visa support, and comprehensive travel services."
  keywords="about mrbookandfly, travel company, travel services"
  canonical="/about-us"
/>
