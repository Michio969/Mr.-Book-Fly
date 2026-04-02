import { CheckCircle2, FileText, Globe, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function VisaSupport() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Visa Support</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Beyond dummy tickets, we provide full support for your visa application journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Schengen Visa Specialists</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Applying for a Schengen visa requires meticulous documentation. A single missing or incorrectly formatted document can lead to rejection. Our team specializes in Schengen visa requirements for all 27 member states.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Flight itineraries that meet strict embassy standards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Verifiable hotel bookings for your entire stay</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Travel insurance guidance (minimum €30,000 coverage)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Cover letter drafting assistance</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Schengen Support</Button>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10" />
            <Globe className="w-16 h-16 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Supported Countries</h3>
            <div className="flex flex-wrap gap-2">
              {["France", "Germany", "Italy", "Spain", "Netherlands", "Switzerland", "Greece", "Portugal", "Sweden", "Austria"].map((country) => (
                <span key={country} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                  {country}
                </span>
              ))}
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">+ 17 more</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 flex-col-reverse md:flex-row-reverse">
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">US, UK & Canada Visas</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              These countries have unique requirements and often scrutinize applications more closely. We provide tailored documentation that aligns with their specific guidelines.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Detailed day-by-day travel itineraries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Professional invitation letters for B1/B2 visas</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700">Event and conference registration proofs</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Get US/UK/CA Support</Button>
            </Link>
          </div>
          <div className="order-2 md:order-1 bg-slate-900 text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-slate-800 rounded-br-full -z-10" />
            <FileText className="w-16 h-16 text-green-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">Document Review Service</h3>
            <p className="text-slate-300 mb-6">
              Not sure if your documents are ready? Our experts will review your entire application package before you submit it to the embassy.
            </p>
            <p className="font-semibold text-green-400">Starting at $49</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-12 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Need personalized assistance?</h2>
          <p className="text-slate-700 mb-8 max-w-2xl mx-auto">
            Every visa application is unique. If you have a complex case, previous rejections, or specific requirements, our visa consultants are here to help.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8">
              Consult an Expert
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

