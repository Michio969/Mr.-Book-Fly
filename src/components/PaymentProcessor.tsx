import { useState } from 'react';
import { processOrder, validateUPIReference } from '@/lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PaymentProcessorProps {
  orderData: any;
  serviceType: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function PaymentProcessor({ 
  orderData, 
  serviceType, 
  amount, 
  onSuccess, 
  onError 
}: PaymentProcessorProps) {
  const [upiReference, setUpiReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate UPI Reference
    if (!validateUPIReference(upiReference)) {
      onError('Invalid UPI reference number. Must be exactly 12 digits.');
      return;
    }

    setIsProcessing(true);

    try {
      const completeOrderData = {
        ...orderData,
        serviceType,
        amount
      };

      const result = await processOrder(completeOrderData, upiReference);

      if (result.success) {
        // Redirect to WhatsApp
        window.open(result.whatsappURL, '_blank');
        
        // Call success callback
        onSuccess();
        
        // Show success message
        alert(`Order confirmed! Order ID: ${result.orderId}\nRedirecting to WhatsApp...`);
      } else {
        throw new Error(result.error || 'Failed to process payment');
      }

    } catch (error: any) {
      console.error('Payment processing error:', error);
      onError(error.message || 'Failed to process payment. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="upiReference">UPI Reference Number (12 digits)</Label>
        <Input
          id="upiReference"
          type="text"
          value={upiReference}
          onChange={(e) => setUpiReference(e.target.value.replace(/\D/g, '').slice(0, 12))}
          placeholder="Enter 12-digit UPI reference"
          maxLength={12}
          required
          className="font-mono"
        />
        <p className="text-sm text-gray-500 mt-1">
          {upiReference.length}/12 digits
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={isProcessing || upiReference.length !== 12}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Confirm Payment & Continue'}
      </Button>
    </form>
  );
}
