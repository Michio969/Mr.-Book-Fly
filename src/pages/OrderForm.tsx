import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, User } from 'lucide-react';
import { processOrder, validateUPIReference } from '@/lib/api';
import { generateInvoice, downloadInvoice } from '@/lib/invoiceGenerator';

interface Traveler {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
}

const SERVICE_OPTIONS = [
  { id: 'flight', name: 'Dummy Flight', price: 3, icon: '✈️' },
  { id: 'hotel', name: 'Hotel Booking', price: 3, icon: '🏨' },
  { id: 'both', name: 'Flight + Hotel', price: 5, icon: '✈️🏨' },
  { id: 'health', name: 'Health Insurance', price: 4, icon: '🏥' },
];

export default function OrderForm() {
  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      id: '1',
      fullName: '',
      email: '',
      phone: '',
      departureCity: '',
      destinationCity: '',
      departureDate: '',
      returnDate: '',
    },
  ]);

  const [selectedService, setSelectedService] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [upiReference, setUpiReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Add new traveler
  const addTraveler = () => {
    const newTraveler: Traveler = {
      id: Date.now().toString(),
      fullName: '',
      email: '',
      phone: '',
      departureCity: '',
      destinationCity: '',
      departureDate: '',
      returnDate: '',
    };
    setTravelers([...travelers, newTraveler]);
  };

  // Remove traveler
  const removeTraveler = (id: string) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter((t) => t.id !== id));
    }
  };

  // Update traveler data
  const updateTraveler = (id: string, field: keyof Traveler, value: string) => {
    setTravelers(
      travelers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  // Calculate total amount
  const getTotalAmount = () => {
    const service = SERVICE_OPTIONS.find((s) => s.id === selectedService);
    return service ? service.price * travelers.length : 0;
  };

  // Validate form
  const validateForm = () => {
    if (!selectedService) {
      alert('Please select a service type');
      return false;
    }

    for (let i = 0; i < travelers.length; i++) {
      const t = travelers[i];
      if (!t.fullName || !t.email || !t.phone) {
        alert(`Please fill all required fields for Traveler ${i + 1}`);
        return false;
      }
      
      // Validate based on service type
      if (selectedService !== 'health') {
        if (!t.departureCity || !t.destinationCity || !t.departureDate) {
          alert(`Please fill travel details for Traveler ${i + 1}`);
          return false;
        }
      }
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setShowPayment(true);
  };

  // Handle payment confirmation
  const handlePaymentConfirm = async () => {
  // Validate UPI
  if (!validateUPIReference(upiReference)) {
    alert('❌ Please enter a valid 12-digit UPI reference number');
    return;
  }

  setIsProcessing(true);

  try {
    console.log('🚀 Starting payment process...');

    const orderData = {
      serviceType: selectedService,
      serviceName: SERVICE_OPTIONS.find((s) => s.id === selectedService)?.name,
      travelers: travelers,
      totalAmount: getTotalAmount(),
      numberOfTravelers: travelers.length,
      name: travelers[0].fullName,
      email: travelers[0].email,
      phone: travelers[0].phone,
    };

    console.log('📦 Order data prepared:', orderData);

    // Process order
    const result = await processOrder(orderData, upiReference);

    console.log('✅ Order result:', result);

    if (result.success) {
      // Show success message
      alert(
        `✅ Order Confirmed!\n\n` +
        `Order ID: ${result.orderId}\n\n` +
        `✓ Invoice downloaded\n` +
        `✓ Opening WhatsApp...\n\n` +
        `Please send the message to confirm your booking!`
      );

      // Open WhatsApp
      setTimeout(() => {
        window.open(result.whatsappURL, '_blank');
      }, 500);

      // Reset form after 2 seconds
      setTimeout(() => {
        setTravelers([
          {
            id: '1',
            fullName: '',
            email: '',
            phone: '',
            departureCity: '',
            destinationCity: '',
            departureDate: '',
            returnDate: '',
          },
        ]);
        setSelectedService('');
        setShowPayment(false);
        setUpiReference('');
      }, 2000);

    } else {
      throw new Error('Order processing failed');
    }

  } catch (error: any) {
    console.error('❌ Payment error:', error);
    
    alert(
      `❌ Error: ${error.message}\n\n` +
      `Please try again or contact support:\n` +
      `📧 92sweetflower@gmail.com\n` +
      `📱 +44 7877679344`
    );
  } finally {
    setIsProcessing(false);
  }
};
