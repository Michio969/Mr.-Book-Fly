import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderData, upiReference } = req.body;

  try {
    // Validate UPI Reference (12 digits)
    if (!upiReference || !/^\d{12}$/.test(upiReference.replace(/\s/g, ''))) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid UPI reference number. Must be 12 digits.' 
      });
    }

    // Clean UPI reference
    const cleanedUpiRef = upiReference.replace(/\s/g, '');

    // Generate Order ID
    const orderId = `MBF${Date.now()}${Math.floor(Math.random() * 10000)}`;

    // Create complete order object
    const order = {
      ...orderData,
      orderId,
      upiReference: cleanedUpiRef,
      bookingDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'Pending Verification'
    };

    // Create WhatsApp message
    const message = createWhatsAppMessage(order);

    // Your WhatsApp Business number
    const whatsappNumber = '447877679344'; //
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Return success response
    res.status(200).json({ 
      success: true,
      orderId,
      whatsappURL,
      message: 'Order processed successfully'
    });

  } catch (error: any) {
    console.error("Error processing order:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to process order",
      message: error.message 
    });
  }
}

function createWhatsAppMessage(order: any): string {
  let serviceDetails = '';
  
  switch(order.serviceType) {
    case 'hotel':
      serviceDetails = `
🏨 *Hotel Booking*
📍 Location: ${order.location || order.destination || 'N/A'}
📅 Check-in: ${order.checkIn || order.checkInDate || 'N/A'}
📅 Check-out: ${order.checkOut || order.checkOutDate || 'N/A'}
👥 Guests: ${order.guests || order.numberOfGuests || 'N/A'}
🏷️ Room Type: ${order.roomType || 'N/A'}`;
      break;
    
    case 'flight':
      serviceDetails = `
✈️ *Flight Booking*
🛫 From: ${order.from || order.departure || 'N/A'}
🛬 To: ${order.to || order.destination || 'N/A'}
📅 Departure: ${order.departureDate || order.travelDate || 'N/A'}
📅 Return: ${order.returnDate || 'One Way'}
👥 Passengers: ${order.passengers || order.numberOfPassengers || 'N/A'}
💺 Class: ${order.travelClass || 'Economy'}`;
      break;
    
    case 'event':
      serviceDetails = `
🎉 *Event Booking*
📌 Event: ${order.eventName || order.event || 'N/A'}
📍 Location: ${order.eventLocation || order.location || 'N/A'}
📅 Date: ${order.eventDate || order.date || 'N/A'}
🎫 Tickets: ${order.tickets || order.numberOfTickets || 'N/A'}`;
      break;
    
    case 'health':
      serviceDetails = `
🏥 *Health Insurance*
📋 Plan: ${order.planType || order.plan || 'N/A'}
👤 Members: ${order.members || order.numberOfMembers || 'N/A'}
📅 Coverage: ${order.coveragePeriod || 'N/A'}
💰 Sum Assured: ${order.sumAssured || 'N/A'}`;
      break;

    case 'quick-order':
      serviceDetails = `
📦 *Quick Order*
🏷️ Service: ${order.service || 'General Booking'}
📝 Details: ${order.message || order.details || 'N/A'}`;
      break;
      
    default:
      serviceDetails = `
📦 *Booking Request*
🏷️ Service: ${order.serviceType || 'General'}`;
  }

  return `
🎯 *NEW BOOKING - Mr. Book & Fly*
━━━━━━━━━━━━━━━━━━━━

📋 *Order ID:* ${order.orderId}

${serviceDetails}

━━━━━━━━━━━━━━━━━━━━
👤 *Customer Details*
👨 Name: ${order.name || order.fullName || 'N/A'}
📧 Email: ${order.email || 'N/A'}
📱 Phone: ${order.phone || order.mobile || 'N/A'}

━━━━━━━━━━━━━━━━━━━━
💰 *Payment Details*
Amount Paid: ₹${order.amount || order.totalAmount || 'N/A'}
🔖 UPI Ref: ${order.upiReference}
📅 Booking Date: ${order.bookingDate}

━━━━━━━━━━━━━━━━━━━━
⏳ *Status:* ${order.status}

_Please verify payment and process the booking._
  `.trim();
}
