import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle2, ShieldCheck, Mail } from "lucide-react"
import { toast } from "sonner"
import { generatePDF } from "@/lib/api"
import { PaymentModal } from "@/components/PaymentModal"

export function InvitationLetter() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    visaType: "tourist",
    hostName: "",
    hostAddress: "",
    firstName: "",
    lastName: "",
    passportNumber: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleInitiatePayment = () => {
    if (!formData.hostName || !formData.hostAddress || !formData.firstName || !formData.lastName || !formData.passportNumber || !formData.email) {
      toast.error("Please fill in all required fields.")
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
      await generatePDF("invitation", {
        ...formData,
        applicantName: `${formData.firstName} ${formData.lastName}`
      })
      
      toast.success("Your letter is downloading.")
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Invitation Letter for Visa</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Professionally drafted invitation letters tailored to your specific visa type (Tourist, Business, Family).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  Letter Details
                </CardTitle>
                <CardDescription>Provide the necessary information to draft your invitation letter.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="visaType">Visa Type</Label>
                    <select 
                      id="visaType" 
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      value={formData.visaType}
                      onChange={handleInputChange}
                    >
                      <option value="tourist">Tourist Visa</option>
                      <option value="business">Business Visa</option>
                      <option value="family">Family/Friend Visit</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hostName">Host Name / Company</Label>
                      <Input id="hostName" placeholder="Name of person or company inviting you" value={formData.hostName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hostAddress">Host Address</Label>
                      <Input id="hostAddress" placeholder="Full address in destination country" value={formData.hostAddress} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-900 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      Applicant Details
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
                      <Label htmlFor="passportNumber">Passport Number</Label>
                      <Input id="passportNumber" placeholder="Required for the letter" value={formData.passportNumber} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Where we'll send your PDF" value={formData.email} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
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
                  <span className="text-slate-600">Invitation Letter</span>
                  <span className="font-semibold text-slate-900">$25.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Instant Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">$25.00</span>
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
                    <span>Professionally drafted</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" />
                    <span>Tailored to your visa type</span>
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
              By proceeding, you agree to our Terms of Service and confirm this document is for visa application purposes only.
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess} 
        amount={25.00} 
        itemName="Invitation Letter" 
      />
    </div>
  )
}

