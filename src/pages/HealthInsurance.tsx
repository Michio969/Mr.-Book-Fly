import { useState } from "react";
import { Shield, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const INSURANCE_PLANS = [
  {
    id: "basic",
    name: "Basic Travel Cover",
    price: "$4",
    inr: "₹349",
    coverage: "Up to $50,000",
    duration: "Up to 30 days",
    features: [
      "Medical Emergency Cover",
      "Trip Cancellation",
      "Lost Baggage",
      "24/7 Helpline",
    ],
  },
  {
    id: "standard",
    name: "Standard Travel Insurance",
    price: "$7",
    inr: "₹599",
    coverage: "Up to $100,000",
    duration: "Up to 90 days",
    features: [
      "All Basic features",
      "Flight Delay Compensation",
      "Personal Accident Cover",
      "Emergency Evacuation",
      "Embassy Letter Support",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Global Cover",
    price: "$12",
    inr: "₹999",
    coverage: "Up to $500,000",
    duration: "Up to 365 days",
    features: [
      "All Standard features",
      "Pre-existing Condition Cover",
      "Adventure Sports Cover",
      "Multi-trip Annual Policy",
      "Schengen / UK / US Compliant",
      "Priority PDF Delivery",
    ],
  },
];

const FAQS = [
  {
    q: "Is this insurance accepted by embassies?",
    a: "Yes. Our travel insurance documents are 100% compliant with Schengen, UK, US, Canada, and most other embassy requirements.",
  },
  {
    q: "How quickly will I receive my insurance document?",
    a: "Within 1 hour of payment confirmation and after our team contacts you to confirm your travel details and requirements.",
  },
  {
    q: "Can I get insurance for a group or family?",
    a: "Absolutely. Please contact us on WhatsApp with the number of travellers and we will provide a customised quote.",
  },
  {
    q: "Is the document digitally signed and verifiable?",
    a: "Yes, all our insurance confirmation documents carry official reference numbers and are verifiable upon request.",
  },
];

export default function HealthInsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState<"plans" | "details" | "payment">("plans");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    passportNumber: "",
    dob: "",
    travelFrom: "",
    travelTo: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    email: "",
    phone: "",
    upiRef: "",
  });

  const plan = INSURANCE_PLANS.find((p) => p.id === selectedPlan);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const whatsappMsg = encodeURIComponent(
    `Hello Mr. Book & Fly! I have completed payment for Travel Health Insurance.\n\nPlan: ${plan?.name}\nName: ${form.fullName}\nPassport: ${form.passportNumber}\nDestination: ${form.destination}\nTravel Dates: ${form.departureDate} to ${form.returnDate}\nUPI Ref: ${form.upiRef}\n\nPlease confirm my insurance document.`
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Shield size={16} /> Embassy-Accepted Travel Insurance
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Travel Health Insurance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive travel insurance documents accepted by Schengen, UK, US, Canada, and worldwide embassies. Get your confirmation within 1 hour.
          </p>
        </div>

        {/* Step: Plans */}
        {step === "plans" && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {INSURANCE_PLANS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    selectedPlan === p.id
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  } ${p.popular ? "ring-2 ring-yellow-400" : ""}`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{p.name}</h3>
                  <div className="text-3xl font-bold text-blue-700 mb-0.5">{p.price}</div>
                  <div className="text-sm text-gray-500 mb-3">{p.inr} · {p.duration}</div>
                  <div className="text-sm font-semibold text-green-700 mb-3">Coverage: {p.coverage}</div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-green-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                disabled={!selectedPlan}
                onClick={() => setStep("details")}
                className="bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white font-semibold px-10 py-3.5 rounded-xl text-lg transition"
              >
                Continue with {plan?.name || "Selected Plan"} →
              </button>
            </div>
          </>
        )}

        {/* Step: Details */}
        {step === "details" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
            {/* Important Note */}
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-800">
                <strong>Please Note:</strong> Your travel insurance confirmation document will be sent to you <strong>within 1 hour</strong> via WhatsApp, after our team contacts you to verify your travel details and requirements.
              </p>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Traveller Details — <span className="text-blue-700">{plan?.name}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name (as on passport)", name: "fullName", type: "text", placeholder: "John Michael Smith" },
                { label: "Passport Number", name: "passportNumber", type: "text", placeholder: "A1234567" },
                { label: "Date of Birth", name: "dob", type: "date", placeholder: "" },
                { label: "Travelling From (Country)", name: "travelFrom", type: "text", placeholder: "India" },
                { label: "Destination Country", name: "destination", type: "text", placeholder: "France" },
                { label: "Final Destination", name: "travelTo", type: "text", placeholder: "Paris, France" },
                { label: "Departure Date", name: "departureDate", type: "date", placeholder: "" },
                { label: "Return Date", name: "returnDate", type: "date", placeholder: "" },
                { label: "Email Address", name: "email", type: "email", placeholder: "john@email.com" },
                { label: "WhatsApp Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={(form as any)[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep("plans")} className="flex-1 border border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition">← Back</button>
              <button onClick={() => setStep("payment")} className="flex-1 bg-blue-700 text-white rounded-xl py-3 font-semibold hover:bg-blue-800 transition">Proceed to Payment →</button>
            </div>
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-800">
                <strong>Delivery Notice:</strong> Your insurance document will be delivered <strong>within 1 hour</strong> after our team contacts you on WhatsApp and confirms your travel requirements.
              </p>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Payment</h2>
            <div className="text-3xl font-bold text-blue-700">{plan?.price} <span className="text-lg text-gray-500">/ {plan?.inr}</span></div>
            <div className="text-sm text-gray-500 mb-6">{plan?.name}</div>

            <div className="border rounded-xl p-5 text-center mb-5">
              <p className="font-semibold text-gray-800 mb-3">Scan & Pay via UPI</p>
              <img
                src="/upi-qr.png"
                alt="UPI QR Code"
                className="w-48 h-48 mx-auto object-contain rounded-lg border"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=92sweetflower@okaxis"; }}
              />
              <p className="text-sm text-gray-500 mt-2">Google Pay / PhonePe / Paytm / Any UPI</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI Transaction ID / Ref No.</label>
              <input
                type="text"
                name="upiRef"
                value={form.upiRef}
                onChange={handleChange}
                placeholder="Enter 12-digit Ref No."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <a
              href={`https://wa.me/447877679344?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3.5 rounded-xl transition"
            >
              Confirm Payment & Continue on WhatsApp
            </a>
            <button onClick={() => setStep("details")} className="mt-3 w-full text-center text-gray-500 text-sm hover:text-gray-700">← Go Back & Edit</button>
          </div>
        )}

        {/* FAQs */}
        <div className="max-w-2xl mx-auto mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center font-medium text-gray-800">
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openFaq === i && <p className="mt-2 text-sm text-gray-600">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
