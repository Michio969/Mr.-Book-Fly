import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plane, Building, Calendar as CalendarIcon, MapPin, ShieldCheck, CheckCircle2, FileText } from "lucide-react"
import { toast } from "sonner"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { generatePDF } from "@/lib/api"

export function OrderForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    destinationCity: "",
    serviceType: "flight", // flight, hotel, both
  })

  const prices = {
    flight: 3,
    hotel: 3,
    both: 5,
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.departureDate || !formData.departureCity || !formData.destinationCity) {
      toast.error("Please fill in all required fields.")
      return
    }
    setShowPayment(true)
  }

  const handlePaymentSuccess = async (details: any) => {
    setIsProcessing(true)
    toast.success("Payment successful! Generating your documents...")

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
          checkout: formData.returnDate || formData.departureDate, // Fallback
          email: formData.email,
        })
      }

      toast.success("Your documents are downloading.")
      setShowPayment(false)
    } catch (error) {
      toast.error("Failed to generate documents. Please contact support.")
    } finally {
      setIsProcessing(false)
    }
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departureCity">Departure City</Label>
                        <div className="relative">
                          <Input id="departureCity" placeholder="e.g., London" className="pl-10" value={formData.departureCity} onChange={handleInputChange} required />
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationCity">Destination City</Label>
                        <div className="relative">
                          <Input id="destinationCity" placeholder="e.g., Paris" className="pl-10" value={formData.destinationCity} onChange={handleInputChange} required />
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>

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

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <Label className="text-base font-semibold">Select Service Type</Label>
                      <RadioGroup defaultValue="flight" onValueChange={handleServiceChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="flight" id="flight" className="peer sr-only" />
                          <Label
                            htmlFor="flight"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer"
                          >
                            <Plane className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Dummy Flight</span>
                            <span className="text-xs text-slate-500 mt-1">$3</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="hotel" id="hotel" className="peer sr-only" />
                          <Label
                            htmlFor="hotel"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer"
                          >
                            <Building className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Hotel Booking</span>
                            <span className="text-xs text-slate-500 mt-1">$3</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="both" id="both" className="peer sr-only" />
                          <Label
                            htmlFor="both"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer"
                          >
                            <div className="flex gap-1 mb-3">
                              <Plane className="h-5 w-5" />
                              <Building className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium">Both Together</span>
                            <span className="text-xs text-slate-500 mt-1">$5</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                      Proceed to Payment
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-8 py-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Choose Payment Method</h3>
                      <p className="text-slate-600">Total Amount: <span className="text-blue-600 font-bold">${prices[formData.serviceType as keyof typeof prices]}</span></p>
                    </div>

                    <div className="max-w-sm mx-auto space-y-6">
                      {/* Razorpay Button */}
                      <Button 
                        className="w-full bg-[#3395FF] hover:bg-[#2277DD] text-white h-14 text-lg font-bold shadow-md flex items-center justify-center gap-2"
                        asChild
                      >
                        <a href="https://rzp.io/rzp/0pPNbXD" target="_blank" rel="noopener noreferrer">
                          Pay with UPI / Razorpay
                        </a>
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-slate-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-slate-500">Or pay with PayPal</span>
                        </div>
                      </div>

                      <PayPalScriptProvider options={{ "client-id": "test" }}>
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: prices[formData.serviceType as keyof typeof prices].toString(),
                                  },
                                  description: `Visa Booking Service: ${formData.serviceType}`,
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order?.capture();
                            handlePaymentSuccess(details);
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>

                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setShowPayment(false)}>
                      Go Back & Edit Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

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
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>100% Embassy Acceptable</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Valid PNR & Booking Ref</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Instant PDF generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Secure PayPal Payment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4">Contact our support team on WhatsApp for instant assistance.</p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
                <a href="https://wa.me/18001234567" target="_blank" rel="noopener noreferrer">
                  Chat with Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
