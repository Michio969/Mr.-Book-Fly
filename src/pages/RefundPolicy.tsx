import { Card, CardContent } from "@/components/ui/card"

export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Refund Policy</h1>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8 prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-8">Last Updated: April 1, 2026</p>
            
            <p className="text-slate-600 mb-6">
              At Mr. Book & Fly, we strive to provide high-quality, verifiable documents for your visa application process. Please read our refund policy carefully before making a purchase.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">1. Eligibility for Refunds</h2>
            <p className="text-slate-600 mb-4">
              Refunds are generally only issued under the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li><strong>Duplicate Charges:</strong> If you were accidentally charged multiple times for the same order.</li>
              <li><strong>Service Failure:</strong> If we fail to deliver the requested document within the promised timeframe (usually instant or within a few hours) due to technical issues on our end.</li>
              <li><strong>Invalid Documents:</strong> If the provided PNR or booking reference is demonstrably invalid at the time of delivery (before the standard expiration period).</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">2. Non-Refundable Situations</h2>
            <p className="text-slate-600 mb-4">
              We do <strong>not</strong> issue refunds in the following scenarios:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li><strong>Visa Rejection:</strong> We do not guarantee visa approval. Visa decisions are solely at the discretion of the respective embassy or consulate.</li>
              <li><strong>Change of Mind:</strong> Once a document has been generated and delivered, the service is considered fulfilled.</li>
              <li><strong>User Error:</strong> If you provided incorrect information (e.g., wrong dates, misspelled names) during the booking process. We recommend double-checking all details before payment.</li>
              <li><strong>Expired Bookings:</strong> Our dummy bookings are valid for a limited time (typically 48-72 hours). We are not responsible if the embassy checks the booking after it has expired.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">3. Requesting a Refund</h2>
            <p className="text-slate-600 mb-4">
              To request a refund, please contact our support team within 24 hours of your purchase. Include your order number and a detailed explanation of the issue.
            </p>
            <p className="text-slate-600 mb-4">
              Contact Email: support@mrbookandfly.com
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">4. Processing Time</h2>
            <p className="text-slate-600 mb-4">
              Approved refunds will be processed back to the original method of payment. Please allow 5-10 business days for the funds to appear in your account, depending on your bank or credit card issuer.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
