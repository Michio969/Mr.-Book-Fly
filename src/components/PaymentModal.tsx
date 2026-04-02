import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, X } from "lucide-react"
import { toast } from "sonner"

// Use a dummy key if env var is missing to allow the UI to render in demo mode
const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx")

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  amount: number
  itemName: string
}

function CheckoutForm({ onSuccess, amount, itemName, isSimulated }: { onSuccess: () => void, amount: number, itemName: string, isSimulated: boolean }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSimulated) {
      // Handle simulated payment
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        onSuccess()
      }, 1500)
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.origin,
      },
      redirect: "if_required"
    })

    if (error) {
      toast.error(error.message || "An unexpected error occurred.")
    } else {
      onSuccess()
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSimulated ? (
        <div className="p-4 bg-blue-50 text-blue-800 rounded-md border border-blue-200 text-sm">
          <strong>Demo Mode Active:</strong> No real payment will be processed. Click "Pay Now" to simulate a successful transaction.
        </div>
      ) : (
        <PaymentElement />
      )}
      
      <Button 
        type="submit" 
        disabled={isProcessing || (!stripe && !isSimulated) || (!elements && !isSimulated)} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}

export function PaymentModal({ isOpen, onClose, onSuccess, amount, itemName }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("")
  const [isSimulated, setIsSimulated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Create PaymentIntent as soon as the modal opens
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
          setIsSimulated(data.simulated || false)
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err)
          toast.error("Failed to initialize payment. Please try again.")
        })
    }
  }, [isOpen, amount])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-white shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <CardHeader className="border-b border-slate-100 pb-6">
          <CardTitle className="text-2xl text-slate-900">Choose Payment Method</CardTitle>
          <CardDescription>
            You are paying for: <strong className="text-slate-700">{itemName}</strong>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          {/* UPI QR Code Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-4">
            <div className="font-bold text-slate-900 text-sm">UPI QR Code Payment</div>
            <div className="flex justify-center">
              <img 
                src="/MY UPI.JPEG" 
                alt="UPI QR Code" 
                className="w-40 h-40 object-contain border border-slate-200 rounded-lg bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs font-medium text-slate-700">
              Scan to pay via UPI / Google Pay / PhonePe / Paytm
            </p>
            
            <div className="space-y-2 text-left pt-2">
              <Label htmlFor="modalTransactionId" className="text-xs">UPI Transaction ID</Label>
              <Input 
                id="modalTransactionId" 
                placeholder="Enter 12-digit Ref No." 
                className="h-9 text-sm"
                required
              />
              <Button 
                onClick={() => onSuccess()}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-9 text-sm font-bold"
              >
                Confirm UPI Payment
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-slate-500">Or pay with Card</span>
            </div>
          </div>

          {clientSecret ? (
            <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
              <CheckoutForm onSuccess={onSuccess} amount={amount} itemName={itemName} isSimulated={isSimulated} />
            </Elements>
          ) : (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 justify-center text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
          Payments are secure and encrypted
        </CardFooter>
      </Card>
    </div>
  )
}
