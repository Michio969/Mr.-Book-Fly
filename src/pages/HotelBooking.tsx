import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar as CalendarIcon, Users, CheckCircle2, ShieldCheck, MapPin, MessageCircle } from "lucide-react"
import { toast } from "sonner"

const WHATSAPP_NUMBER = "447877679344"

const generateOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "BF-"
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

const WORLD_CITIES = [
  "Paris, France", "London, United Kingdom", "New York, USA", "Dubai, UAE",
  "Tokyo, Japan", "Singapore", "Sydney, Australia", "Rome, Italy",
  "Barcelona, Spain", "Amsterdam, Netherlands", "Berlin, Germany", "Vienna, Austria",
  "Prague, Czech Republic", "Budapest, Hungary", "Istanbul, Turkey", "Athens, Greece",
  "Lisbon, Portugal", "Madrid, Spain", "Brussels, Belgium", "Zurich, Switzerland",
  "Copenhagen, Denmark", "Stockholm, Sweden", "Oslo, Norway", "Helsinki, Finland",
  "Mumbai, India", "New Delhi, India", "Bangalore, India", "Chennai, India",
  "Kolkata, India", "Hyderabad, India", "Goa, India", "Jaipur, India",
  "Bangkok, Thailand", "Phuket, Thailand", "Bali, Indonesia", "Kuala Lumpur, Malaysia",
  "Manila, Philippines", "Seoul, South Korea", "Beijing, China", "Shanghai, China",
  "Toronto, Canada", "Vancouver, Canada", "Los Angeles, USA", "San Francisco, USA",
  "Chicago, USA", "Miami, USA", "Doha, Qatar", "Riyadh, Saudi Arabia",
  "Cairo, Egypt", "Nairobi, Kenya", "Johannesburg, South Africa", "Cape Town, South Africa",
]

