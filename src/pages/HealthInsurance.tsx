import React, { useState, useEffect } from 'react';
import { Shield, Clock, Users, ArrowRight, Download, MessageCircle } from 'lucide-react';

const INSURANCE_PLANS = [
  // ... (your existing plans array - keeping it same as before)
  {
    id: 1,
    name: "Basic Travel Insurance",
    price: 29,
    duration: "30 Days",
    coverage: "50,000",
    popular: false,
  },
  {
    id: 2,
    name: "Standard Travel Insurance",
    price: 49,
    duration: "60 Days",
    coverage: "100,000",
    popular: true,
  },
  {
    id: 3,
    name: "Premium Travel Insurance",
    price: 79,
    duration: "90 Days",
    coverage: "250,000",
    popular: false,
  },
];

const FAQS = [
  // ... your existing FAQs (keeping same)
];

const HealthInsurance = () => {
  const [step, setStep] = useState<"plans" | "details" | "payment">("plans");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passportNumber: "",
    travelDate: "",
    returnDate: "",
    destination: "",
  });
  const [orderId, setOrderId] = useState<string>("");
  const [showInvoice, setShowInvoice] = useState(false);

  // Generate Order ID when entering payment step
  useEffect(() => {
    if ((step === "payment" || showInvoice) && !orderId) {
      const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
    }
  }, [step, showInvoice, orderId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceedToPayment = () => {
    if (!formData.name || !formData.email || !formData.passportNumber) {
      alert("Please fill all required fields");
      return;
    }
    setStep("payment");
    setShowInvoice(true);
  };

  const handleDownloadInvoice = () => {
    const invoiceWindow = window.open('', '_blank');
    if (invoiceWindow) {
      invoiceWindow.document.write(`
        <html>
          <head>
            <title>Unpaid Invoice - ${orderId}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: auto; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f8f9fa; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Mr. Book & Fly - Unpaid Invoice</h1>
              <h2>Order ID: ${orderId}</h2>
            </div>
            <h3>Traveller Details</h3>
            <table>
              <tr><th>Name</th><td>${formData.name}</td></tr>
              <tr><th>Email</th><td>${formData.email}</td></tr>
              <tr><th>Phone</th><td>${formData.phone}</td></tr>
              <tr><th>Passport Number</th><td>${formData.passportNumber}</td></tr>
              <tr><th>Destination</th><td>${formData.destination}</td></tr>
              <tr><th>Travel Date</th><td>${formData.travelDate}</td></tr>
              <tr><th>Return Date</th><td>${formData.returnDate}</td></tr>
            </table>
            <h3>Plan Selected</h3>
            <p><strong>${selectedPlan?.name}</strong> - \[ {selectedPlan?.price}</p>
            <p><strong>Total Amount Due: \]{selectedPlan?.price}</strong></p>
            <p style="color: red; margin-top: 30px;">This is an unpaid invoice. Please proceed via WhatsApp to complete payment.</p>
          </body>
        </html>
      `);
      invoiceWindow.document.close();
      setTimeout(() => {
        invoiceWindow.print();
      }, 500);
    }
  };

  const whatsappMessage = `Hello Mr. Book & Fly Team,%0A%0A` +
    `I would like to complete my Health Insurance booking.%0A%0A` +
    `Order ID: ${orderId}%0A` +
    `Plan: ${selectedPlan?.name}%0A` +
    `Amount: $${selectedPlan?.price}%0A%0A` +
    `Traveller Details:%0A` +
    `Name: ${formData.name}%0A` +
    `Email: ${formData.email}%0A` +
    `Phone: ${formData.phone}%0A` +
    `Passport: ${formData.passportNumber}%0A` +
    `Destination: ${formData.destination}%0A` +
    `Travel Date: ${formData.travelDate}%0A` +
    `Return Date: ${formData.returnDate}%0A%0A` +
    `Please process my booking and let me know the payment details. Thank you!`;

  const whatsappLink = `https://wa.me/447877679344?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Travel Health Insurance</h1>
          <p className="text-gray-600 mt-2">Secure your journey with comprehensive coverage</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {["plans", "details", "payment"].map((s, index) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                  {index + 1}
                </div>
                {index < 2 && <div className="w-12 h-0.5 bg-gray-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {!showInvoice ? (
          // Plans & Details Steps (keeping your original logic)
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {step === "plans" && (
              // Your existing plans selection UI...
              <div>
                <h2 className="text-2xl font-semibold mb-6">Choose Your Plan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {INSURANCE_PLANS.map(plan => (
                    <div key={plan.id} className={`border rounded-2xl p-6 cursor-pointer transition-all ${selectedPlan?.id === plan.id ? 'border-blue-600 ring-2 ring-blue-200' : ''}`}
                      onClick={() => setSelectedPlan(plan)}>
                      {plan.popular && <div className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full w-fit mb-3">Most Popular</div>}
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-3xl font-bold mt-2">${plan.price}</p>
                      <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                        Select Plan
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setStep("details")}
                  disabled={!selectedPlan}
                  className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step === "details" && (
              // Your existing details form UI...
              <div>
                <h2 className="text-2xl font-semibold mb-6">Traveller Details</h2>
                {/* Form fields - name, email, phone, passport etc. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-4 rounded-xl" required />
                  <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border p-4 rounded-xl" required />
                  {/* Add other fields similarly */}
                </div>
                <button 
                  onClick={handleProceedToPayment}
                  className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2">
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        ) : (
          // ==================== NEW UNPAID INVOICE SCREEN ====================
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Unpaid Invoice</h2>
              <p className="text-gray-600 mt-2">Order ID: <span className="font-mono font-semibold text-blue-600">{orderId}</span></p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="font-semibold mb-4 text-lg">Booking Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between"><span className="text-gray-600">Plan</span><span className="font-medium">{selectedPlan?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Amount</span><span className="font-semibold text-xl">${selectedPlan?.price}</span></div>
                <hr />
                <div><strong>Traveller Details:</strong></div>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-600">Name:</div><div>{formData.name}</div>
                  <div className="text-gray-600">Email:</div><div>{formData.email}</div>
                  <div className="text-gray-600">Phone:</div><div>{formData.phone}</div>
                  <div className="text-gray-600">Passport:</div><div>{formData.passportNumber}</div>
                  <div className="text-gray-600">Destination:</div><div>{formData.destination}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleDownloadInvoice}
                className="w-full py-4 bg-white border-2 border-gray-800 text-gray-900 rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50">
                <Download size={22} />
                Download Unpaid Invoice PDF
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-green-700">
                <MessageCircle size={22} />
                Continue on WhatsApp to Complete Booking
              </a>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Our team will confirm your booking shortly after payment via WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthInsurance;
