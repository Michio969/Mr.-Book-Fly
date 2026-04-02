import { CheckCircle2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function Pricing() {
  const plans = [
    {
      name: "Dummy Flight Ticket",
      price: "$3",
      description: "Verifiable flight itinerary with valid PNR.",
      features: [
        "Verifiable Flight Itinerary",
        "Valid PNR Code",
        "Instant PDF Delivery",
        "Valid for 48-72 hours",
        "24/7 Email Support"
      ],
      link: "/order-form",
      popular: false
    },
    {
      name: "Hotel Booking",
      price: "$3",
      description: "Confirmed hotel reservation for visa application.",
      features: [
        "Confirmed Hotel Booking",
        "Valid Booking Reference",
        "Instant PDF Delivery",
        "Safe for Embassy Checks",
        "Priority Support"
      ],
      link: "/order-form",
      popular: false
    },
    {
      name: "Both Together",
      price: "$5",
      description: "Complete flight and hotel package for your visa.",
      features: [
        "Verifiable Flight Itinerary",
        "Confirmed Hotel Booking",
        "Valid PNR & Booking Codes",
        "Instant PDF Delivery",
        "Valid for up to 14 days",
        "WhatsApp Priority Support"
      ],
      link: "/order-form",
      popular: true
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600">
            No hidden fees. Get exactly what you need for your visa application instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col ${plan.popular ? 'border-blue-500 shadow-lg scale-105 z-10' : 'border-slate-200'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="h-10">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">/booking</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8 pb-8">
                <Link to={plan.link} className="w-full">
                  <Button size="lg" className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'}`}>
                    Choose Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-green-50 text-green-800 px-6 py-3 rounded-full border border-green-200">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium">100% Money-Back Guarantee if we fail to deliver your documents.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

