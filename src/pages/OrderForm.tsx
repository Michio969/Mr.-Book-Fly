import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, User } from 'lucide-react';
import { processOrder, validateUPIReference } from '@/lib/api';

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

  const removeTraveler = (id: string) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter((t) => t.id !== id));
    }
  };

  const updateTraveler = (id: string, field: keyof Traveler, value: string) => {
    setTravelers(
      travelers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const getTotalAmount = () => {
    const service = SERVICE_OPTIONS.find((s) => s.id === selectedService);
    return service ? service.price * travelers.length : 0;
  };

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
      
      if (selectedService !== 'health') {
        if (!t.departureCity || !t.destinationCity || !t.departureDate) {
          alert(`Please fill travel details for Traveler ${i + 1}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setShowPayment(true);
  };

  const handlePaymentConfirm = async () => {
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

      const result = await processOrder(orderData, upiReference);

      console.log('✅ Order result:', result);

      if (result.success) {
        alert(
          `✅ Order Confirmed!\n\n` +
          `Order ID: ${result.orderId}\n\n` +
          `✓ Invoice downloaded\n` +
          `✓ Opening WhatsApp...\n\n` +
          `Please send the message to confirm your booking!`
        );

        setTimeout(() => {
          window.open(result.whatsappURL, '_blank');
        }, 500);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Quick Order Form
          </h1>
          <p className="text-gray-600">
            Get your visa documents in minutes. Fast, secure, and reliable.
          </p>
        </div>

        {!showPayment ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select Service Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {SERVICE_OPTIONS.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedService === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-lg text-blue-600">${service.price}</div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Travelers ({travelers.length})
                </h2>
                <Button
                  type="button"
                  onClick={addTraveler}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Traveler
                </Button>
              </div>

              <div className="space-y-6">
                {travelers.map((traveler, index) => (
                  <div
                    key={traveler.id}
                    className="p-4 border rounded-lg bg-gray-50 relative"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg">
                        Traveler {index + 1}
                      </h3>
                      {travelers.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeTraveler(traveler.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name (as per passport) *</Label>
                        <Input
                          value={traveler.fullName}
                          onChange={(e) =>
                            updateTraveler(traveler.id, 'fullName', e.target.value)
                          }
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <Label>Email Address *</Label>
                        <Input
                          type="email"
                          value={traveler.email}
                          onChange={(e) =>
                            updateTraveler(traveler.id, 'email', e.target.value)
                          }
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label>Contact Number *</Label>
                        <Input
                          type="tel"
                          value={traveler.phone}
                          onChange={(e) =>
                            updateTraveler(traveler.id, 'phone', e.target.value)
                          }
                          placeholder="+91 9999999999"
                          required
                        />
                      </div>

                      {selectedService !== 'health' && (
                        <>
                          <div>
                            <Label>Departure City</Label>
                            <Input
                              value={traveler.departureCity}
                              onChange={(e) =>
                                updateTraveler(
                                  traveler.id,
                                  'departureCity',
                                  e.target.value
                                )
                              }
                              placeholder="e.g., London, UK"
                            />
                          </div>

                          <div>
                            <Label>Destination City</Label>
                            <Input
                              value={traveler.destinationCity}
                              onChange={(e) =>
                                updateTraveler(
                                  traveler.id,
                                  'destinationCity',
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Paris, France"
                            />
                          </div>

                          <div>
                            <Label>Departure Date</Label>
                            <Input
                              type="date"
                              value={traveler.departureDate}
                              onChange={(e) =>
                                updateTraveler(
                                  traveler.id,
                                  'departureDate',
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <Label>Return Date (Optional)</Label>
                            <Input
                              type="date"
                              value={traveler.returnDate}
                              onChange={(e) =>
                                updateTraveler(
                                  traveler.id,
                                  'returnDate',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedService && (
              <Card className="p-6 bg-blue-50">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-semibold">
                      {SERVICE_OPTIONS.find((s) => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Travelers:</span>
                    <span className="font-semibold">{travelers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per Person:</span>
                    <span className="font-semibold">
                      ${SERVICE_OPTIONS.find((s) => s.id === selectedService)?.price}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-xl font-bold text-blue-600">
                    <span>Total Amount:</span>
                    <span>${getTotalAmount()}</span>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" size="lg">
                Proceed to Payment
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  window.open(
                    `https://wa.me/447877679344?text=Hi, I need help with booking`,
                    '_blank'
                  );
                }}
              >
                Book via WhatsApp
              </Button>
            </div>
          </form>
        ) : (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-green-600 mb-2">
                ${getTotalAmount()}
              </p>
              <p className="text-gray-600">
                for {travelers.length} traveler(s)
              </p>
            </div>

            <div className="mb-6">
              <Label>UPI Reference Number (12 digits) *</Label>
              <Input
                type="text"
                value={upiReference}
                onChange={(e) =>
                  setUpiReference(e.target.value.replace(/\D/g, '').slice(0, 12))
                }
                placeholder="Enter 12-digit UPI reference"
                maxLength={12}
                className="font-mono text-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                {upiReference.length}/12 digits
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowPayment(false)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handlePaymentConfirm}
                disabled={isProcessing || upiReference.length !== 12}
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment & Generate Invoice'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
