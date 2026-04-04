import { AlertCircle } from "lucide-react";

// Reusable booking note for each section
export type BookingType = "flight" | "hotel" | "event" | "insurance" | "slot";

interface BookingNoteProps {
  type: BookingType;
}

const NOTE_CONFIG: Record<BookingType, { color: string; text: string }> = {
  flight: {
    color: "amber",
    text: "Please Note: After completing your payment and submitting your details, our team will contact you on WhatsApp to confirm your requirements. Your flight reservation (PNR-verified booking) will be delivered to you within 30 minutes to 2 hours via WhatsApp.",
  },
  hotel: {
    color: "blue",
    text: "Please Note: Your hotel booking confirmation will be delivered to you within 30 minutes of payment, after our team verifies your details. All documents are 100% embassy-acceptable.",
  },
  event: {
    color: "purple",
    text: "Please Note: Event booking confirmations are tailored to your specific requirements. After payment, our team will contact you directly to understand your needs. Confirmation will be delivered within 24 to 48 hours.",
  },
  insurance: {
    color: "green",
    text: "Please Note: Your travel insurance confirmation document will be delivered within 1 hour of payment. Our team will contact you on WhatsApp first to confirm your travel details and specific requirements before issuing the document.",
  },
  slot: {
    color: "purple",
    text: "Please Note: Slot availability is subject to the official embassy/consulate schedule. Our team will contact you on WhatsApp to confirm availability and provide a realistic timeline before any payment is requested.",
  },
};

export function BookingNote({ type }: BookingNoteProps) {
  const cfg = NOTE_CONFIG[type];
  const colorMap: Record<string, string> = {
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    green: "bg-green-50 border-green-200 text-green-800",
  };
  const iconColorMap: Record<string, string> = {
    amber: "text-amber-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    green: "text-green-500",
  };

  return (
    <div className={`flex gap-3 border rounded-xl p-4 mb-6 ${colorMap[cfg.color]}`}>
      <AlertCircle className={`shrink-0 mt-0.5 ${iconColorMap[cfg.color]}`} size={20} />
      <p className="text-sm">
        <strong>Important Notice:</strong> {cfg.text}
      </p>
    </div>
  );
}

// UPI QR image with fallback
export function UPIQRCode() {
  return (
    <div className="border rounded-xl p-5 text-center mb-5">
      <p className="font-semibold text-gray-800 mb-3">Scan & Pay via UPI</p>
      <img
        src="/upi-qr.png"
        alt="UPI QR Code — Scan to Pay"
        className="w-48 h-48 mx-auto object-contain rounded-lg border bg-white"
        onError={(e) => {
          // Fallback: generate a QR from a public API
          (e.target as HTMLImageElement).src =
            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=92sweetflower@okaxis&pn=Mr+Book+And+Fly";
        }}
      />
      <p className="text-sm text-gray-500 mt-2">Google Pay / PhonePe / Paytm / Any UPI</p>
    </div>
  );
}
