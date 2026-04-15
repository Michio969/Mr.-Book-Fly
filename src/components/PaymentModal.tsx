import { useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generatePDF } from "@/lib/api";

const UPI_QR_1 = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=92sweetflower@okaxis&pn=Mr+Book+And+Fly&cu=INR";
const UPI_QR_2 = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=mrbookandfly@paytm&pn=Mr+Book+And+Fly&cu=INR";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  currency?: string;
  documentType: string;
  documentDetails: Record<string, unknown>;
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  currency = "USD",
  documentType,
  documentDetails,
}: PaymentModalProps) {
  const [selectedUPI, setSelectedUPI] = useState<"qr1" | "qr2">("qr1");
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmUPI = async () => {
    if (!upiTransactionId.trim()) {
      setError("Please enter your UPI Transaction ID / Reference Number.");
      return;
    }
    if (upiTransactionId.trim().length < 6) {
      setError("Please enter a valid UPI Transaction ID (at least 6 characters).");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Generate the PDF client-side — no backend needed!
      await generatePDF(documentType, {
        ...documentDetails,
        upiTransactionId: upiTransactionId.trim(),
        paymentMethod: "UPI",
        amountPaid: `${currency === "USD" ? "$" : "₹"}${amount}`,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setUpiTransactionId("");
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate document. Please try again or contact support on WhatsApp.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setError(null);
      setUpiTransactionId("");
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Complete Payment</h2>
            <p className="text-blue-200 text-sm">UPI QR Code Payment</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="rounded-full p-1 hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-bold text-slate-900">Payment Confirmed!</h3>
              <p className="text-slate-500 text-sm text-center">
                Your document is downloading. Check your downloads folder.
              </p>
            </div>
          ) : (
            <>
              {/* Amount */}
              <div className="text-center bg-blue-50 rounded-xl p-3">
                <p className="text-sm text-slate-500">Amount to Pay</p>
                <p className="text-2xl font-bold text-blue-700">
                  {currency === "USD" ? `$${amount} USD` : `₹${amount}`}
                </p>
              </div>

              {/* UPI Option Tabs */}
              <div className="flex rounded-lg overflow-hidden border border-slate-200">
                <button
                  onClick={() => setSelectedUPI("qr1")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    selectedUPI === "qr1"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  UPI Option 1
                </button>
                <button
                  onClick={() => setSelectedUPI("qr2")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    selectedUPI === "qr2"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  UPI Option 2
                </button>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center space-y-2">
                <div className="border-2 border-slate-200 rounded-xl p-2 bg-white shadow-sm">
                  <img
                    src={selectedUPI === "qr1" ? UPI_QR_1 : UPI_QR_2}
                    alt="UPI QR Code"
                    className="w-48 h-48 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=92sweetflower@okaxis&pn=Mr+Book+And+Fly";
                    }}
                  />
                </div>
                <p className="text-sm text-slate-600 text-center">
                  Scan to pay via UPI / Google Pay / PhonePe / Paytm
                </p>
                <p className="text-xs text-slate-400">
                  {currency === "INR" ? `Amount: ₹${amount}` : `Amount: $${amount} USD`}
                </p>
              </div>

              {/* UPI Transaction ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  UPI Transaction ID <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter UPI Ref / UTR Number (e.g. 954214852632)"
                  value={upiTransactionId}
                  onChange={(e) => {
                    setUpiTransactionId(e.target.value);
                    setError(null);
                  }}
                  className="text-center font-mono"
                  disabled={isProcessing}
                />
                <p className="text-xs text-slate-400">
                  Find the transaction ID in your UPI app after payment
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Confirm Button */}
              <Button
                onClick={handleConfirmUPI}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-12 text-base"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating Document...
                  </span>
                ) : (
                  "Confirm UPI Payment & Download Document"
                )}
              </Button>

              {/* Note */}
              <p className="text-xs text-slate-400 text-center">
                After confirming, your document will download automatically. Our team will also
                contact you on WhatsApp to verify your booking.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
