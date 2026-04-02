import { Card, CardContent } from "@/components/ui/card"

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Terms of Service</h1>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8 prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-8">Last Updated: April 1, 2026</p>
            
            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing and using the Mr. Book & Fly website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">2. Description of Services</h2>
            <p className="text-slate-600 mb-4">
              Mr. Book & Fly provides verifiable dummy bookings for flights, hotels, and events, as well as drafted invitation letters, strictly for the purpose of visa applications. Our documents are verifiable with the respective airlines or hotels for a limited period.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">3. Use of Documents</h2>
            <p className="text-slate-600 mb-4">
              The documents provided by our service are intended solely for visa application purposes. You agree not to use these documents for actual travel, boarding flights, or checking into hotels. Mr. Book & Fly is not liable for any issues arising from the misuse of these documents.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">4. Verification and Validity</h2>
            <p className="text-slate-600 mb-4">
              Our flight and hotel reservations are verifiable via standard PNR systems for a limited duration (typically 48 to 72 hours, depending on the airline/hotel policy). We do not guarantee the outcome of your visa application.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">5. User Information</h2>
            <p className="text-slate-600 mb-4">
              You are responsible for providing accurate information (names, dates, passport details) when placing an order. We are not responsible for documents generated with incorrect information provided by the user.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              Mr. Book & Fly shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to visa rejections.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">7. Changes to Terms</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
