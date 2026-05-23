// TrustBar.tsx
// This component is ALREADY built into Home.tsx as an inline section.
// You have two options:
//
// OPTION A (Recommended): DELETE this file. The trust bar is already in Home.tsx.
//
// OPTION B: If you want TrustBar as a reusable component (e.g. to use on other pages),
// paste the code below into this file and import it wherever needed.

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          {[
            { icon: "🔒", text: "SSL Secured Checkout" },
            { icon: "✅", text: "100% Embassy Accepted" },
            { icon: "⚡", text: "30-Min Delivery Guarantee" },
            { icon: "🌍", text: "10,000+ Customers Worldwide" },
            { icon: "💳", text: "Secure Payment" },
            { icon: "🔄", text: "Money-Back Guarantee" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