export function HotelBooking() {
  const [step, setStep] = useState(1) // 1=form, 2=whatsapp confirm
  const [orderId, setOrderId] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [showCityList, setShowCityList] = useState(false)
  const [formData, setFormData] = useState({
    city: "", checkin: "", checkout: "",
    firstName: "", lastName: "", email: "", phone: "",
    passport: "", dob: "", gender: "", nationality: "",
  })

  const filteredCities = useMemo(() =>
    WORLD_CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase())).slice(0, 8),
    [citySearch]
  )

  const nights = useMemo(() => {
    if (!formData.checkin || !formData.checkout) return 0
    const diff = new Date(formData.checkout).getTime() - new Date(formData.checkin).getTime()
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [formData.checkin, formData.checkout])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.city || !formData.checkin || !formData.checkout || !formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      return
    }
    setOrderId(generateOrderId())
    setStep(2)
  }

  const handleWhatsAppRedirect = () => {
    const msg = encodeURIComponent(
      `Hello Mr. Book & Fly! I'd like to book a hotel reservation for my visa.\n\n` +
      `Order ID: ${orderId}\n` +
      `Destination: ${formData.city}\n` +
      `Check-in: ${formData.checkin}\n` +
      `Check-out: ${formData.checkout}\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Passport: ${formData.passport}\n` +
      `Date of Birth: ${formData.dob}\n` +
      `Gender: ${formData.gender}\n` +
      `Nationality: ${formData.nationality}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hotel Booking for Visa</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Get a verifiable hotel reservation in your destination country. 100% safe for embassy checks.</p>
        </div>

        {/* Info Note */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> Fill in your details below, then you'll be redirected to WhatsApp where our team will confirm your booking and send payment instructions. Hotel booking confirmation delivered within <strong>30 minutes</strong> of payment confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <Building className="w-6 h-6 mr-2 text-blue-600" /> Accommodation Details
                </CardTitle>
                <CardDescription>Enter your stay information exactly as it should appear on your booking.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* City Search */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="city">Destination City / Country</Label>
                      <div className="relative">
                        <Input
                          id="city"
                          placeholder="Search city or country worldwide..."
                          className="pl-10"
                          value={citySearch || formData.city}
                          onChange={e => { setCitySearch(e.target.value); setFormData(p => ({ ...p, city: e.target.value })); setShowCityList(true) }}
                          onFocus={() => setShowCityList(true)}
                          autoComplete="off"
                          required
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                      </div>
                      {showCityList && citySearch && filteredCities.length > 0 && (
                        <div className="absolute z-20 bg-white border border-slate-200 rounded-md shadow-lg w-full max-h-52 overflow-y-auto">
                          {filteredCities.map((c, i) => (
                            <div key={i} className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50" onClick={() => { setFormData(p => ({ ...p, city: c })); setCitySearch(c); setShowCityList(false) }}>{c}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Check-in / Check-out */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="checkin">Check-in Date</Label>
                        <div className="relative">
                          <Input id="checkin" type="date" className="pl-10" value={formData.checkin} onChange={handleInputChange} required />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkout">Check-out Date</Label>
                        <div className="relative">
                          <Input id="checkout" type="date" className="pl-10" value={formData.checkout} onChange={handleInputChange} required />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {nights > 0 && (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 font-medium">
                        📅 {nights} night{nights > 1 ? "s" : ""} stay · Price: <span className="font-bold">₹299</span>
                      </div>
                    )}

                    {/* Guest Details */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-semibold text-slate-900 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" /> Guest Details
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
                          <select
                            id="gender"
                            value={formData.gender}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(p => ({ ...p, gender: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
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
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Details Confirmed!</h3>
                      <p className="text-slate-600 mb-2">Your booking for <strong>{formData.city}</strong> ({nights} night{nights !== 1 ? "s" : ""}) is ready.</p>
                      <p className="text-2xl font-bold text-blue-700">₹299</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 text-left space-y-2 text-sm text-slate-600">
                      <p>✅ You'll be redirected to <strong>WhatsApp</strong> with your booking details pre-filled.</p>
                      <p>✅ Our team will confirm within <strong>30 minutes</strong> and send payment instructions.</p>
                      <p>✅ We accept UPI, Google Pay, PhonePe, and international payments.</p>
                      <p>✅ Hotel booking PDF delivered within <strong>30 minutes</strong> of payment.</p>
                    </div>

                    {/* Unpaid Invoice */}
                    <div className="bg-white border-2 border-dashed border-amber-300 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">INVOICE</p>
                          <p className="text-lg font-bold text-slate-900 font-mono">{orderId}</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wide">Unpaid</span>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-medium">Hotel Booking for Visa</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Destination</span><span className="font-medium">{formData.city}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-medium">{nights} night{nights !== 1 ? "s" : ""}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Guest</span><span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                        <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                          <span className="font-bold text-slate-900">Total Due</span>
                          <span className="font-bold text-blue-700 text-base">₹299</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 text-center">Share this Order ID on WhatsApp — our team will send payment instructions</p>
                    </div>

                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold" onClick={handleWhatsAppRedirect}>
                      <MessageCircle className="w-5 h-5 mr-2" /> Open WhatsApp to Book Now
                    </Button>
                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setStep(1)}>← Edit Details</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-100 shadow-md bg-white">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Hotel Reservation</span>
                  <span className="font-semibold">₹299</span>
                </div>
                {nights > 0 && <div className="text-xs text-slate-500">{nights} night{nights !== 1 ? "s" : ""}</div>}
                <div className="flex justify-between items-center text-sm text-green-600"><span>Instant Delivery</span><span>Free</span></div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>Total</span><span className="text-blue-600">₹299</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center text-amber-400"><ShieldCheck className="w-5 h-5 mr-2" />Why Choose Us?</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {["100% Embassy Acceptable", "Verifiable directly with hotel", "Instant PDF generation", "24/7 WhatsApp Support"].map((f, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>{f}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">💬 Book via WhatsApp Directly</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
