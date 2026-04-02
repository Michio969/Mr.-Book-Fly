import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ShieldCheck, Clock, FileText, CheckCircle2, Star, Plane, Building, Calendar, Mail, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function Home() {
  // Live booking notification simulation
  useEffect(() => {
    const names = ["Rahul from India", "Sarah from UK", "Ahmed from UAE", "Maria from Brazil", "Chen from China"]
    const services = ["Flight Reservation", "Hotel Booking", "Invitation Letter"]
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)]
      const randomService = services[Math.floor(Math.random() * services.length)]
      
      toast.success(`${randomName} just booked a ${randomService}!`, {
        description: "Verified for visa application.",
        icon: <ShieldCheck className="text-green-500" />
      })
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 py-1 px-3 text-sm bg-amber-500/20 text-amber-400 border-amber-500/50">
                <ShieldCheck className="w-4 h-4 mr-2" />
                100% Embassy Acceptable Documents
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Get Verified Visa Bookings in <span className="text-amber-400">Minutes</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Trusted by 10,000+ visa applicants worldwide. Fast, secure, and fully compliant dummy tickets and hotel reservations.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link to="/order-form">
                  <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg h-14 px-8">
                    Book Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex items-center text-sm text-slate-300">
                  <Clock className="w-4 h-4 mr-2 text-amber-400" />
                  Get your booking within 30 minutes
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700/50">
                <div className="flex flex-col items-center">
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-slate-400">4.9/5 from 10k+ reviews</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400 mb-2" />
                  <span className="text-xs text-slate-400">Embassy Approved</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-6 h-6 text-green-400 mb-2" />
                  <span className="text-xs text-slate-400">Secure Payments</span>
                </div>
                <div className="flex flex-col items-center">
                  <FileText className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="text-xs text-slate-400">Instant PDF Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Visa Support Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to complete your visa application with confidence. All documents are verifiable and formatted to embassy standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Flight Reservations",
                description: "Verifiable flight itineraries with PNR for visa applications. Not actual tickets.",
                icon: <Plane className="w-8 h-8 text-blue-600" />,
                link: "/order-form",
                price: "From $3"
              },
              {
                title: "Hotel Bookings",
                description: "Confirmed hotel reservations in your destination country. Safe for embassy checks.",
                icon: <Building className="w-8 h-8 text-blue-600" />,
                link: "/order-form",
                price: "From $3"
              },
              {
                title: "Both Together",
                description: "Complete flight and hotel package for your visa at a discounted price.",
                icon: <Calendar className="w-8 h-8 text-blue-600" />,
                link: "/order-form",
                price: "From $5"
              },
              {
                title: "Invitation Letters",
                description: "Professionally drafted invitation letters tailored to your specific visa type.",
                icon: <Mail className="w-8 h-8 text-blue-600" />,
                link: "/invitation-letter",
                price: "From $25"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                    <span className="font-semibold text-slate-900">{service.price}</span>
                    <Link to={service.link}>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium">
                        Book Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600">Get your visa-ready documents in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200" />
            
            {[
              {
                step: "01",
                title: "Choose Service",
                description: "Select flights, hotels, or other services and enter your travel details."
              },
              {
                step: "02",
                title: "Secure Payment",
                description: "Pay securely using your preferred method. Multi-currency supported."
              },
              {
                step: "03",
                title: "Get Documents Instantly",
                description: "Download your verifiable PDF documents immediately after payment."
              }
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center z-10">
                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-6 border-8 border-white shadow-sm">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency & CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Your Documents Urgently?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our automated system generates your verifiable bookings instantly. Don't risk your visa application with unverified documents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/order-form">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg h-14 px-8 w-full sm:w-auto">
                Start Booking Now
              </Button>
            </Link>
            <span className="text-blue-200 text-sm">
              * Limited-time pricing available today
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-slate-600">Trusted by thousands of travelers worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Anjali Sharma",
                location: "New Delhi, India",
                text: "The dummy ticket was accepted instantly for my Schengen visa. Saved me so much money and stress!",
                avatar: "AS"
              },
              {
                name: "Kwame Mensah",
                location: "Accra, Ghana",
                text: "Fast and reliable service. I got my hotel booking in minutes and my UK visa was approved without issues.",
                avatar: "KM"
              },
              {
                name: "Elena Rodriguez",
                location: "Sao Paulo, Brazil",
                text: "Excellent support! They helped me with a custom invitation letter that was perfect for my US visa application.",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Trust Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about our visa support services.</p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-xl border p-2 shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4">Are these bookings acceptable by embassies?</AccordionTrigger>
              <AccordionContent className="px-4 text-slate-600">
                Yes, our flight reservations and hotel bookings come with valid PNRs (Passenger Name Records) that can be verified on airline websites. They are specifically designed to meet the requirements of Schengen, UK, US, and other visa applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4">Are these actual paid tickets?</AccordionTrigger>
              <AccordionContent className="px-4 text-slate-600">
                No. These are reserved itineraries (dummy tickets) made for visa purposes only. They hold a valid reservation code but are not fully paid tickets. You should not attempt to travel using these documents.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4">How long are the bookings valid?</AccordionTrigger>
              <AccordionContent className="px-4 text-slate-600">
                Flight reservations typically remain valid for 48 hours to 14 days depending on the airline. We recommend generating your documents 1-2 days before your visa appointment for the best results.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4">What is your refund policy?</AccordionTrigger>
              <AccordionContent className="px-4 text-slate-600">
                We offer a 100% refund if your document is not generated due to a technical error on our end. However, since the service provides instant digital goods, we do not offer refunds once the valid document has been delivered.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <h4 className="font-semibold text-amber-800 mb-2">Legal Disclaimer</h4>
            <p className="text-sm text-amber-700">
              Mr. Book & Fly provides reservation itineraries strictly for visa application purposes. We do not sell actual travel tickets. Users are responsible for purchasing their actual tickets once their visa is approved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
