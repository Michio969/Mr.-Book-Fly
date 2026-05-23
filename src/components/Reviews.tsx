// Reviews.tsx
// Your Home.tsx already has a full testimonials section.
// Use this as a standalone component on other pages (e.g. /about, /pricing).

export default function Reviews() {
  const reviews = [
    { name: "Anjali Sharma", loc: "New Delhi, India 🇮🇳", text: "The dummy ticket was accepted instantly for my Schengen visa. Saved me so much money and stress!", avatar: "AS", color: "bg-blue-600", visa: "Schengen Visa ✅" },
    { name: "Kwame Mensah", loc: "Accra, Ghana 🇬🇭", text: "Fast and reliable service. I got my hotel booking in minutes and my UK visa was approved without issues.", avatar: "KM", color: "bg-green-600", visa: "UK Visa ✅" },
    { name: "Elena Rodriguez", loc: "Sao Paulo, Brazil 🇧🇷", text: "Excellent support! They helped me with a custom invitation letter that was perfect for my US visa.", avatar: "ER", color: "bg-purple-600", visa: "US Visa ✅" },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">What Our Clients Say</h2>
          <p className="text-slate-500">Trusted by thousands of travelers worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{r.avatar}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                  <p className="text-slate-400 text-xs">{r.loc}</p>
                </div>
              </div>
              <div className="flex text-amber-400 mb-3">{[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}</div>
              <p className="text-slate-600 text-sm italic mb-3">"{r.text}"</p>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{r.visa}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
