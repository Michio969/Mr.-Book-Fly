import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderData, upiReference } = req.body;

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

    // Create WhatsApp message
    const message = createWhatsAppMessage({
      ...orderData,
      orderId,
      upiReference: cleanedUpiRef,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });

    // Your WhatsApp number (CHANGE THIS!)
    const whatsappNumber = '447877679344'; //
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Return success response
    res.status(200).json({ 
      success: true,
      orderId,
      whatsappURL
    });

  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to process order',
      message: error.message 
    });
  }
}

function createWhatsAppMessage(order: any): string {
  let serviceDetails = '';
  
  switch(order.serviceType) {
    case 'hotel':
      serviceDetails = `🏨 *Hotel Booking*\n📍 ${order.location || 'N/A'}\n📅 Check-in: ${order.checkIn || 'N/A'}\n📅 Check-out: ${order.checkOut || 'N/A'}`;
      break;
    case 'flight':
      serviceDetails = `✈️ *Flight Booking*\n🛫 From: ${order.from || 'N/A'}\n🛬 To: ${order.to || 'N/A'}\n📅 ${order.travelDate || 'N/A'}`;
      break;
    case 'event':
      serviceDetails = `🎉 *Event Booking*\n📌 ${order.eventName || 'N/A'}\n📅 ${order.eventDate || 'N/A'}`;
      break;
    case 'health':
      serviceDetails = `🏥 *Health Insurance*\n📋 ${order.planType || 'N/A'}`;
      break;
    default:
      serviceDetails = `📦 *${order.serviceType || 'Booking'}*`;
  }

  return `
🎯 *NEW BOOKING - Mr. Book & Fly*
━━━━━━━━━━━━━━━━━━━━

📋 *Order ID:* ${order.orderId}

${serviceDetails}

━━━━━━━━━━━━━━━━━━━━
👤 *Customer Details*
Name: ${order.name || 'N/A'}
📧 Email: ${order.email || 'N/A'}
📱 Phone: ${order.phone || 'N/A'}

━━━━━━━━━━━━━━━━━━━━
💰 *Payment Details*
Amount: ₹${order.amount || 'N/A'}
🔖 UPI Ref: ${order.upiReference}
📅 Date: ${order.date}

━━━━━━━━━━━━━━━━━━━━
⏳ Status: Pending Verification
  `.trim();
}
