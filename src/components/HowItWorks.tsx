// HowItWorks.tsx
// Your Home.tsx already has a "How It Works" section built in.
// Use this as a standalone reusable component if needed on other pages.

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-500">Get your visa documents in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "1", title: "Place Your Order", desc: "Enter your travel details: full name, passport number, travel dates, and destination. Takes under 2 minutes." },
            { step: "2", title: "We Book Your Itinerary", desc: "We create a real, PNR-verifiable flight reservation in the airline system — fully formatted for embassy submission." },
            { step: "3", title: "Receive in 30 Minutes", desc: "Your flight itinerary and/or hotel confirmation is delivered to your email. Ready to attach to your visa application." },
          ].map((s, i) => (
            <div key={i} className="text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
