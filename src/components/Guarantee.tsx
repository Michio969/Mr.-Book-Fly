// Guarantee.tsx
// Add this on your homepage, pricing page, or order form page to boost conversions.

export default function Guarantee() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Promise to You</h2>
          <div className="space-y-4 text-left">
            {[
              { icon: "✅", title: "100% Embassy Accepted", desc: "Every itinerary has a real, verifiable PNR code. If an embassy rejects your document due to our error, we fix it free or refund you in full." },
              { icon: "⚡", title: "30-Minute Delivery Guarantee", desc: "We deliver your document within 30 minutes of order — or your money back. Most orders arrive in under 15 minutes." },
              { icon: "🔒", title: "Your Data Is Safe", desc: "We never store or share your passport details. All data is encrypted and deleted after document delivery." },
              { icon: "💬", title: "24/7 WhatsApp Support", desc: "Real humans available via WhatsApp and email. We're here until your visa application is complete." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
