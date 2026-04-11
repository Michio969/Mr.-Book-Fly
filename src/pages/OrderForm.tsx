import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plane, Building, Calendar as CalendarIcon, MapPin, ShieldCheck, CheckCircle2, FileText, MessageCircle, X, Phone, Mail } from "lucide-react"
import { toast } from "sonner"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { generatePDF } from "@/lib/api"

// ─── UPI QR CODE BASE64 (existing) ────────────────────────────────────────────
const UPI_QR_BASE64 = "data:image/jpeg;base64,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"

// ─── SECOND UPI QR CODE (add your own base64 or URL below) ─────────────────────
// Replace the URL below with your second UPI QR code image URL or base64 string
const UPI_QR2_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/320px-QR_code_for_mobile_English_Wikipedia.svg.png"

// ─── WORLD CITIES AUTOCOMPLETE DATA ─────────────────────────────────────────────
const WORLD_CITIES = [
  // India
  "Mumbai, India", "Delhi, India", "Bangalore, India", "Hyderabad, India",
  "Ahmedabad, India", "Chennai, India", "Kolkata, India", "Pune, India",
  "Jaipur, India", "Surat, India", "Lucknow, India", "Kanpur, India",
  "Nagpur, India", "Patna, India", "Indore, India", "Bhopal, India",
  "Ludhiana, India", "Agra, India", "Amritsar, India", "Chandigarh, India",
  "Kochi, India", "Coimbatore, India", "Goa, India", "Vadodara, India",
  // Middle East
  "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE", "Doha, Qatar",
  "Riyadh, Saudi Arabia", "Jeddah, Saudi Arabia", "Muscat, Oman",
  "Kuwait City, Kuwait", "Manama, Bahrain",
  // Europe
  "London, UK", "Paris, France", "Berlin, Germany", "Rome, Italy",
  "Madrid, Spain", "Amsterdam, Netherlands", "Vienna, Austria",
  "Zurich, Switzerland", "Geneva, Switzerland", "Brussels, Belgium",
  "Lisbon, Portugal", "Warsaw, Poland", "Prague, Czech Republic",
  "Budapest, Hungary", "Stockholm, Sweden", "Copenhagen, Denmark",
  "Oslo, Norway", "Helsinki, Finland", "Athens, Greece",
  // North America
  "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA",
  "Phoenix, USA", "Philadelphia, USA", "San Antonio, USA", "San Diego, USA",
  "Dallas, USA", "Miami, USA", "Seattle, USA", "Boston, USA",
  "San Francisco, USA", "Washington DC, USA", "Las Vegas, USA",
  "Toronto, Canada", "Vancouver, Canada", "Montreal, Canada",
  "Calgary, Canada", "Ottawa, Canada",
  // Asia-Pacific
  "Singapore, Singapore", "Kuala Lumpur, Malaysia", "Bangkok, Thailand",
  "Jakarta, Indonesia", "Manila, Philippines", "Hong Kong", "Tokyo, Japan",
  "Osaka, Japan", "Seoul, South Korea", "Beijing, China", "Shanghai, China",
  "Guangzhou, China", "Sydney, Australia", "Melbourne, Australia",
  "Auckland, New Zealand", "Colombo, Sri Lanka", "Dhaka, Bangladesh",
  "Karachi, Pakistan", "Lahore, Pakistan", "Kathmandu, Nepal",
  // Africa
  "Cairo, Egypt", "Nairobi, Kenya", "Lagos, Nigeria", "Johannesburg, South Africa",
  "Cape Town, South Africa", "Casablanca, Morocco",
]

