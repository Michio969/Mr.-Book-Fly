import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Calendar as CalendarIcon, Users, CheckCircle2, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import { toast } from "sonner"
import { generatePDF } from "@/lib/api"
import { PaymentModal } from "@/components/PaymentModal"

export function FlightReservation() {
  const [tripType, setTripType] = useState("round-trip")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleInitiatePayment = () => {
    if (!formData.from || !formData.to || !formData.departure || !formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      return
    }
    if (tripType === "round-trip" && !formData.return) {
      toast.error("Please provide a return date for round-trip.")
      return
    }
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = async () => {
    setIsPaymentModalOpen(false)
    setIsGenerating(true)
    toast.info("Payment successful! Generating your document...")

    try {
      // Generate PDF
      await generatePDF("flight", {
        ...formData,
        tripType,
        passengerName: `${formData.firstName} ${formData.lastName}`
      })
      
      toast.success("Your flight reservation is downloading.")
    } catch (error) {
      toast.error("Failed to generate document. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Flight Reservation for Visa</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Get a verifiable flight itinerary with a valid PNR. Perfect for Schengen, UK, US, and Canada visa applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <Plane className="w-6 h-6 mr-2 text-blue-600" />
                  Flight Details
                </CardTitle>
                <CardDescription>Enter your travel information exactly as it appears on your passport.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="round-trip" onValueChange={setTripType} className="mb-8">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                    <TabsTrigger value="one-way">One Way</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from">Flying From</Label>
                        <Input id="from" placeholder="City or Airport (e.g., LHR)" value={formData.from} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">Flying To</Label>
                        <Input id="to" placeholder="City or Airport (e.g., JFK)" value={formData.to} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departure">Departure Date</Label>
                        <div className="relative">
                          <Input id="departure" type="date" className="pl-10" value={formData.departure} onChange={handleInputChange} />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      {tripType === "round-trip" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <Label htmlFor="return">Return Date</Label>
                          <div className="relative">
                            <Input id="return" type="date" className="pl-10" value={formData.return} onChange={handleInputChange} />
                            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-semibold text-slate-900 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Passenger Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="As per passport" value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="As per passport" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Where we'll send your PDF" value={formData.email} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center">
                <div className="text-sm text-slate-500 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
                  Secure 256-bit encryption
                </div>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={handleInitiatePayment}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Processing..." : "Proceed to Payment"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary & Trust Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-100 shadow-md bg-white">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Flight Itinerary (Dummy)</span>
                  <span className="font-semibold text-slate-900">$3.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Instant Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">$3.00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center text-amber-400">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>100% Embassy Acceptable</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Valid PNR for verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Instant PDF generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>24/7 Customer Support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-slate-500">
              By proceeding, you agree to our Terms of Service and confirm this booking is for visa application purposes only.
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess} 
        amount={3.00} 
        itemName="Flight Reservation" 
      />
    </div>
  )
}

