import { CheckCircle2, ShieldCheck, Plane, Building, Ticket, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useSEO } from "@/lib/seo"

export function Pricing() {
  useSEO({
    title: "Pricing",
    description: "Transparent pricing for dummy flight tickets, hotel bookings, and visa documents. Plans starting at $3. No hidden fees, instant PDF delivery.",
    path: "/pricing",
  })

  const flightPlans = [
    { label: "24–36 Hours", price_usd: "$3", price_inr: "₹299", features: ["Verifiable Flight Itinerary", "Valid PNR Code", "Instant PDF Delivery", "24–36 hr validity", "Email Support"] },
    { label: "96 Hours", price_usd: "$9", price_inr: "₹999", features: ["Verifiable Flight Itinerary", "Valid PNR Code", "Instant PDF Delivery", "4 Day validity", "Priority Support"], popular: true },
    { label: "7 Days", price_usd: "$14", price_inr: "₹1299", features: ["Verifiable Flight Itinerary", "Valid PNR Code", "Instant PDF Delivery", "7 Day validity", "WhatsApp Support"] },
    { label: "1 Month", price_usd: "$20", price_inr: "₹1599", features: ["Verifiable Flight Itinerary", "Valid PNR Code", "Instant PDF Delivery", "1 Month validity", "WhatsApp Priority Support"] },
  ]

  const otherPlans = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      name: "Hotel Booking",
      price_usd: "$2",
      price_inr: "₹299",
      suffix: "/booking",
      description: "Confirmed hotel reservation for visa application.",
      features: ["Confirmed Hotel Booking", "Valid Booking Reference", "Instant PDF Delivery", "Any city worldwide", "Safe for Embassy Checks", "WhatsApp Support"],
      link: "/hotel-booking",
    },
    {
      icon: <Ticket className="w-8 h-8 text-purple-600" />,
      name: "Event Booking",
      price_usd: "$12",
      price_inr: "₹1199",
      suffix: "/booking",
      description: "Verifiable event ticket to prove purpose of visit.",
      features: ["Event Ticket (Concert/Exhibition/Festival)", "Proves Visit Purpose", "Instant PDF Delivery", "Embassy Acceptable", "WhatsApp Support"],
      link: "/event-booking",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      name: "Health Insurance",
      price_usd: "$4",
      price_inr: "₹299",
      suffix: "/day",
      description: "Travel health insurance coverage per day.",
      features: ["Per Day Coverage", "Add-on with Flight Booking", "Instant Confirmation", "Embassy Acceptable", "WhatsApp Support"],
      link: "/flight-reservation",
    },
    {
      icon: <Plane className="w-8 h-8 text-green-600" />,
      name: "Flight + Hotel Bundle",
      price_usd: "$5",
      price_inr: "₹449",
      suffix: "/bundle",
      description: "Complete flight and hotel package for your visa.",
      features: ["Verifiable Flight Itinerary", "Confirmed Hotel Booking", "Valid PNR & Booking Codes", "Instant PDF Delivery", "WhatsApp Priority Support"],
      link: "/order-form",
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600">No hidden fees. Get exactly what you need for your visa application instantly.</p>
        </div>

        {/* Flight Plans */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold mb-2">
              <Plane className="w-5 h-5" /> Flight Reservation Plans
            </div>
            <p className="text-slate-500 text-sm">Choose validity period — longer validity = more embassy confidence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {flightPlans.map((plan, i) => (
              <Card key={i} className={`relative flex flex-col ${plan.popular ? "border-blue-500 shadow-lg scale-105 z-10" : "border-slate-200"}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="flex items-center justify-center gap-1 mb-1"><Clock className="w-4 h-4 text-blue-500" /><span className="text-sm text-blue-600 font-medium">{plan.label}</span></div>
                  <CardTitle className="text-3xl font-extrabold">{plan.price_usd}</CardTitle>
                  <div className="text-slate-500 text-sm">{plan.price_inr} /booking</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start text-sm"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /><span>{f}</span></li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 pb-6">
                  <Link to="/flight-reservation" className="w-full">
                    <Button size="lg" className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-800 hover:bg-slate-900"}`}>Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Plans */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold">All Other Services</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {otherPlans.map((plan, i) => (
              <Card key={i} className={`relative flex flex-col ${plan.popular ? "border-green-500 shadow-lg scale-105 z-10" : "border-slate-200"}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">BEST VALUE</div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="flex justify-center mb-2">{plan.icon}</div>
                  <CardTitle className="text-lg mb-1">{plan.name}</CardTitle>
                  <CardDescription className="text-xs">{plan.description}</CardDescription>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">{plan.price_usd}</span>
                    <span className="text-slate-500 text-sm">{plan.suffix}</span>
                  </div>
                  <div className="text-slate-500 text-sm">{plan.price_inr}{plan.suffix}</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start text-sm"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /><span>{f}</span></li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 pb-6">
                  <Link to={plan.link} className="w-full">
                    <Button size="lg" className={`w-full ${plan.popular ? "bg-green-600 hover:bg-green-700" : "bg-slate-800 hover:bg-slate-900"}`}>Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-green-50 text-green-800 px-6 py-3 rounded-full border border-green-200">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium">100% Money-Back Guarantee if we fail to deliver your documents.</span>
          </div>
          <div className="block">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8" asChild>
              <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">💬 Any questions? Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

