import { Card, CardContent } from "@/components/ui/card"

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Privacy Policy</h1>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8 prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-8">Last Updated: April 1, 2026</p>
            
            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We collect information you provide directly to us when using our services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Names and contact information (email address, phone number)</li>
              <li>Travel details (dates, destinations)</li>
              <li>Passport numbers (only when required for specific documents like invitation letters)</li>
              <li>Payment information (processed securely by our payment gateways, we do not store full credit card details)</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>To generate the requested booking documents and invitation letters.</li>
              <li>To communicate with you regarding your orders and provide customer support.</li>
              <li>To process payments securely.</li>
              <li>To improve our website and services.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">3. Data Security</h2>
            <p className="text-slate-600 mb-4">
              We implement industry-standard security measures, including 256-bit encryption, to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">5. Data Retention</h2>
            <p className="text-slate-600 mb-4">
              We retain your personal information only for as long as necessary to provide the services you have requested and to comply with legal obligations. Booking details are typically purged from our active systems after a set period following the completion of your order.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-4">6. Your Rights</h2>
            <p className="text-slate-600 mb-4">
              You have the right to request access to, correction of, or deletion of your personal data. Please contact us if you wish to exercise these rights.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
<SEO 
  title="Privacy Policy"
  description="Read MrBookAndFly's privacy policy to understand how we collect, 
  use, and protect your personal information."
  keywords="privacy policy, data protection, user privacy"
  canonical="/privacy-policy"
/>
