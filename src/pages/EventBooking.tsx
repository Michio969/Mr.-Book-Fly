import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, Users, CheckCircle2, ShieldCheck, Ticket, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { useSEO } from "@/lib/seo"

const WHATSAPP_NUMBER = "447877679344"

const generateOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "BF-"
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

export function EventBooking() {
  useSEO({
    title: "Event Booking for Visa",
    description: "Get verifiable event tickets (concerts, exhibitions, festivals) to prove the purpose of your visit for visa applications. Instant PDF delivery.",
    path: "/event-booking",
  })

  const [step, setStep] = useState<"form" | "confirm">("form")
  const [orderId] = useState(generateOrderId())
  const [formData, setFormData] = useState({
    eventName: "", eventDate: "", location: "",
    firstName: "", lastName: "", email: "", phone: "",
    passport: "", dob: "", gender: "", nationality: "",
  })

  const PRICE_USD = 12
  const PRICE_INR = 1199

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.eventName || !formData.eventDate || !formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      return
    }
    setStep("confirm")
  }

  const handleWhatsAppRedirect = () => {
    const msg = encodeURIComponent(
      `Hello Mr. Book & Fly! I'd like to book an Event Ticket for my visa.\n\n` +
      `Order ID: ${orderId}\n` +
      `Event: ${formData.eventName}\n` +
      `Event Date: ${formData.eventDate}\n` +
      `Location: ${formData.location}\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Passport: ${formData.passport || "N/A"}\n` +
      `Date of Birth: ${formData.dob || "N/A"}\n` +
      `Gender: ${formData.gender || "N/A"}\n` +
      `Nationality: ${formData.nationality || "N/A"}\n\n` +
      `Please confirm my booking and send payment instructions.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Event Booking for Visa</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Get verifiable event tickets (concerts, exhibitions, festivals) to prove the purpose of your visit.</p>
        </div>

        {/* Info Note */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> Fill in your event and attendee details, then you'll be redirected to WhatsApp where our team will confirm your booking and send payment instructions. Event ticket delivered within <strong>24–48 hours</strong> of payment confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <Ticket className="w-6 h-6 mr-2 text-blue-600" /> Event Details
                </CardTitle>
                <CardDescription>Enter the details of the event you plan to attend.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {step === "form" ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Name + Description */}
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name / Details</Label>
                      <Textarea
                        id="eventName"
                        placeholder="Add Event name, place, city or Country or paste the event link here. Once you add all the details and confirm the booking, we will contact you and provide you the mentioned one or specific one as per your need."
                        value={formData.eventName}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="resize-none"
                      />
                      <p className="text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded p-2">
                        💡 Add Event name, place, city or Country or paste the event link here. Once you add all the details and confirm the booking, we will contact you and provide you the mentioned one or specific one as per your need.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date</Label>
                        <div className="relative">
                          <Input id="eventDate" type="date" className="pl-10" value={formData.eventDate} onChange={handleInputChange} required />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">City / Country</Label>
                        <Input id="location" placeholder="e.g., Berlin, Germany" value={formData.location} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-semibold text-slate-900 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" /> Attendee Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="As per passport" value={formData.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="As per passport" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">WhatsApp Number</Label>
                          <Input id="phone" type="tel" placeholder="+91 9999999999" value={formData.phone} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="passport">Passport Number</Label>
                          <Input id="passport" placeholder="e.g. A1234567" value={formData.passport} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select id="gender" value={formData.gender} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(p => ({ ...p, gender: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input id="nationality" placeholder="e.g. Indian, British" value={formData.nationality} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold">
                      <MessageCircle className="w-5 h-5 mr-2" /> Continue to WhatsApp Booking
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6 text-center">

                    {/* Confirmed Banner */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Details Confirmed!</h3>
                      <p className="text-slate-600 mb-2">Your event booking for <strong>{formData.eventName.substring(0, 40)}{formData.eventName.length > 40 ? "..." : ""}</strong> is ready.</p>
                      <p className="text-2xl font-bold text-blue-700">${PRICE_USD} <span className="text-base text-gray-500">/ ₹{PRICE_INR}</span></p>
                    </div>

                    {/* What happens next */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 text-left space-y-2 text-sm text-slate-600">
                      <p>✅ You'll be redirected to <strong>WhatsApp</strong> with your booking details pre-filled.</p>
                      <p>✅ Our team will confirm within <strong>a few hours</strong> and send payment instructions.</p>
                      <p>✅ We accept UPI, Google Pay, PhonePe, and international payments.</p>
                      <p>✅ Event ticket PDF delivered within <strong>24–48 hours</strong> of payment.</p>
                    </div>

                    {/* Unpaid Invoice */}
                    <div className="bg-white border-2 border-dashed border-amber-300 rounded-xl p-5 text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">INVOICE</p>
                          <p className="text-lg font-bold text-slate-900 font-mono">{orderId}</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wide">Unpaid</span>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-medium">Event Booking for Visa</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Event Date</span><span className="font-medium">{formData.eventDate}</span></div>
                        {formData.location && <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-medium">{formData.location}</span></div>}
                        <div className="flex justify-between"><span className="text-slate-500">Attendee</span><span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                        <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                          <span className="font-bold text-slate-900">Total Due</span>
                          <span className="font-bold text-blue-700 text-base">${PRICE_USD} / ₹{PRICE_INR}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 text-center">Share this Order ID on WhatsApp — our team will send payment instructions</p>
                    </div>

                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold" onClick={handleWhatsAppRedirect}>
                      <MessageCircle className="w-5 h-5 mr-2" /> Open WhatsApp to Book Now
                    </Button>
                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setStep("form")}>← Edit Details</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-blue-100 shadow-md bg-white">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Event Ticket</span>
                  <span className="font-semibold">${PRICE_USD} / ₹{PRICE_INR}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600"><span>Instant Delivery</span><span>Free</span></div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>Total</span><span className="text-blue-600">${PRICE_USD} / ₹{PRICE_INR}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center text-amber-400"><ShieldCheck className="w-5 h-5 mr-2" />Why Choose Us?</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {["100% Embassy Acceptable", "Proves purpose of visit", "Instant PDF generation", "24/7 Customer Support"].map((f, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>{f}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">💬 Book via WhatsApp</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
