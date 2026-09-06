import { Link } from "react-router-dom"
import { CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSEO } from "@/lib/seo"

export default function BlogDummyTicket() {
  useSEO({
    title: "What Is a Dummy Ticket for Visa? Complete 2026 Guide",
    description:
      "Learn what a dummy ticket is, why embassies accept it, and how to get an embassy-verifiable dummy flight ticket for your visa application in minutes.",
    path: "/blog/what-is-dummy-ticket-for-visa",
    keywords:
      "what is a dummy ticket, dummy ticket for visa, dummy flight ticket, onward ticket for visa, flight reservation for visa application",
  })

  return (
    <article className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Visa Guide
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Is a Dummy Ticket for Visa? Complete Guide
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to know before applying for your Schengen, UK, US, or Canada visa.
          </p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
          <p className="text-slate-700 leading-relaxed mb-6">
            If you're preparing a visa application, chances are you've come across the term
            <strong> "dummy ticket"</strong> — and wondered whether it's legitimate, safe, or even
            necessary. This guide explains exactly what a dummy ticket is, why embassies request
            one, and how to get a verifiable ticket that meets official requirements.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Is a Dummy Ticket?</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            A dummy ticket (also called a flight reservation, itinerary, or onward ticket) is a
            real, verifiable flight booking that shows your planned travel dates, flight numbers,
            and a valid PNR (booking reference) — without requiring you to pay for a fully
            ticketed, non-refundable flight. Embassies use it to confirm your travel intent before
            you commit to purchasing an expensive ticket that could go to waste if your visa is
            denied.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            Why Do Embassies Accept Dummy Tickets?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Most visa authorities — including Schengen consulates, UK Visas and Immigration, and
            embassies for the US and Canada — only require proof of your travel plan, not a
            confirmed paid ticket. A verifiable itinerary with a real PNR satisfies this
            requirement because:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                It can be verified directly with the airline using the PNR code.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                It shows dates and flight numbers consistent with your visa application.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                It avoids forcing applicants to spend hundreds of dollars on a ticket before
                knowing if their visa will be approved.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            Is It Safe and Legal to Use?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Yes — as long as the ticket is genuinely verifiable and used strictly for visa
            application purposes, not for actual travel. A legitimate dummy ticket provider issues
            a real reservation through an accredited airline system (such as a GDS booking), which
            means embassy staff can look it up and confirm it's real. You should never use a
            ticket that is fabricated or cannot be verified, as this can lead to visa rejection.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            What Should a Good Dummy Ticket Include?
          </h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">A valid, verifiable PNR / booking reference</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">Correct passenger name(s) matching your passport</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">Accurate travel dates that match your visa application</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-700">Professional PDF formatting accepted by embassies</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            How Mr. Book & Fly Can Help
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            We provide 100% embassy-acceptable dummy flight tickets and hotel bookings, delivered
            as a PDF within 30 minutes. Every itinerary includes a real, verifiable PNR so you can
            confidently submit it with your Schengen, UK, US, or Canada visa application — trusted
            by 10,000+ customers worldwide.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-8 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> Dummy tickets and hotel bookings are intended for visa
              application purposes only and are not valid for actual travel or check-in.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link to="/flight-reservation">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Your Dummy Ticket Now
            </Button>
          </Link>
          <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-slate-300">
              <MessageCircle className="w-4 h-4 mr-2 text-green-500" /> Ask Us on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </article>
  )
}
