import { useState, useMemo } from "react";
import { Shield, CheckCircle, AlertCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useSEO } from "@/lib/seo";

const WHATSAPP_NUMBER = "447877679344";

const generateOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "BF-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
};

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
    a: "Within 30 minutes of payment confirmation and after our team contacts you to confirm your travel details and requirements.",
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
  useSEO({
    title: "Travel Health Insurance for Visa",
    description: "Comprehensive travel insurance documents accepted by Schengen, UK, US, Canada, and worldwide embassies. Get your confirmation within 30 minutes.",
    path: "/health-insurance",
  });

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState<"plans" | "details" | "confirm">("plans");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [orderId] = useState(generateOrderId());
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
  });

  const plan = INSURANCE_PLANS.find((p) => p.id === selectedPlan);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const whatsappMsg = encodeURIComponent(
    `Hello Mr. Book & Fly! I'd like to purchase Travel Health Insurance.\n\nOrder ID: ${orderId}\nPlan: ${plan?.name}\nName: ${form.fullName}\nPassport: ${form.passportNumber}\nDate of Birth: ${form.dob}\nTravelling From: ${form.travelFrom}\nDestination Country: ${form.destination}\nFinal Destination: ${form.travelTo}\nDeparture Date: ${form.departureDate}\nReturn Date: ${form.returnDate}\nEmail: ${form.email}\nWhatsApp: ${form.phone}\n\nPlease confirm my insurance and send payment instructions.`
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
            Comprehensive travel insurance documents accepted by Schengen, UK, US, Canada, and worldwide embassies. Get your confirmation within 30 minutes.
          </p>
        </div>

        {/* How it works banner */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 max-w-3xl mx-auto">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> Select a plan and fill in your details, then you'll be redirected to WhatsApp where our team will confirm your insurance and send payment instructions. Insurance document delivered within <strong>30 minutes</strong> of payment confirmation.
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
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-800">
                <strong>Please Note:</strong> Your travel insurance confirmation document will be sent to you <strong>within 30 minutes</strong> via WhatsApp, after our team confirms your payment and travel details.
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
              <button onClick={() => setStep("confirm")} className="flex-1 bg-green-600 text-white rounded-xl py-3 font-semibold hover:bg-green-700 transition">
                <MessageCircle className="inline w-4 h-4 mr-1" /> Continue to WhatsApp Booking
              </button>
            </div>
          </div>
        )}

        {/* Step: Confirm (Order ID + Invoice) */}
        {step === "confirm" && (
          <div className="max-w-xl mx-auto space-y-6">

            {/* Confirmed banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">Details Confirmed!</h3>
              <p className="text-gray-600 mb-2">
                Your <strong>{plan?.name}</strong> is ready to be processed.
              </p>
              <p className="text-2xl font-bold text-blue-700">{plan?.price} <span className="text-base text-gray-500">/ {plan?.inr}</span></p>
            </div>

            {/* What happens next */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 text-sm text-gray-600">
              <p>✅ You'll be redirected to <strong>WhatsApp</strong> with your insurance details pre-filled.</p>
              <p>✅ Our team will confirm within <strong>30 minutes</strong> and send payment instructions.</p>
              <p>✅ We accept UPI, Google Pay, PhonePe, and international payments.</p>
              <p>✅ Insurance document PDF delivered within <strong>30 minutes</strong> of payment.</p>
            </div>

            {/* Unpaid Invoice */}
            <div className="bg-white border-2 border-dashed border-amber-300 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">INVOICE</p>
                  <p className="text-lg font-bold text-gray-900 font-mono">{orderId}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wide">Unpaid</span>
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">Travel Health Insurance</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Plan</span><span className="font-medium">{plan?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Coverage</span><span className="font-medium">{plan?.coverage}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{plan?.duration}</span></div>
                {form.fullName && <div className="flex justify-between"><span className="text-gray-500">Traveller</span><span className="font-medium">{form.fullName}</span></div>}
                {form.destination && <div className="flex justify-between"><span className="text-gray-500">Destination</span><span className="font-medium">{form.destination}</span></div>}
                <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                  <span className="font-bold text-gray-900">Total Due</span>
                  <span className="font-bold text-blue-700 text-base">{plan?.price} / {plan?.inr}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">Share this Order ID on WhatsApp — our team will send payment instructions</p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-4 rounded-xl transition text-lg"
            >
              <MessageCircle className="w-5 h-5" /> Open WhatsApp to Book Now
            </a>
            <button
              onClick={() => setStep("details")}
              className="w-full text-center text-gray-500 text-sm hover:text-gray-700"
            >
              ← Edit Details
            </button>
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
