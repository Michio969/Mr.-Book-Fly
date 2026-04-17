import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderData, upiReference } = req.body;

  try {
    // Validate UPI Reference
    if (!upiReference || !/^\d{12}$/.test(upiReference)) {
      return res.status(400).json({ 
        error: 'Invalid UPI reference number. Must be 12 digits.' 
      });
    }

    // Generate Order ID
    const orderId = `MBF${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create WhatsApp message
    const message = createWhatsAppMessage({ ...orderData, orderId, upiReference });

    // Your WhatsApp Business number (replace with actual)
    const whatsappNumber = '919XXXXXXXXX';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Return success with WhatsApp URL
    res.status(200).json({ 
      success: true,
      orderId,
      whatsappURL,
      message: 'Order processed successfully'
    });

  } catch (error: any) {
    console.error("Error processing order:", error);
    res.status(500).json({ 
      error: "Failed to process order",
      details: error.message 
    });
  }
}

function createWhatsAppMessage(order: any): string {
  let serviceDetails = '';
  
  switch(order.serviceType) {
    case 'hotel':
      serviceDetails = `
🏨 *Hotel Booking*
📍 Location: ${order.location || 'N/A'}
📅 Check-in: ${order.checkIn || 'N/A'}
📅 Check-out: ${order.checkOut || 'N/A'}
👥 Guests: ${order.guests || 'N/A'}`;
      break;
    
    case 'flight':
      serviceDetails = `
✈️ *Flight Booking*
🛫 From: ${order.from || 'N/A'}
🛬 To: ${order.to || 'N/A'}
📅 Date: ${order.travelDate || 'N/A'}
👥 Passengers: ${order.passengers || 'N/A'}`;
      break;
    
    case 'event':
      serviceDetails = `
🎉 *Event Booking*
📌 Event: ${order.eventName || 'N/A'}
📅 Date: ${order.eventDate || 'N/A'}
🎫 Tickets: ${order.tickets || 'N/A'}`;
      break;
    
    case 'health':
      serviceDetails = `
🏥 *Health Insurance*
📋 Plan: ${order.planType || 'N/A'}
👤 Members: ${order.members || 'N/A'}`;
      break;
      
    default:
      serviceDetails = `
📦 Service: ${order.serviceType || 'General Booking'}`;
  }

  return `
🎯 *NEW BOOKING - Mr. Book & Fly*
━━━━━━━━━━━━━━━━━━━━

📋 *Order ID:* ${order.orderId}

${serviceDetails}

━━━━━━━━━━━━━━━━━━━━
👤 *Customer Details*
Name: ${order.name}
📧 Email: ${order.email}
📱 Phone: ${order.phone}

━━━━━━━━━━━━━━━━━━━━
💰 *Payment Details*
Amount Paid: ₹${order.amount}
🔖 UPI Ref: ${order.upiReference}
📅 Date: ${new Date().toLocaleString('en-IN')}

━━━━━━━━━━━━━━━━━━━━
⏳ Status: Pending Verification

Please verify payment and process booking.
  `.trim();
}