// ─── CITY AUTOCOMPLETE COMPONENT ─────────────────────────────────────────────────
function CityAutocomplete({
  id,
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string
  placeholder: string
  value: string
  onChange: (val: string) => void
  required?: boolean
}) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showList, setShowList] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowList(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    if (val.length >= 2) {
      const filtered = WORLD_CITIES.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8)
      setSuggestions(filtered)
      setShowList(filtered.length > 0)
    } else {
      setShowList(false)
    }
  }

  const handleSelect = (city: string) => {
    setQuery(city)
    onChange(city)
    setShowList(false)
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          className="pl-10"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowList(true)
          }}
          autoComplete="off"
          required={required}
        />
        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
      </div>
      {showList && (
        <ul className="absolute z-50 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-52 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
              onMouseDown={() => handleSelect(city)}
            >
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── MAIN ORDER FORM COMPONENT ────────────────────────────────────────────────────
export function OrderForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedUPI, setSelectedUPI] = useState<"qr1" | "qr2">("qr1")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    destinationCity: "",
    serviceType: "flight",
  })

  const whatsappNumber = "+447877679344"
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  const getWhatsAppMessage = () => {
    const msg = `Hello! I want to book a dummy ticket. My details are: Name: ${formData.fullName || "[name]"} | Travel Date: ${formData.departureDate || "[date]"} | From: ${formData.departureCity || "[city]"} | To: ${formData.destinationCity || "[city]"} | Service: ${formData.serviceType || "[service type]"}`
    return encodeURIComponent(msg)
  }

  const basePrices: Record<string, number> = { flight: 3, hotel: 3, both: 5 }
  const finalAmount = customAmount && !isNaN(parseFloat(customAmount)) && parseFloat(customAmount) > 0
    ? parseFloat(customAmount)
    : basePrices[formData.serviceType]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
    setCustomAmount("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone || !formData.departureDate || !formData.departureCity || !formData.destinationCity) {
      toast.error("Please fill in all required fields.")
      return
    }
    setShowPayment(true)
  }

  const handlePaymentSuccess = async (details?: any) => {
    setIsProcessing(true)
    try {
      if (formData.serviceType === "flight" || formData.serviceType === "both") {
        await generatePDF("flight", {
          passengerName: formData.fullName,
          from: formData.departureCity,
          to: formData.destinationCity,
          departure: formData.departureDate,
          return: formData.returnDate,
          email: formData.email,
        })
      }
      if (formData.serviceType === "hotel" || formData.serviceType === "both") {
        await generatePDF("hotel", {
          guestName: formData.fullName,
          city: formData.destinationCity,
          checkin: formData.departureDate,
          checkout: formData.returnDate || formData.departureDate,
          email: formData.email,
        })
      }
      setShowSuccessModal(true)
      setShowPayment(false)
    } catch (error) {
      toast.error("Failed to generate documents. Please contact support.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUPISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!transactionId) {
      toast.error("Please enter your UPI Transaction ID.")
      return
    }
    handlePaymentSuccess()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quick Order Form</h1>
          <p className="text-lg text-slate-600">Get your visa documents in minutes. Fast, secure, and reliable.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="text-xl flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Travel Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!showPayment ? (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name (as per passport)</Label>
                        <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3 border-t border-slate-100 pt-4">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" /> Contact Details
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Contact Number <span className="text-xs text-slate-400">(WhatsApp preferred)</span></Label>
                          <div className="flex gap-2">
                            <select
                              id="countryCode"
                              value={formData.countryCode}
                              onChange={handleInputChange}
                              className="w-24 rounded-md border border-input bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+971">+971</option>
                              <option value="+92">+92</option>
                              <option value="+880">+880</option>
                              <option value="+94">+94</option>
                              <option value="+977">+977</option>
                              <option value="+60">+60</option>
                              <option value="+65">+65</option>
                            </select>
                            <Input id="phone" type="tel" placeholder="9999999999" value={formData.phone} onChange={handleInputChange} required className="flex-1" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1"><Mail className="w-4 h-4 text-blue-600" /> E-Mail</Label>
                          <Input value={formData.email} readOnly className="bg-slate-50 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* ── UPDATED: City Autocomplete ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="departureCity">Departure City</Label>
                        <CityAutocomplete
                          id="departureCity"
                          placeholder="e.g., London, UK"
                          value={formData.departureCity}
                          onChange={(val) => setFormData((p) => ({ ...p, departureCity: val }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationCity">Destination City</Label>
                        <CityAutocomplete
                          id="destinationCity"
                          placeholder="e.g., Paris, France"
                          value={formData.destinationCity}
                          onChange={(val) => setFormData((p) => ({ ...p, destinationCity: val }))}
                          required
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <div className="relative">
                          <Input id="departureDate" type="date" className="pl-10" value={formData.departureDate} onChange={handleInputChange} required />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnDate">Return Date (Optional)</Label>
                        <div className="relative">
                          <Input id="returnDate" type="date" className="pl-10" value={formData.returnDate} onChange={handleInputChange} />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Service Type */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <Label className="text-base font-semibold">Select Service Type</Label>
                      <RadioGroup defaultValue="flight" onValueChange={handleServiceChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="flight" id="flight" className="peer sr-only" />
                          <Label htmlFor="flight" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer">
                            <Plane className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Dummy Flight</span>
                            <span className="text-xs text-slate-500 mt-1">$3</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="hotel" id="hotel" className="peer sr-only" />
                          <Label htmlFor="hotel" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer">
                            <Building className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Hotel Booking</span>
                            <span className="text-xs text-slate-500 mt-1">$3</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="both" id="both" className="peer sr-only" />
                          <Label htmlFor="both" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer">
                            <div className="flex gap-1 mb-3"><Plane className="h-5 w-5" /><Building className="h-5 w-5" /></div>
                            <span className="text-sm font-medium">Both Together</span>
                            <span className="text-xs text-slate-500 mt-1">$5</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-bold">
                        Confirm Booking
                      </Button>
                      <Button type="button" variant="outline" className="flex-1 border-green-500 text-green-600 hover:bg-green-50 h-12 text-lg font-semibold flex items-center justify-center gap-2" asChild>
                        <a href={`${whatsappLink}?text=${getWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-5 h-5" />
                          Book via WhatsApp
                        </a>
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8 py-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Choose Payment Method</h3>

                      {/* ── UPDATED: Amount + Self Payment ── */}
                      <div className="mt-3 space-y-3">
                        <p className="text-slate-600">
                          Base Amount: <span className="text-blue-600 font-bold">${basePrices[formData.serviceType]}</span>
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-xs mx-auto">
                          <Label className="text-sm font-semibold text-amber-800 block mb-1">
                            💰 Custom / Self Payment Amount (USD)
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder={`Default: $${basePrices[formData.serviceType]}`}
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="text-center font-bold text-blue-700 border-amber-300 focus:border-amber-500"
                          />
                          <p className="text-xs text-amber-600 mt-1">Leave blank to use default price</p>
                        </div>
                        <p className="text-lg font-bold text-green-700">
                          Total to Pay: ${finalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="max-w-sm mx-auto space-y-8">

                      {/* ── UPDATED: UPI QR with 2 options ── */}
                      <div className="bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm text-center space-y-4">
                        <div className="font-bold text-slate-900 text-lg">UPI QR Code Payment</div>

                        {/* QR Selector Tabs */}
                        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setSelectedUPI("qr1")}
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${selectedUPI === "qr1" ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            UPI Option 1
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUPI("qr2")}
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${selectedUPI === "qr2" ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            UPI Option 2
                          </button>
                        </div>

                        <div className="flex justify-center">
                          {selectedUPI === "qr1" ? (
                            <img
                              src={UPI_QR_BASE64}
                              alt="UPI QR Code 1"
                              style={{ width: "220px", height: "220px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e2e8f0", display: "block" }}
                            />
                          ) : (
                            <img
                              src={UPI_QR2_URL}
                              alt="UPI QR Code 2"
                              style={{ width: "220px", height: "220px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e2e8f0", display: "block" }}
                            />
                          )}
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                          Scan to pay via UPI / Google Pay / PhonePe / Paytm
                        </p>

                        <form onSubmit={handleUPISubmit} className="space-y-4 pt-4 border-t border-slate-100">
                          <div className="space-y-2 text-left">
                            <Label htmlFor="transactionId">UPI Transaction ID</Label>
                            <Input
                              id="transactionId"
                              placeholder="Enter 12-digit Ref No."
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" disabled={isProcessing}>
                            {isProcessing ? "Verifying..." : "Confirm UPI Payment"}
                          </Button>
                        </form>
                      </div>

                      {/* ── Divider ── */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-slate-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-slate-500">Or pay with PayPal (International)</span>
                        </div>
                      </div>

                      {/* ── UPDATED: PayPal ── */}
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <p className="text-sm text-blue-700 text-center mb-3 font-medium">
                          🌍 International customers — pay securely with PayPal
                        </p>
                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [{
                                  amount: { value: finalAmount.toFixed(2) },
                                  description: `Visa Booking Service: ${formData.serviceType}`,
                                }],
                              });
                            }}
                            onApprove={async (data, actions) => {
                              const details = await actions.order?.capture();
                              handlePaymentSuccess(details);
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setShowPayment(false)}>
                      Go Back & Edit Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-amber-400">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Why Trust Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>100% Embassy Acceptable</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>Valid PNR & Booking Ref</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>Instant PDF generation</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>Secure Payment Options</span></li>
                </ul>
              </CardContent>
            </Card>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4">Contact our support team on WhatsApp for instant assistance.</p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat with Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowSuccessModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Thank you for your order!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                ✅ Your booking is confirmed. You will receive your ticket within 10-20 minutes on your email/WhatsApp. For any help contact us on WhatsApp.
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-14 text-lg font-bold flex items-center justify-center gap-2" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                  Chat with us on WhatsApp
                </a>
              </Button>
            </CardContent>
            <CardFooter className="justify-center border-t border-slate-100 pt-4">
              <Button variant="ghost" onClick={() => setShowSuccessModal(false)}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
